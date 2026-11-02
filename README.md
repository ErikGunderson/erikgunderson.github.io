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
