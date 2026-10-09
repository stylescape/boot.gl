# Changelog

All notable changes to **boot.gl** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Fix pass of 2026-10-07/08 (`781c6e0`). Open follow-ups are in `TODO.md`.

### Changed

- **The reset changes how pages look:** it now removes list markers
  (`ol`, `ul`, `menu`), generated quotation marks (`blockquote`, `q`) and
  table border spacing, and sets `body { line-height: 1 }`.
- The reset applies to `*` (zero specificity) instead of a list of ~150
  element selectors, so any later rule overrides it. `main` and `search`
  get `display: block`, and `[hidden]` keeps working.
- `reset_bleed` relies on the `margin`, `padding` and `font` shorthands
  instead of repeating their longhands.
- The publish workflow runs on Node 22 (was 18, too old for Vite 8 and
  Sass); `engines` requires Node ≥ 20.19.

### Fixed

- **The npm package was empty:** 0.0.2 contained only LICENSE, README and
  `package.json`. The build now writes `dist/package.json` with paths
  relative to `dist/` (the published root), and the package contains
  `css/boot.gl.css`, `normalize.css`, `reboot.css` (each also minified) and
  the SCSS sources.
- **`reboot.scss` compiles on its own:** it used undefined variables and the
  Bootstrap `font-size()` mixin. All settings are now `!default` and can be
  set with `@use "boot.gl/scss/reboot" with (…)`; settings set to `null`
  emit no declaration.
- **`npm run dev`** works again: the Vite config renders the demo page with
  Kist, rebuilds on changes to `src/`, `exe/` and `kist.yml` without
  overlapping builds, and no longer reloads in a loop on `dist/` writes.
- Root `package.json` `exports` point at files that exist (`./scss/*`,
  `./css/*`, `style`).
- Docs: the MkDocs site and the README describe the actual stylesheets and
  settings (new Stylesheets and Reboot settings pages; the unrelated unit
  system page is removed).

### Added

- `normalize.css` and `reboot.css` in `dist/css/`.
- `npm test`: Node test runner checks that the reset, normalize and reboot
  stylesheets compile, that the reset removes list markers, quotation marks
  and table spacing, and that reboot accepts configuration.

### Removed

- `.npmignore`: it had no effect, because the package is published from
  `dist/` with an explicit `files` list (`npm pack --dry-run` in `dist/`
  lists the same 13 files without it).
