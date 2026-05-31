# Setup Guide

This starter is a static church website. It can be hosted on Netlify, GitHub Pages with adjustments, or any static host that supports plain HTML files.

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

The sermon page uses a Netlify function so your YouTube API key is not exposed in browser code.

Set these environment variables in Netlify:

```text
SERMONS_API_KEY=your-youtube-api-key
SERMONS_CHANNEL_ID=your-youtube-channel-id
```

For local development, copy `.env.example` to `.env` and fill in the same values.

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
