# Firefox Chrome Customizations

A collection of `userChrome.js` scripts and CSS tweaks for Firefox, plus a full guide to getting them running on a fresh install.

## What's Included

| File | What it does |
|---|---|
| `chrome/JS/bookmarks-toolbar-auto-expand.uc.js` | Hovering over a bookmark folder on the toolbar opens it automatically |
| `chrome/userChrome.css` | Orange outline highlight when hovering bookmark toolbar folders |

---

## Setup Guide

### Prerequisites
- Firefox (any recent version)
- Administrator access on your machine
- [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig) — the loader that makes `userChrome.js` possible

---

### Step 1 — Download fx-autoconfig

Go to [https://github.com/MrOtherGuy/fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig) and download or clone the repo.

---

### Step 2 — Find Your Paths

You'll need two locations:

**Firefox installation directory** (where Firefox itself is installed):
- Windows: `C:\Program Files\Mozilla Firefox\`
- Linux: `/usr/lib/firefox/`
- macOS: `/Applications/Firefox.app/Contents/MacOS/`

**Firefox profile directory** (your personal Firefox data):
1. Type `about:support` in the address bar
2. Find **Profile Directory** and click **Open Directory**

---

### Step 3 — Install the Loader (Firefox installation directory)

From the fx-autoconfig repo, copy these into your **Firefox installation directory**:

```
config.js                        → Firefox install root
defaults/pref/config-prefs.js    → Firefox install root/defaults/pref/
```

> **Windows tip:** You can't directly create files in Program Files. Instead, create the files on your Desktop first, then cut/paste them into the target folder — Windows will show a UAC prompt that lets it through since you're an admin.

---

### Step 4 — Set Up Your Profile's Chrome Folder

In your **Firefox profile directory**, create a `chrome/` folder if it doesn't exist already.

From the fx-autoconfig repo's `profile/` folder, copy everything inside into your `chrome/` folder:

```
chrome/
  CSS/
  JS/
  resources/
  utils/
```

---

### Step 5 — Add the Scripts

Copy this repo's files into your `chrome/` folder so the final structure looks like this:

```
chrome/
  CSS/
  JS/
    bookmarks-toolbar-auto-expand.uc.js
  resources/
  utils/
  userChrome.css
```

---

### Step 6 — Enable userChrome.css

Firefox doesn't load `userChrome.css` by default. To enable it:

1. Go to `about:config` in the address bar
2. Search for `toolkit.legacyUserProfileCustomizations.stylesheets`
3. Set it to `true`

---

### Step 7 — Restart Firefox

Restart Firefox. If everything is set up correctly, you'll see this in the Browser Console (`Ctrl+Shift+J`):

```
Browser is executing custom scripts via autoconfig
```

---

## Usage

### Bookmark Folder Hover to Open
Hover over any folder on your bookmarks toolbar and it opens automatically. Moving to a sibling folder closes the previous one — no clicking needed.

### Bookmark Hover Highlight
Hovering a bookmark folder shows an orange outline around it. Applied automatically via `userChrome.css`, nothing extra needed.

---

## Troubleshooting

**Scripts not loading at all:**
- Make sure `config.js` is in the Firefox install root (not the profile)
- Make sure `config-prefs.js` is in `defaults/pref/` inside the install root
- Make sure the `utils/` folder is present inside your `chrome/` folder

**CSS not applying:**
- Make sure `toolkit.legacyUserProfileCustomizations.stylesheets` is set to `true` in `about:config`
- Make sure `userChrome.css` is in the root of `chrome/`, not inside a subfolder

**"Hi mom, I'm loaded!" in the console:**
- This is normal! It's from fx-autoconfig's built-in test script confirming the loader is working.
