# First Edit Checklist

Use this after you run `start.bat` or `.\start.ps1`.

Work down the list slowly. Check one thing at a time.

## 1. Church Contact Information

Edit with the startup wizard:

```text
start.bat
```

Or edit this file by hand:

```text
config/church.json
```

Check:

- church name
- address
- city, state, and ZIP code
- phone number
- email address
- website domain
- Facebook link
- YouTube link or placeholder
- pastor name

## 2. Home Page

Edit:

```text
index.html
```

Look for these sections:

- Hero
- About
- Pastor
- Beliefs
- Livestream
- Questions
- Contact

Replace lorem ipsum body text with your church's real words.

## 3. Visit Page

Edit:

```text
pages/plan-your-visit.html
```

Check:

- service times
- address
- parking information
- children's ministry information
- what people should wear
- what a first visit feels like

## 4. Staff Page

Edit:

```text
pages/staff.html
```

Check:

- staff names
- job titles
- short bios
- staff photos
- testimony links

Testimony pages are here:

```text
testimonies/
```

## 5. Beliefs Page

Edit:

```text
pages/beliefs.html
```

Check:

- Scripture section
- God section
- humanity and sin section
- salvation section
- church section
- Christian life section
- mission section

Use wording your church actually agrees with.

## 6. Sermons Page

Edit:

```text
pages/sermons.html
```

Choose one:

- Manual sermon links
- Automatic YouTube sermon feed

Manual sermon links are easier.

Automatic YouTube sermons are better if you want the page to update itself, but they require hosting environment variables.

## 7. Prayer And Contact

Edit:

```text
pages/prayer-request.html
index.html
```

Check:

- where form messages go
- prayer request wording
- contact wording
- phone number
- email address

## 8. Resources Page

Edit:

```text
pages/resources.html
```

Replace placeholder resource items with:

- books your church recommends
- Bible study links
- counseling resources
- discipleship resources
- ministry links

## 9. Images

Replace:

```text
assets/images/hero-placeholder.svg
assets/images/pastor-placeholder.svg
assets/images/social-card-placeholder.svg
assets/icons/favicon.svg
```

Beginner tip: keep the same filenames at first.

## 10. Weekly Events

Edit:

```text
assets/data/site-events.json
```

Use this for:

- Sunday worship
- Sunday school
- Wednesday prayer
- youth group
- Bible study

## 11. Preview Before Publishing

Run:

```text
start.bat
```

Choose yes when it asks to start the preview server.

Open:

```text
http://localhost:3000/
```

Click every menu item.

Check the site on:

- a desktop computer
- a phone

## 12. Final Go-Live Check

Before publishing, check:

- no lorem ipsum text is left on public pages
- no placeholder images are left
- all links work
- phone number works on a phone
- email link opens an email
- address opens the right map
- sermons page works
- contact/prayer forms work
- site looks good on a phone
