# Setup Guide

This starter is a static church website. The normal pages can be hosted on Netlify, Vercel, Cloudflare Pages, GitHub Pages with adjustments, or many traditional web hosts.

Netlify is the easiest option if you want to use the included automatic YouTube sermon feed. Other hosts can still use the static pages, but the sermon API may need to be adapted or replaced with manual sermon links.

## Tools You Need

Required:

- A text editor such as Visual Studio Code
- A web browser

Strongly recommended:

- Node.js, for local preview and the customization script
- Git, for saving versions
- A GitHub account, if you want easy publishing through Netlify, Vercel, or Cloudflare Pages

Optional:

- A YouTube API key, only if you want automatic sermon loading
- A hosting account such as Netlify, Vercel, Cloudflare Pages, or a traditional web host

## 1. Edit Church Info

Open `config/church.json` and replace the example values:

- `churchName`
- `domain`
- `streetAddress`
- `city`
- `state`
- `postalCode`
- `phoneDisplay`
- `phoneHref`
- `email`
- `youtubeHandle`
- `youtubeChannelId`
- `facebookUrl`
- pastor fields

Then run:

```powershell
node tools/customize-site.js
```

That replaces the starter placeholders across the static files.

## 2. Replace Images

Replace these placeholder SVGs with your own images:

- `assets/images/hero-placeholder.svg`
- `assets/images/pastor-placeholder.svg`
- `assets/images/social-card-placeholder.svg`
- `assets/icons/favicon.svg`

If you use JPG or PNG files instead, update the matching paths in the HTML files, `assets/manifest.json`, and `assets/js/site-enhancements.js`.

## 3. Edit Content

Important pages:

- `index.html`
- `pages/plan-your-visit.html`
- `pages/beliefs.html`
- `pages/sermons.html`
- `pages/staff.html`
- `pages/prayer-request.html`
- `pages/resources.html`

Testimony pages live in `testimonies/`.

## 4. Configure Sermons

You have two simple choices:

- Manual sermon links: edit `pages/sermons.html` and link directly to YouTube, Facebook, podcast pages, or your archive.
- Automatic YouTube feed: use a serverless/API function so your YouTube API key is not exposed in browser code.

The included automatic feed is written for Netlify.

Set these environment variables in Netlify:

```text
SERMONS_API_KEY=your-youtube-api-key
SERMONS_CHANNEL_ID=your-youtube-channel-id
```

For local development, copy `.env.example` to `.env` and fill in the same values.

If you use Vercel, Cloudflare Pages, or another host, a technical helper needs to adapt `netlify/functions/youtube-sermons.js` for that platform.

## 5. Preview Locally

PowerShell:

```powershell
.\preview.ps1
```

Command Prompt:

```bat
preview.bat
```

Then open:

```text
http://localhost:3000/
```

## 6. Deploy

For Netlify:

- Publish directory: `.`
- Functions directory: `netlify/functions`
- Build command: leave blank

The included `netlify.toml` already contains the needed redirects and function settings.

For Vercel or Cloudflare Pages:

- Connect the repo.
- Leave the build command blank.
- Use `.` as the publish/output directory if asked.
- Use manual sermon links, or have a technical helper convert the sermon function.

For traditional hosting:

- Upload the files in this folder.
- Use manual sermon links unless your host supports a backend/API function.
