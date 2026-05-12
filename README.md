# powerfolio

Single-page portfolio site for **Igor Kopestenski** — Backend-Leaning Java Full-Stack Engineer.
Built as a static site (HTML + CSS + vanilla JS) for zero-dependency deployment on **GitHub Pages**.

## Live site

Once GitHub Pages is enabled for this repo, the site will be available at:

```
https://laymer.github.io/powerfolio/
```

## Local preview

The site is fully static — open `index.html` directly, or serve the folder with any static server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Deploying to GitHub Pages

1. Push this branch (or merge to `main`).
2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or whichever branch holds the site), folder: `/ (root)`
4. Save. GitHub will publish the site at `https://<user>.github.io/<repo>/` within a minute or two.

The `.nojekyll` file at the repo root tells GitHub Pages to skip Jekyll processing
and serve the `assets/` folder verbatim.

## Structure

```
.
├── index.html              # Single-page portfolio
├── assets/
│   ├── css/styles.css      # Modern, dark-first design with light-theme toggle
│   ├── js/main.js          # Theme toggle, nav, scroll-reveal animations
│   └── favicon.svg         # Gradient IK monogram
├── .nojekyll               # Disable Jekyll processing on GitHub Pages
└── README.md
```

## Customization

- **Content** lives entirely in `index.html` — update text, links, or sections directly.
- **Colors / typography** are CSS custom properties at the top of `assets/css/styles.css`
  (`--accent`, `--gradient-1`, fonts, etc.) — tweak once, applies everywhere.
- **SEO keywords** for recruiter indexing are in the `<meta name="keywords">` tag and in
  the `application/ld+json` Person schema block of `index.html`.
