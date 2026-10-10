# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Always create a fork from the `main` branch.
2. If needed, update the README.md with details of changes.
3. Do not increase the version numbers in any files. The project owner(s) will take care of this.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Upstream tracking

`src/scss/reboot.scss` is a fork of Bootstrap 5's `scss/_reboot.scss`, so
Bootstrap fixes do not reach it by themselves. `src/scss/normalize.css` is
modern-normalize, which a test keeps in step with the `modern-normalize`
devDependency; the reboot has no such test, so compare it by hand.

Sync procedure, for each Bootstrap release (check with `npm view bootstrap
version`):

1. Fetch the previous and the new `scss/_reboot.scss` from the `twbs/bootstrap`
   tags and diff them: `git diff vA.B.C vX.Y.Z -- scss/_reboot.scss` in a
   clone of Bootstrap.
2. Port what applies. The fork differs on purpose: custom properties with
   `light-dark()` instead of `data-bs-theme`, logical properties instead of
   RTLCSS, `$spacer`-based spacing and every setting `!default`. Skip changes
   that only touch those parts or Bootstrap's variables and mixins.
3. Add a test in `tst/scss.test.mjs` for each ported behaviour, run
   `npm run lint`, `npm test` and `npm run test:browser`, and note the port
   under Changed or Fixed in `CHANGELOG.md`.
4. Add a row to the table below, also when nothing applied.

| Date | Bootstrap release compared | Ported |
| --- | --- | --- |
| 2025-05-23 | Fork created (5.3.x, exact release not recorded) | n/a |

No release has been compared since the fork. The first comparison should
diff against the 5.3.x release current on 2025-05-23 and record that exact
version here.
