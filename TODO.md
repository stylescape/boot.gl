# boot.gl TODO

`[ ]` = not done, or not verified; the note on the line says which.

## Open items from the 2026-10-07/08 fix pass

The pass fixed the empty npm package, made `reboot.scss` compile on its own,
repaired `npm run dev`, rewrote the reset, the docs site and the README, and
added `npm test`. All of it is uncommitted on `dev` (rebased onto
`origin/dev` at `9cab000` on 2026-10-08). Tests (7), `npm run build` (13 files
in the pack), the dev server and `mkdocs build --strict` pass locally.

Needs a decision:

- [ ] Commit the pass and open a pull request to `dev`. Not done: committing
      and opening a PR were left for the owner to approve.
- [ ] Choose the next version: 0.0.3 or 0.1.0. The reset now removes list
      markers and quotation marks and sets `body { line-height: 1 }`, which
      changes how pages look; that argues for 0.1.0. Bump `package.json`; the
      build syncs `VERSION` and `CITATION.cff`.
- [ ] `dist/package.json` contains `"types": null`. kist's
      `PackageManagerAction` always adds a default `types` and the step can
      only override it. Harmless; remove it if kist gains a way to drop a key.

Needs doing:

- [ ] Publish the release (push a `v*` tag on the branch the workflow runs
      from). The published 0.0.2 contains only LICENSE, README and
      package.json, no CSS or SCSS. The workflow now uses Node 22 (was 18,
      too old for Vite 8 and Sass); it has not run since that change.
- [ ] Look at the demo page in a browser (`npm run dev`): checked only with
      HTTP requests (page and CSS return 200), not visually. The reboot and
      normalize stylesheets have no demo page; swap `stylesheet` in
      `exe/data/index.json` to look at them.
- [ ] Deploy the docs: `deploy_docs.yml` only runs on `main`/`master`, so the
      rewritten docs go live once `dev` is merged there.
- [ ] `sturnia-spatial` depends on `boot.gl` `^0.0.2` without importing it;
      tracked in `starling-sturnia/sturnia-spatial/TODO.md`.

Opportunistic:

- [ ] `src/ts/index.ts` is an empty placeholder and `tsconfig.json` is not
      used by any build step. Remove both, or keep them for planned code.
- [ ] `.npmignore` mentions webpack and excludes `dist/`; it has no effect
      because the package is published from `dist/` with an explicit `files`
      list. Delete it or reduce it to what applies.
- [ ] `normalize.scss` is vendored normalize.css v8.0.1 unchanged, including
      IE/Edge-only rules. Fine as is; trim only if a smaller file matters.
