# Mushfiqur Rahman Faiyaz — Personal Portfolio Website
### Founder of RanFie Inc. • "A thinker who loves to solve daily problems"

Welcome to your personal portfolio website! This site is designed from the ground up to reflect your identity, your deep midnight navy RanFie branding, your apps (**ExpendFy** and **PidiFie**), and to deliver a high-tech "wow factor" experience on both phones and computers.

---

## ⚡ 3 Super Simple Ways to Open & View Your Site

Because this site is built using clean, modern web standards, **you do not need complex code setups or compilers to see it work.**

### Option 1: Double-Click (The Easiest Way)
1. Open this folder (`Personal website`) in your file manager.
2. Double-click **`index.html`**.
3. It will open right inside your web browser (Chrome, Edge, Brave, Safari, etc.)!

### Option 2: Using Node.js / Terminal
If you have terminal/command prompt open:
```bash
npm start
```
Then visit `http://localhost:3000` in your browser.

### Option 3: VS Code Live Server
If you use VS Code:
1. Right-click on `index.html`.
2. Click **"Open with Live Server"**.

---

## 📁 Where Everything Is Located

Here is the simple map of your project files:

- **`index.html`** — Your main Home page (Hero, Quick Facts, Live Bangladesh Clock, About, What I've built, Social links).
- **`projects.html`** — Your detailed Projects page (deep-dive cards for ExpendFy & PidiFie).
- **`css/main.css`** — All colors, dark/light themes, animations, rounded cards, and responsive styles.
- **`js/`**
  - **`audio.js`** — Gentle sound effects (off by default; turns on with the speaker icon).
  - **`aurora.js`** — Soft glowing aurora background & floating particles.
  - **`clock.js`** — Live Bangladesh clock (UTC+6) with day/night indicator.
  - **`main.js`** — Handwriting logo intro, 3D card tilt, theme toggle, easter egg, and profile sharing.
- **`assets/images/`**
  - `ranfie-logo.png` — Your original RanFie Inc. logo.
  - `ranfie-logo-transparent.png` — Transparent white logo for dark navy mode.
  - `ranfie-logo-dark.png` — Deep navy logo for light mode.
  - `expendfy-logo.png` & `expendfy-preview.png` — ExpendFy branding & preview.
  - `pidifie-logo.png` & `pidifie-preview.png` — PidiFie branding & preview.
  - `og-preview.png` — The image people see when your website link is shared on WhatsApp, Facebook, LinkedIn, etc.
  - `favicon.svg` — Tab icon.

---

## ✏️ How to Edit Your Text & Information

Open `index.html` in Notepad, VS Code, or any text editor:

### 1. Changing Your Tagline or Name
Search for `hero-title` or `hero-tagline` in `index.html`:
```html
<h1 id="hero-title" class="hero-name">Mushfiqur Rahman Faiyaz</h1>
<p class="hero-tagline">
  &ldquo;A thinker who loves to <span class="highlight">solve daily problems</span>.&rdquo;
</p>
```
Just change the words inside and save the file!

### 2. Changing the About Me Section
Search for `The Story Behind RanFie` or `about-text` in `index.html` to update the three or four sentences describing your philosophy.

---

## 🔗 How to Replace Your Social Media Links

In both `index.html` and `projects.html`, search for `social-buttons-row`. You will see links like this:

```html
<!-- GitHub -->
<a href="https://github.com" target="_blank" ...>

<!-- LinkedIn -->
<a href="https://linkedin.com" target="_blank" ...>

<!-- X (Twitter) -->
<a href="https://x.com" target="_blank" ...>

<!-- Instagram -->
<a href="https://instagram.com" target="_blank" ...>

<!-- YouTube -->
<a href="https://youtube.com" target="_blank" ...>

<!-- Facebook -->
<a href="https://facebook.com" target="_blank" ...>
```

**Simply replace `https://github.com` with your exact profile URL** (for example: `https://github.com/yourusername`).

---

## 🖼️ How to Replace the Screenshot Placeholders

1. Take a screenshot of your app or export an image from Figma/Canva.
2. Save it into the `assets/images/` folder (for example, name it `my-new-expendfy.png`).
3. In `index.html` and `projects.html`, search for `expendfy-preview.png` and change it to `my-new-expendfy.png`:
```html
<img src="assets/images/my-new-expendfy.png" alt="ExpendFy preview" class="preview-img">
```

---

## ➕ How to Add a New App Later

Whenever you build a 3rd or 4th app, you can add it in 2 minutes:

1. Open **`projects.html`**.
2. Find the comment:
   `<!-- =================== PROJECT 2: PIDIFIE =================== -->`
3. Copy the whole `<article class="project-detail-card"> ... </article>` block.
4. Paste it right underneath.
5. Change the title, description, and preview image to your new app!
6. Do the same for the smaller card in **`index.html`** under `#built`.

---

## 🚀 How to Publish Your Website for Free (Zero Cost)

You can launch this website to the entire world with free hosting on **GitHub Pages**, **Vercel**, or **Netlify**:

### Method A: Free on Vercel (Fastest & 1-Click)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Drag and drop this `Personal website` folder directly onto the Vercel dashboard.
3. Click **Deploy**.
4. In 15 seconds, you will have a live URL (e.g. `mushfiq.vercel.app`) with free SSL/HTTPS!

### Method B: Free on GitHub Pages
1. Create a repository on GitHub (e.g. `mushfiq-portfolio`).
2. Upload these files to the repository.
3. Go to **Settings** &rarr; **Pages**.
4. Under "Branch", select `main` and root `/`, then click **Save**.
5. Your site is live at `https://yourusername.github.io/mushfiq-portfolio/`!

---

## 🌟 Built with Pride for RanFie Inc.
*“A thinker who loves to solve daily problems.”*
