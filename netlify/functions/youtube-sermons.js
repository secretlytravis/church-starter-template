// Netlify serverless function used by /pages/sermons.html.
// It keeps the YouTube API key on the server and exposes only a small,
// public JSON feed to the browser at /api/sermons.
exports.handler = async function() {
  // Netlify stores these values in Site configuration > Environment variables.
  // The YT_* names are kept as fallbacks in case an older setup used them.
  const apiKey = process.env.SERMONS_API_KEY || process.env.YT_API_KEY;
  const channelId = process.env.SERMONS_CHANNEL_ID || process.env.YT_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';
  const videosToShow = 7;

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=900'
  };

  if (!apiKey) {
    // 503 tells the page this is a configuration problem, not a broken page.
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        error: 'The sermon feed is not configured yet. Set the sermon provider API key in Netlify environment variables.'
      })
    };
  }

  try {
    // First ask YouTube which playlist contains all uploads for the channel.
    const channelUrl = new URL('https://www.googleapis.com/youtube/v3/channels');
    channelUrl.searchParams.set('part', 'contentDetails');
    channelUrl.searchParams.set('id', channelId);
    channelUrl.searchParams.set('key', apiKey);

    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();

    if (!channelRes.ok) {
      return {
        statusCode: channelRes.status,
        headers,
        body: JSON.stringify({ error: channelData.error && channelData.error.message ? channelData.error.message : 'Could not load the sermon feed channel.' })
      };
    }

    if (!channelData.items || channelData.items.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Sermon feed channel not found.' })
      };
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Then fetch the latest items from that uploads playlist.
    const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    playlistUrl.searchParams.set('part', 'snippet');
    playlistUrl.searchParams.set('playlistId', uploadsPlaylistId);
    playlistUrl.searchParams.set('maxResults', String(videosToShow));
    playlistUrl.searchParams.set('key', apiKey);

    const playlistRes = await fetch(playlistUrl);
    const playlistData = await playlistRes.json();

    if (!playlistRes.ok) {
      return {
        statusCode: playlistRes.status,
        headers,
        body: JSON.stringify({ error: playlistData.error && playlistData.error.message ? playlistData.error.message : 'Could not load sermon messages.' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        provider: 'YouTube',
        channelId,
        archiveUrl: `https://www.youtube.com/channel/${channelId}/videos`,
        // Keep the response shape simple so /pages/sermons.html is not tied to the
        // full YouTube API response format.
        videos: (playlistData.items || []).map(function(item) {
          const videoId = item.snippet.resourceId.videoId;
          return {
            id: videoId,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            title: item.snippet.title,
            description: item.snippet.description || '',
            publishedAt: item.snippet.publishedAt,
            thumbnails: item.snippet.thumbnails || {}
          };
        })
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Could not reach the sermon provider.' })
    };
  }
};
