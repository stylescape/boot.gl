# Changelog

All notable changes to **boot.gl** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

To be released as 0.1.0. Fix pass of 2026-10-07/08 (`781c6e0`), and the
improvement and comparison passes of 2026-10-09. Open follow-ups are in `TODO.md`.

### Known limitations

- The demo page's active stylesheet also styles the stylescape chrome (header,
  nav, card titles): with the reset those fall back to the browser serif font,
  with the reboot to the system font. Accepted as is (2026-10-10); the demo
  needs boot.gl above stylescape's typography only inside the specimens.

### Changed

- **The reset applies modern defaults**, each behind a setting:
  `box-sizing: border-box` (`$box-sizing`), block-level media with
  `max-inline-size: 100%` (`$media-block`), `text-wrap: balance`/`pretty`
  (`$text-wrap`) and `interpolate-size: allow-keywords`
  (`$interpolate-size`).
- **The reboot's colours are custom properties** (`--boot-body-bg`, …) with
  `light-dark()` dark-mode values and `color-scheme: light dark`. Turn this
  off with `$enable-dark-mode: false`; `$prefix` renames the properties.
  `mark` now inherits the text colour so it stays readable in dark mode.
- The reboot uses logical properties (`margin-block`,
  `padding-inline-start`, `text-align: start`, `float: inline-start`) and no
  longer carries RTLCSS directives; LTR-only inputs and code are LTR
  unconditionally.
- Reboot spacing derives from a new `$spacer` setting; the hard-coded
  margins for address, lists, `dd`, blockquote, `pre` and figure are now
  `$block-margin-bottom`, `$dd-margin-bottom` and
  `$list-padding-inline-start`.
- **`normalize.css` is now modern-normalize** (v3.0.1), the maintained
  successor of normalize.css v8.0.1 for current browsers. It adds
  `border-box` sizing, a system font stack on `html` and `tab-size: 4`, and
  drops the Internet Explorer and legacy Edge rules. A test fails when it
  drifts from the `modern-normalize` devDependency.
- The README and docs recommend the reboot as the default baseline.
- The mixin is named `reset-bleed`; `reset_bleed` still works, since Sass
  treats `-` and `_` alike.
- `[hidden]` rules skip `hidden="until-found"`, so find-in-page can reveal
  that content.
- `word-wrap` is now `overflow-wrap`.

- **The reset changes how pages look:** it now removes list markers
  (`ol`, `ul`, `menu`), generated quotation marks (`blockquote`, `q`) and
  table border spacing, and sets `body { line-height: 1 }`.
- The reset applies to `*` (zero specificity) instead of a list of ~150
  element selectors, so any later rule overrides it, and `[hidden]` keeps
  working. The HTML5 display-role rules and the `content: ""` fallback for
  old browsers are gone.
- `reset_bleed` relies on the `margin`, `padding` and `font` shorthands
  instead of repeating their longhands.
- The publish workflow runs on Node 22 (was 18, too old for Vite 8 and
  Sass); `engines` requires Node ≥ 20.19. It checks that the tag matches
  `package.json`, runs lint and the package test, attaches only `dist/` to
  the GitHub release (created with `gh`, replacing the archived release
  actions), and publishes with npm provenance.
- The root `package.json` is `private`; only `dist/` is published.
  `dist/` is git-ignored.

### Fixed

- Reboot docs claimed that setting any value to `null` drops its
  declaration. Sass replaces a `null` passed to `with` by the default, so
  this only held for settings whose default is `null`; colours now accept
  `false` to drop them.

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

- `print.css`: opt-in print styles adapted from HTML5 Boilerplate, inside
  `@media print`; `$show-link-urls` controls the URLs after links.
- `prefers-reduced-motion` support in the reset (`$reduced-motion`) and the
  reboot (`$enable-reduced-motion`), and a `reduced-motion` mixin.
- Accessibility cursors in the reboot (`$enable-aria-cursors`): `progress`
  on `[aria-busy="true"]`, `not-allowed` on `[aria-disabled="true"]` and
  `:disabled`. Buttons with `aria-disabled="true"` no longer get the
  pointer cursor.
- `npm run test:browser`: Playwright checks computed styles of every
  stylesheet in Chromium, Firefox and WebKit, including dark mode,
  right-to-left, reduced motion, cascade layers and print. Runs in CI.
- Comparison docs page (boot.gl next to Meyer's reset, normalize.css,
  modern-normalize, sanitize.css, Bootstrap Reboot, Tailwind Preflight and
  the Comeau/Bell resets).

- `$layer` setting on the reset, normalize and reboot: wraps the output in
  `@layer <name>`, so unlayered author styles always win.
- `scss/mixins` (`reset-bleed`, `layer`): load the mixins without emitting
  the reset.
- CI on pushes and pull requests (lint, test, build, package test);
  Dependabot PRs auto-merge only after it passes.
- `npm run lint` (stylelint with `stylelint-config-standard-scss`).
- `npm run test:package`: packs `dist/`, installs it into a scratch project
  and resolves the CSS and every `pkg:` Sass entry point.
- `unpkg` and `jsdelivr` fields in the published `package.json`; CDN
  snippets in the docs.
- Reset Settings docs page.

- `normalize.css` and `reboot.css` in `dist/css/`.
- `npm test`: Node test runner checks that the reset, normalize and reboot
  stylesheets compile, that the reset removes list markers, quotation marks
  and table spacing, and that reboot accepts configuration.

### Removed

- The TypeScript placeholder (`src/ts/`, `tsconfig.json`, the `typescript`
  devDependency), the stray SassDoc page in `doc/sass/`, empty files, and
  the unused `config.version_short`.
- The separate Dependabot auto-merge workflow (now a job in CI).

- `.npmignore`: it had no effect, because the package is published from
  `dist/` with an explicit `files` list (`npm pack --dry-run` in `dist/`
  lists the same 13 files without it).
