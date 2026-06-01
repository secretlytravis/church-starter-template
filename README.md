# Church Starter Template

This is a ready-to-customize static website for a local church.

It is designed for a church that needs a simple, clear, visitor-friendly website without starting from a blank page. You can replace the example church information, update the pages, add your own photos, optionally connect sermons from YouTube, and publish the site on the host you prefer.

You do not need a database. You do not need a complicated build system. Most edits are normal text edits inside `.html`, `.json`, and image files.

## Start Here If You Are New To Websites

Open this file first:

```text
START_HERE.md
```

That file gives the easiest plain-language path.

After that, use:

```text
FIRST_EDIT_CHECKLIST.md
```

That file walks through the first real edits one by one.

The easiest setup method is the startup wizard.

On Windows, double-click:

```text
start.bat
```

Or, in PowerShell, run:

```powershell
.\start.ps1
```

The wizard asks for your church name, address, phone, email, social links, and pastor information. Then it updates the starter website for you and can start the local preview server.

## What You Get

This starter includes:

- A home page
- Plan Your Visit page
- Sermons page with optional YouTube feed
- Beliefs page
- Prayer request page
- Ask a Pastor page
- Need Help page
- New Believer page
- Discipleship page
- Resources page
- Staff page
- Testimony placeholder pages
- Glossary page
- Mobile navigation
- Basic search engine metadata
- Offline/service worker support
- Optional Netlify configuration
- A beginner startup wizard
- A local preview server

## Tools And Accounts You Need

You can edit the basic website with only a text editor. A few extra tools make previewing, saving, and publishing easier.

### Required For Basic Editing

Text editor:

- Easiest option: Visual Studio Code
- Download: `https://code.visualstudio.com`
- Use it to open the whole project folder and edit files.

Web browser:

- Chrome, Edge, Firefox, or Safari
- Use it to preview the site.

### Strongly Recommended

Node.js:

- Download: `https://nodejs.org`
- Needed for the local preview server.
- Needed for `node tools/customize-site.js`.

Git:

- Download: `https://git-scm.com`
- Helps save versions of the site.
- Helpful if you use GitHub, Netlify, Vercel, or Cloudflare Pages.

GitHub account:

- Website: `https://github.com`
- Useful for storing the website and connecting it to a host.
- Not strictly required if someone uploads files manually to a host.

### Optional Depending On Hosting

Hosting account:

- Netlify: easiest path for this template's sermon API
- Vercel: good static hosting, but sermon API needs an adapter
- Cloudflare Pages: good static hosting, but sermon API needs an adapter
- Traditional web host/cPanel: works for the static pages, but sermon API may need to be disabled or rebuilt in PHP/another backend

YouTube API key:

- Only needed if you want the sermon page to load recent YouTube videos automatically.
- Not needed if you manually link to YouTube or keep the placeholder sermon page.

## Best First Step

If you are new to websites, start with:

```text
START_HERE.md
```

Then run:

```text
start.bat
```

If you are already comfortable with files and commands, use:

```text
SETUP.md
```

`SETUP.md` gives the full setup checklist. This README explains the project structure and maintenance details.

## Folder Tour

Here is what the main folders are for:

```text
config/
```

Holds basic church information. Start with `config/church.json`.

```text
assets/
```

Holds shared files such as images, icons, CSS, JavaScript, event data, and the web app manifest.

```text
pages/
```

Holds most of the website pages.

```text
testimonies/
```

Holds individual testimony placeholder pages.

```text
netlify/
```

Holds an optional Netlify serverless function for loading recent sermons from YouTube. The static pages can still be hosted somewhere else.

```text
tools/
```

Holds helper scripts for local preview and customization.

The root folder also has important files:

- `index.html`: the home page
- `404.html`: the not-found page
- `README.md`: this guide
- `START_HERE.md`: simplest beginner instructions
- `FIRST_EDIT_CHECKLIST.md`: step-by-step first editing checklist
- `SETUP.md`: short setup checklist
- `PROJECT_OVERVIEW.md`: maintenance notes
- `start.bat`: easiest Windows startup wizard launcher
- `start.ps1`: PowerShell startup wizard launcher
- `netlify.toml`: optional Netlify hosting settings
- `sw.js`: service worker for caching
- `sitemap.xml`: list of public pages for search engines
- `robots.txt`: search engine instructions

## Step 1: Change The Church Information

Easiest method:

```powershell
.\start.ps1
```

or double-click:

```text
start.bat
```

Manual method:

Open this file:

```text
config/church.json
```

It looks like this:

```json
{
  "churchName": "Example Church",
  "shortName": "Example Church",
  "tagline": "Leading every generation to know Jesus and follow Jesus.",
  "domain": "examplechurch.org",
  "city": "Your City",
  "state": "ST",
  "postalCode": "00000",
  "streetAddress": "123 Church Street",
  "phoneDisplay": "555-555-5555",
  "phoneHref": "5555555555",
  "email": "hello@examplechurch.org",
  "youtubeHandle": "examplechurch",
  "youtubeChannelId": "YOUR_YOUTUBE_CHANNEL_ID",
  "facebookUrl": "https://www.facebook.com/examplechurch",
  "pastorName": "Pastor First Last",
  "pastorShortName": "First",
  "pastorSpouseName": "Spouse Name",
  "pastorStartYear": "YEAR"
}
```

Replace the example values with your church's real information.

Important notes:

- Keep the quotation marks.
- Keep commas after every line except the last line.
- `phoneDisplay` is what people see.
- `phoneHref` is the same number with only digits.
- `domain` should not include `https://`.
- `youtubeHandle` should not include the `@` symbol.

After editing `config/church.json`, run this command:

```powershell
node tools/customize-site.js
```

That command updates the example text across the website.

## Step 2: Replace The Images

The starter uses placeholder SVG images so the template does not contain another church's photos.

Replace these files with your own:

```text
assets/images/hero-placeholder.svg
assets/images/pastor-placeholder.svg
assets/images/social-card-placeholder.svg
assets/icons/favicon.svg
```

Suggested replacements:

- `hero-placeholder.svg`: a clear photo of your church building or congregation
- `pastor-placeholder.svg`: a pastor or staff photo
- `social-card-placeholder.svg`: an image used when links are shared online
- `favicon.svg`: a simple church icon or logo

If you replace an SVG with a JPG or PNG, you also need to update the file path wherever it is used. The easiest path is to keep the same filenames while you are getting started.

## Step 3: Edit The Main Pages

Most churches should edit these first:

```text
index.html
pages/plan-your-visit.html
pages/beliefs.html
pages/staff.html
pages/sermons.html
pages/prayer-request.html
pages/resources.html
```

You can open these files in a text editor and change the words between the HTML tags.

Example:

```html
<h1>Welcome to Example Church</h1>
```

Can become:

```html
<h1>Welcome to First Baptist Church</h1>
```

Be careful when editing:

- Do not delete `<` or `>` characters unless you know what they are for.
- Do not delete closing tags like `</p>`, `</h1>`, or `</section>`.
- If something breaks, check the most recent thing you edited first.

## Step 4: Update Service Times And Events

The next-gathering banner uses this file:

```text
assets/data/site-events.json
```

Example:

```json
{
  "title": "Worship",
  "day": 0,
  "time": "10:30",
  "endTime": "12:00",
  "ctaLabel": "Plan Visit",
  "ctaHref": "/pages/plan-your-visit.html"
}
```

Day numbers:

- `0` means Sunday
- `1` means Monday
- `2` means Tuesday
- `3` means Wednesday
- `4` means Thursday
- `5` means Friday
- `6` means Saturday

Use 24-hour time:

- `09:15` means 9:15 AM
- `10:30` means 10:30 AM
- `18:00` means 6:00 PM

## Step 5: Choose How Sermons Should Work

The sermons page can work in three ways.

### Option A: Manual Sermon Links

This is the simplest option.

Edit:

```text
pages/sermons.html
```

Replace the placeholder archive links with links to your YouTube channel, Facebook page, podcast, or sermon archive.

You do not need an API key for this option.

### Option B: Automatic YouTube Feed With Netlify

This starter includes a Netlify function that can load recent YouTube videos automatically.

The browser does not call YouTube directly. Instead:

1. The page calls `/api/sermons`.
2. Netlify sends that request to `netlify/functions/youtube-sermons.js`.
3. The function asks YouTube for the latest videos.
4. The page displays them.

This keeps your YouTube API key out of public browser code.

For Netlify, set these environment variables:

```text
SERMONS_API_KEY=your-youtube-api-key
SERMONS_CHANNEL_ID=your-youtube-channel-id
```

For local testing:

1. Copy `.env.example`.
2. Rename the copy to `.env`.
3. Put your real values inside `.env`.

Do not commit `.env` to GitHub. The `.gitignore` file is already set up to keep it private.

If you do not want YouTube sermons yet, the site still works. The sermon page will show a setup message instead of recent videos.

### Option C: Automatic Feed With Another Host

This is possible, but someone technical will need to adapt the sermon function.

Use this file as the starting point:

```text
netlify/functions/youtube-sermons.js
```

Then adapt it for your host:

- Vercel: convert it to a Vercel serverless function
- Cloudflare Pages: convert it to a Pages Function or Worker
- Traditional hosting: rebuild it in whatever backend your host supports

If your host only supports plain static files, use Option A.

## Step 6: Preview The Website On Your Computer

You need Node.js installed first:

```text
https://nodejs.org
```

On Windows PowerShell, run:

```powershell
.\preview.ps1
```

On Windows Command Prompt, run:

```bat
preview.bat
```

Then open this address in your browser:

```text
http://localhost:3000/
```

If the preview is running, leave that terminal window open while you test the site.

To stop the preview, press:

```text
Ctrl + C
```

## Step 7: Choose A Hosting Option

This is a static website, so the normal pages can be hosted in many places.

### Hosting Option 1: Netlify

Netlify is the easiest path if you want the included automatic sermon feed.

Recommended Netlify settings:

- Build command: leave blank
- Publish directory: `.`
- Functions directory: `netlify/functions`

The `netlify.toml` file already tells Netlify how to:

- publish the static site
- serve the sermon function
- redirect older page URLs
- handle the not-found page

### Hosting Option 2: Vercel

Vercel can host the static pages.

Basic idea:

- Connect the GitHub repo to Vercel.
- Leave the build command blank.
- Use `.` as the output/static directory if asked.

Important: the included `/api/sermons` function is written for Netlify. If you want automatic YouTube sermons on Vercel, a technical helper needs to convert the function.

### Hosting Option 3: Cloudflare Pages

Cloudflare Pages can host the static pages.

Basic idea:

- Connect the GitHub repo to Cloudflare Pages.
- Leave the build command blank.
- Use `/` or `.` as the output directory if asked.

Important: the included `/api/sermons` function is written for Netlify. If you want automatic YouTube sermons on Cloudflare, a technical helper needs to convert the function to a Pages Function or Worker.

### Hosting Option 4: Traditional Web Hosting

If your church already has hosting with cPanel, FTP, or a file manager, you can upload the site files.

This works well for:

- home page
- interior pages
- images
- CSS
- JavaScript

This may not work for:

- automatic YouTube sermon loading through `/api/sermons`

For traditional hosting, use manual sermon links unless someone can build the API endpoint for that host.

## What To Edit For Each Common Change

Church name, address, phone, email:

```text
config/church.json
node tools/customize-site.js
```

Home page wording:

```text
index.html
```

Visit information:

```text
pages/plan-your-visit.html
```

Beliefs:

```text
pages/beliefs.html
```

Staff:

```text
pages/staff.html
testimonies/
```

Sermons:

```text
pages/sermons.html
.env.example
```

If using Netlify automatic sermons:

```text
netlify/functions/youtube-sermons.js
netlify.toml
```

Weekly schedule:

```text
assets/data/site-events.json
```

Site colors and shared styling:

```text
assets/css/site-enhancements.css
```

Shared menu and banner behavior:

```text
assets/js/site-enhancements.js
```

Search engine URLs:

```text
sitemap.xml
robots.txt
```

## Important Safety Notes

Never publish secret keys in normal website files.

Do not put API keys in:

- `index.html`
- files in `pages/`
- files in `assets/js/`
- `README.md`

Use your hosting provider's environment variable or secret setting for secrets.

Examples:

- Netlify: Environment variables
- Vercel: Environment Variables
- Cloudflare: Variables and Secrets

If your host does not support secrets, do not use the automatic sermon API on that host.

The private local `.env` file should stay on your computer only.

## Troubleshooting

If the page looks broken:

- Make sure the preview server is running.
- Refresh the browser.
- Check the most recent file you edited.
- Make sure quotation marks and closing tags are still there.

If images do not show:

- Check that the image file exists.
- Check that the file path starts with `/assets/images/`.
- Check that the filename spelling and extension match exactly.

If the sermon page does not load videos:

- Make sure the YouTube API key is set in your hosting provider.
- Make sure `SERMONS_CHANNEL_ID` is correct.
- Make sure the sermon API function is deployed.
- Try opening `/api/sermons` on the live site.

If old pages return 404:

- Check `netlify.toml`.
- Make sure redirects are still above the final `/*` 404 rule.

If updates do not appear:

- Hard refresh the browser.
- Clear site data.
- Update `CACHE_NAME` in `sw.js` when cached files change.

## Before Going Live

Use this checklist:

- Church name is correct.
- Address is correct.
- Phone number is correct.
- Email address is correct.
- Service times are correct.
- Social links work.
- Sermons page is tested.
- Staff page is updated.
- Placeholder images are replaced.
- Prayer and contact forms point where you want them to go.
- `sitemap.xml` uses your real domain.
- `robots.txt` uses your real domain.
- Hosting environment variables are set if you use automatic sermons.
- The site has been tested on a phone.

## For Developers Or Volunteers

This is intentionally a static site. There is no package install step and no build command.

Useful commands:

```powershell
node tools/customize-site.js
node --check assets/js/site-enhancements.js
node --check sw.js
node --check netlify/functions/youtube-sermons.js
```

Local preview:

```powershell
.\preview.ps1
```

The service worker stays at the root as `sw.js` so it can control the whole site.

## License And Reuse

This starter is intended to be copied and adapted by churches. Before publishing, replace the example content, placeholder images, and any wording that does not fit your church.
