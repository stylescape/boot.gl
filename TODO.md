# boot.gl TODO

`[ ]` = not done, or not verified; the note on the line says which.

## Open items from the 2026-10-07/08 fix pass

Completed items are moved to `CHANGELOG.md`; the pass itself (`781c6e0`,
pushed to `dev`) is described there under Unreleased.

Needs a decision:

- [ ] Choose the next version: 0.0.3 or 0.1.0. The reset now removes list
      markers and quotation marks and sets `body { line-height: 1 }`, which
      changes how pages look; that argues for 0.1.0. Bump `package.json`; the
      build syncs `VERSION` and `CITATION.cff`.
- [x] `dist/package.json` contained `"types": null`. Fixed in kist 0.1.81
      (now the devDependency): a `null` in `customConfig` drops the key, so
      `types: null` in `kist.yml` stays and the next build omits `types`.

Needs doing:

- [ ] Publish the release (push a `v*` tag on the branch the workflow runs
      from). The published 0.0.2 contains only LICENSE, README and
      package.json, no CSS or SCSS. The workflow now uses Node 22 (was 18,
      too old for Vite 8 and Sass); it has not run since that change.
- [ ] Deploy the docs: `deploy_docs.yml` only runs on `main`/`master`, so the
      rewritten docs go live once `dev` is merged there.
- [ ] `sturnia-spatial` depends on `boot.gl` `^0.0.2` without importing it;
      tracked in `starling-sturnia/sturnia-spatial/TODO.md`.

Opportunistic:

- [ ] Unused files (checked 2026-10-09; none is referenced by a build step,
      `mkdocs.yml` nav or the docs): `src/ts/index.ts` (empty placeholder),
      `tsconfig.json` and the `typescript` devDependency (no TypeScript is
      compiled; also drop `src/ts/**/*` from the watch list in
      `vite.config.mjs`); `doc/sass/` (a SassDoc page for another project,
      v0.0.36, with borders/device/guides mixins, published as a stray page
      of the docs site); the empty `doc/block.txt`, `doc/earth.txt` and
      `.gitmodules`; `src/.gitkeep` (`src/` has files); `config.version_short`
      in `package.json` (not read anywhere). Remove them, or keep the
      TypeScript setup for planned code.
- [ ] Demo page (checked 2026-10-09 in headless Chromium with all three
      stylesheets; no console errors, no 404s, no axe violations, no
      horizontal scroll at 375 px): the active stylesheet also styles the
      stylescape chrome, because the `ss.bootgl` layer sits above stylescape's
      typography. With the reset, the header, nav and card titles fall back
      to the browser serif font; with reboot, to the system font. Cosmetic;
      fixing it needs a way to keep boot.gl's `*` rules out of the chrome.
- [ ] `normalize.scss` is vendored normalize.css v8.0.1 unchanged, including
      IE/Edge-only rules. Fine as is; trim only if a smaller file matters.
