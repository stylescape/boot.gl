# boot.gl TODO

`[ ]` = not done, or not verified; the note on the line says which.

Completed items are moved to `CHANGELOG.md`; the fix pass of 2026-10-07/08
(`781c6e0`) and the improvement and comparison passes of 2026-10-09 are
described there under Unreleased.

## Needs doing

- [ ] Publish 0.1.0: push the tag `v0.1.0` on the branch the workflow runs
      from. `package.json`, `VERSION` and `CITATION.cff` are at 0.1.0; the
      workflow fails if the tag and `package.json` disagree. The published
      0.0.2 contains only LICENSE, README and package.json, no CSS or SCSS.
      The rewritten publish workflow has not run yet.
- [ ] Optional: register `.github/workflows/publish_package.yml` as a trusted
      publisher for `boot.gl` on npmjs.com, then drop `PUBLISH_NPM_TOKEN`.
      Until then npm publishes with the token (with provenance).
  - **Decided 2026-10-10:** yes: register the workflow as an npm trusted publisher (OIDC, with provenance) and drop `PUBLISH_NPM_TOKEN`. Same for move.gl, font.gl, icon.gl, hue.gl, unit.gl (fleet decision).
  - **Partly done 2026-10-10:** repo side is ready. `publish_package.yml`
    has `id-token: write`, npm >= 11.5.1 and `--provenance`, so it uses OIDC
    as soon as a trusted publisher exists. Left to do on npmjs.com: package
    `boot.gl` > Settings > Trusted Publisher > GitHub Actions, organization
    `stylescape`, repository `boot.gl`, workflow `publish_package.yml`. Only
    after the first OIDC publish succeeds, remove `NODE_AUTH_TOKEN` and the
    `PUBLISH_NPM_TOKEN` secret (removing it earlier breaks the fallback).
- [ ] Deploy the docs: `deploy_docs.yml` only runs on `main`/`master`, so the
      rewritten docs go live once `dev` is merged there.
  - **Partly done 2026-10-10:** the trigger stays on `main`/`master` on
    purpose (`dev` is the default branch, but `mkdocs gh-deploy --force`
    would publish unreleased docs). Added `workflow_dispatch` for a manual
    run, and quoted `mkdocstrings[python]>=0.18` (unquoted, the shell treats
    `>=0.18` as a redirect and the version bound is lost). `mkdocs build
    --strict` passes locally. Left: merge `dev` into `main`, or run the
    workflow by hand.

## Opportunistic

- [ ] The reboot is a fork of Bootstrap 5's Reboot, so Bootstrap fixes do
      not reach it. Compare it with `scss/_reboot.scss` of each Bootstrap
      release and port what applies; last compared: never.
  - **Partly done 2026-10-10:** the procedure and a tracking table are in
    `.github/CONTRIBUTING.md` (Upstream tracking). The first comparison
    itself is still to do, against the Bootstrap 5.3.x release of
    2025-05-23, when the fork was made (exact release not recorded).
