# Setup Guide

This guide is written for a church volunteer who wants clear steps and does not want to guess.

The short version is:

1. Install Node.js.
2. Run the startup wizard.
3. Preview the website.
4. Replace images and edit page words.
5. Put the website online.

## Before You Start

You need three basic things:

- A computer.
- A web browser, such as Chrome, Edge, Firefox, or Safari.
- Node.js, which lets the setup wizard and preview server run.

Install Node.js from:

```text
https://nodejs.org
```

Choose the normal recommended version. After installing, close and reopen your terminal or project folder.

## Step 1: Run The Startup Wizard

The startup wizard asks simple questions and fills in the church information for you.

### Easiest Windows Option

Double-click:

```text
start.bat
```

### PowerShell Option

If double-clicking does not work:

1. Open this project folder.
2. Hold `Shift`.
3. Right-click inside the folder.
4. Choose `Open PowerShell window here` or `Open in Terminal`.
5. Type:

```powershell
.\start.ps1
```

6. Press `Enter`.

### What To Type Into The Wizard

The wizard will show questions like this:

```text
Church name [Example Church]:
```

The answer in brackets is the current answer.

- Type a new answer and press `Enter`.
- Or press `Enter` without typing to keep the current answer.

If you do not know the YouTube channel ID yet, leave the placeholder there. The site can still work without automatic sermons.

## Step 2: Preview The Website

At the end of the wizard, choose `y` when it asks if you want to start the preview server.

Then open this address in your browser:

```text
http://localhost:3000/
```

Leave the terminal window open while you preview.

To stop the preview server:

1. Click inside the terminal window.
2. Press `Ctrl + C`.
3. If it asks `Terminate batch job?`, type `y` and press `Enter`.

## Step 3: Replace The Images

The starter has placeholder images. Replace these with your church's real images:

```text
assets/images/hero-placeholder.svg
assets/images/pastor-placeholder.svg
assets/images/social-card-placeholder.svg
assets/icons/favicon.svg
```

Plain-language suggestions:

- `hero-placeholder.svg`: use a wide photo of the church building, sanctuary, or congregation.
- `pastor-placeholder.svg`: use a photo of the pastor or main leader.
- `social-card-placeholder.svg`: use a wide image that looks good when someone shares the website on Facebook.
- `favicon.svg`: use a simple logo or icon.

The easiest beginner path is to keep the same filenames. If you change file names, you must also update the matching file paths in the website files.

## Step 4: Edit The Main Words

Most church volunteers should edit these files first:

```text
index.html
pages/plan-your-visit.html
pages/staff.html
pages/beliefs.html
pages/sermons.html
pages/prayer-request.html
pages/resources.html
```

Open the file in Visual Studio Code or another text editor.

Most edits are just changing words between tags.

Example:

```html
<h1>Welcome to Your Church</h1>
```

Change it to:

```html
<h1>Welcome to First Baptist Church</h1>
```

Try not to delete:

- `<`
- `>`
- quotation marks
- closing tags such as `</p>`, `</h1>`, and `</section>`

## Step 5: Update Weekly Events

Weekly service/event times live here:

```text
assets/data/site-events.json
```

Day numbers work like this:

- `0` means Sunday
- `1` means Monday
- `2` means Tuesday
- `3` means Wednesday
- `4` means Thursday
- `5` means Friday
- `6` means Saturday

Time uses a 24-hour clock:

- `09:15` means 9:15 AM
- `10:30` means 10:30 AM
- `18:00` means 6:00 PM

## Step 6: Choose Sermon Setup

You have two beginner-friendly choices.

### Choice A: Manual Sermon Links

This is the simplest choice.

Use this if:

- you do not want a YouTube API key
- you already have a YouTube/Facebook/podcast page
- you want fewer technical steps

Edit:

```text
pages/sermons.html
```

Link buttons to your sermon archive or YouTube channel.

### Choice B: Automatic YouTube Sermons

Use this if:

- your church uploads sermons to YouTube
- you want the website to show recent sermons automatically
- you are using Netlify, or you have a technical helper for another host

For Netlify, set these environment variables:

```text
SERMONS_API_KEY=your-youtube-api-key
SERMONS_CHANNEL_ID=your-youtube-channel-id
```

Do not put secret API keys in normal website files.

## Step 7: Put The Website Online

This site can be hosted in several places.

### Netlify

Good beginner choice, especially if you want automatic YouTube sermons.

Settings:

- Build command: leave blank
- Publish directory: `.`
- Functions directory: `netlify/functions`

### Vercel

Good for static pages.

Settings:

- Build command: leave blank
- Output/static directory: `.`

Automatic sermons need a function conversion.

### Cloudflare Pages

Good for static pages.

Settings:

- Build command: leave blank
- Output directory: `.`

Automatic sermons need a Pages Function or Worker conversion.

### Traditional Hosting Or cPanel

You can upload the files in this folder.

Use manual sermon links unless your host supports a backend function.

## Common Problems

### The command says Node.js was not found

Install Node.js:

```text
https://nodejs.org
```

Then close and reopen the terminal.

### The website does not open at localhost

Make sure the preview server is still running.

You should see a terminal window that says the server is running. Leave it open.

### The page looks broken

Check the last file you edited.

Look for:

- a missing `<`
- a missing `>`
- a missing quote mark
- a missing closing tag like `</p>`

### Images do not show

Check:

- the image is actually in `assets/images/`
- the filename is spelled exactly right
- the file extension matches, such as `.jpg`, `.png`, or `.svg`

### Sermons do not load

If you are using manual links, check the links in `pages/sermons.html`.

If you are using automatic YouTube sermons:

- make sure the API key is set in your host
- make sure the channel ID is correct
- make sure the sermon function is deployed

## Before Going Live

Check these:

- Church name is correct.
- Address is correct.
- Phone number is correct.
- Email address is correct.
- Service times are correct.
- Staff information is correct.
- Placeholder images are replaced.
- Sermon links or sermon feed work.
- Contact/prayer forms go where you expect.
- The site works on a phone.
- The site works on a desktop computer.
