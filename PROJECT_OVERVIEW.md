# Church Starter Template

This project is a static website starter for a local church. Most pages are plain HTML files with their own page-specific styles. Shared files under `assets/` add behavior across the site, including mobile navigation, the next-gathering banner, offline caching, and the sermon feed.

## Folder Structure

```text
.
|-- config/
|   `-- church.json
|-- index.html
|-- 404.html
|-- pages/
|   |-- beliefs.html
|   |-- sermons.html
|   `-- ...
|-- testimonies/
|   |-- pastor-testimony.html
|   `-- ...
|-- assets/
|   |-- css/
|   |-- data/
|   |-- icons/
|   |-- images/
|   |-- js/
|   `-- manifest.json
|-- netlify/
|   `-- functions/
|-- tools/
|-- sw.js
|-- netlify.toml
|-- _headers
|-- robots.txt
`-- sitemap.xml
```

`sw.js` intentionally stays at the root. Browsers use the service worker file location to decide its scope, so keeping it at `/sw.js` lets it manage the whole site.

## What This Site Contains

- `config/church.json` contains starter identity values used by `tools/customize-site.js`.
- `/index.html` is the home page.
- Topic pages such as `/pages/beliefs.html`, `/pages/discipleship.html`, `/pages/resources.html`, `/pages/romans-road.html`, and `/pages/new-believer.html` explain church beliefs and next steps.
- Contact and response pages such as `/pages/prayer-request.html`, `/pages/ask-a-pastor.html`, `/pages/need-help.html`, and `/pages/thank-you.html` support visitor follow-up.
- `/pages/sermons.html` displays recent sermons from YouTube through the site API.
- Testimony pages such as `/testimonies/pastor-testimony.html`, `/testimonies/administrator-testimony.html`, `/testimonies/pianist-testimony.html`, `/testimonies/worship-leader-testimony.html`, and `/testimonies/media-director-testimony.html` are individual story pages.
- `/pages/staff.html`, `/pages/plan-your-visit.html`, and `/pages/questions.html` are visitor-facing information pages.

## Main Shared Files

- `/assets/js/site-enhancements.js` adds shared browser behavior:
  - keyboard skip link
  - current navigation highlighting
  - mobile menu and dropdown behavior
  - next-gathering banner from `/assets/data/site-events.json`
  - structured data for search engines

- `/assets/css/site-enhancements.css` styles shared enhancements:
  - skip link
  - next-gathering banner
  - mobile menu
  - dropdown navigation

- `/assets/data/site-events.json` controls the next-gathering banner. Weekly events use:
  - `day`: 0 for Sunday, 1 for Monday, through 6 for Saturday
  - `time`: 24-hour time such as `10:30`
  - `endTime`: 24-hour time such as `12:00`

- `sw.js` is the service worker. It caches core pages and assets so the site loads faster and has an offline fallback. When changing cached files, update `CACHE_NAME` so visitors receive the new version.

- `/assets/manifest.json` provides installable app metadata for browsers and mobile devices.

- `netlify.toml` is an optional Netlify adapter. It publishes the project root and routes `/api/sermons` to the included sermon function when hosted on Netlify.

## Sermon Feed

The static site works without an automatic sermon feed. Churches can manually link to sermons in `pages/sermons.html`.

If using the included Netlify sermon feed, the sermon page does not call YouTube directly from the browser. Instead:

1. `/pages/sermons.html` calls `/api/sermons`.
2. Netlify redirects that request to `netlify/functions/youtube-sermons.js`.
3. The Netlify function uses the YouTube API key stored in hosting environment variables.
4. The function returns a small JSON list of recent videos.
5. `/pages/sermons.html` renders the newest video as the featured sermon and the rest as cards.

Required environment variables:

```text
SERMONS_API_KEY=your-provider-api-key
SERMONS_CHANNEL_ID=optional-channel-id
```

`SERMONS_API_KEY` is required for the live sermon feed. `SERMONS_CHANNEL_ID` is optional if the function has a default channel ID configured.

Other hosts can be used, but the sermon function must be adapted for that host's serverless/API format.

The `.env` file is for local development only and should never be committed to Git. `.env.example` documents the variable names without exposing real secrets.

## Local Preview

PowerShell:

```powershell
.\preview.ps1
```

Command Prompt:

```bat
preview.bat
```

The local preview usually runs at:

```text
http://localhost:3000/
```

## Editing Guidelines

- Start by editing `config/church.json`, then run `node tools/customize-site.js`.
- Edit page content directly in the matching `.html` file under `pages/` or `testimonies/`.
- Keep shared navigation links consistent across pages.
- Put shared behavior in `/assets/js/site-enhancements.js` instead of copying new JavaScript into every page.
- Put shared enhancement styles in `/assets/css/site-enhancements.css`.
- Update `/assets/data/site-events.json` for regular weekly schedule changes or special events.
- If cached files change and visitors are not seeing updates, update `CACHE_NAME` in `sw.js`.
- When moving pages, update `netlify.toml`, `sitemap.xml`, and `sw.js` together.
- If not using Netlify, keep the static pages and replace or remove the Netlify-specific function/redirect behavior.
