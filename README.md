# erikgunderson.github.io

Personal site, built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages by GitHub Actions.

## Develop
```sh
npm install      # first time only
npm start        # dev server with live reload at http://localhost:8080
npm run build    # one-off build into _site/
```

## Layout
- `src/` — source: pages (`*.njk`), `_includes/` layouts, `_data/` site data, `css/`, `js/`, `assets/`
- `_site/` — build output (git-ignored; built in CI)
- `.github/workflows/deploy.yml` — builds and publishes on every push to `main`

## Updating content
- **Resume PDF**: the "Download resume" button links to the Google Docs PDF export
  (`resumeUrl` in `src/_data/site.json`), so it is always the current Doc. Use the public
  *web copy* of the resume (no phone/email), shared as "Anyone with the link: Viewer".
- **Experience page**: `src/_data/experience.json` is a separate copy of the resume content.
  When you change the resume, update this file too.
- **Skills**: `src/_data/skills.json`.
- **Projects**: add a Markdown file to `src/content/projects/` (copy an existing one). Front matter
  holds `title`, `order`, `tech`, and `links`; the body is the description.
