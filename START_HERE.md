# Start Here

This is the simplest path for a church volunteer who does not normally work on websites.

Take your time. You will not hurt anything by reading first.

## What This Folder Is

This folder is a starter website for a church.

The website already has pages, menus, colors, placeholder images, and starter sections. Your job is to replace the placeholders with your church's real information.

## The Easiest Setup Path

Use the startup wizard first.

### On Windows

1. Install Node.js from `https://nodejs.org`.
2. Close and reopen this project folder.
3. Double-click this file:

```text
start.bat
```

If double-clicking does not work:

1. Hold `Shift`.
2. Right-click inside this folder.
3. Choose `Open PowerShell window here` or `Open in Terminal`.
4. Type this:

```powershell
.\start.ps1
```

5. Press `Enter`.

## What The Startup Wizard Asks

The wizard asks for:

- church name
- website domain
- address
- city, state, and ZIP code
- phone number
- email address
- Facebook page
- YouTube information, if you have it
- pastor information

If you see an answer in brackets, like this:

```text
Church name [Example Church]:
```

you can press `Enter` to keep that answer.

You can leave YouTube fields alone if you do not know them yet.

## What Happens After The Wizard

The wizard updates this file:

```text
config/church.json
```

Then it runs this helper:

```text
tools/customize-site.js
```

That helper replaces starter church information across the website.

At the end, the wizard can start a preview server. If you choose yes, open this address in your browser:

```text
http://localhost:3000/
```

Leave the black terminal window open while you preview the website.

To stop the preview, click inside the terminal window and press:

```text
Ctrl + C
```

## What To Do Next

After the wizard, do these in order:

1. Replace the placeholder images in `assets/images/`.
2. Open `index.html` and update the home page wording.
3. Open `pages/plan-your-visit.html` and update visitor information.
4. Open `pages/staff.html` and update staff information.
5. Open `pages/beliefs.html` and update belief statements.
6. Open `pages/sermons.html` and choose manual sermon links or automatic YouTube sermons.
7. Preview the website again.

For a slower checklist, open:

```text
FIRST_EDIT_CHECKLIST.md
```

## The Main Files You Will Edit

Home page:

```text
index.html
```

Most other pages:

```text
pages/
```

Photos and images:

```text
assets/images/
```

Church settings:

```text
config/church.json
```

Weekly events:

```text
assets/data/site-events.json
```

## Simple Editing Rule

Most of the time, edit the words between tags.

Example:

```html
<h1>Welcome to Your Church</h1>
```

Change only the words:

```html
<h1>Welcome to First Baptist Church</h1>
```

Try not to delete the angle brackets:

```text
< >
```

Try not to delete closing tags:

```text
</p>
</h1>
</section>
```

## If Something Looks Broken

Do this:

1. Do not panic.
2. Think about the last file you edited.
3. Look for a missing `<`, `>`, quote mark, or closing tag.
4. If you use Git, go back to the last saved version.
5. If you are not using Git, compare your file to a fresh copy of the template.

## When You Are Ready For The Full Guide

Use this checklist first:

```text
FIRST_EDIT_CHECKLIST.md
```

Read:

```text
SETUP.md
```

Then read:

```text
README.md
```
