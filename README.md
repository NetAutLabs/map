NetAut Labs Map
================

Minimal project scaffold for a single-page NetAut Labs map that launches externally hosted labs.

Contents
- `site/` — React + Vite SPA source. Builds to `site/dist/` for publishing.
- `site/public/` — static assets that are copied to the built site (`labs.manifest.json`, `netautlabs_map.png`).
- `docs/` — project documentation and specs.

Quick start (local development)

```bash
cd site
npm install
npm run dev
```

Build and preview

```bash
cd site
npm ci
npm run build
npm run preview
```

Where static assets live
- The canonical public assets used by the site are in `site/public/`:
  - `site/public/labs.manifest.json` — the local manifest used by the SPA. Edit via PR to add/update labs.
  - `site/public/netautlabs_map.png` — the map image referenced by the UI.

Deployment
- The repository includes a GitHub Actions workflow that builds the `site/` app and publishes `site/dist/` to the `gh-pages` branch. By default the workflow runs on pushes to `main`.
- Ensure your repository Pages settings are configured to serve from the `gh-pages` branch (root).
