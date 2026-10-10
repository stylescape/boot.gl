<p align="center">
    <img src="https://raw.githubusercontent.com/stylescape/brand/master/src/logo/logo-transparant.png" width="20%" alt="Stylescape Logo">
</p>
<h1 align="center" style='border-bottom: none;'>boot.gl</h1>
<h3 align="center">Style Reset</h3>

<br/>

<div align="center">

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.boot.gl&up_message=Up&up_color=%23000000&down_message=Down&down_color=%23000000&style=flat-square&logo=Firefox&logoColor=FFFFFF&label=Website&labelColor=%23000000&color=%23000000)
](https://www.boot.gl)
[![NPM Version](https://img.shields.io/npm/v/boot.gl?style=flat-square&logo=npm&logoColor=FFFFFF&label=NPM&labelColor=%23000000&color=%23000000&link=https%3A%2F%2Fwww.npmjs.com%2Funitage%2Fboot.gl)](https://www.npmjs.com/boot.gl)
[![devContainer](https://img.shields.io/badge/devContainer-23354351?style=flat-square&logo=Docker&logoColor=%23FFFFFF&labelColor=%23000000&color=%23000000)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/stylescape/boot.gl)
[![StackBlitz](https://img.shields.io/badge/StackBlitz-23354351?style=flat-square&logo=StackBlitz&logoColor=%23FFFFFF&labelColor=%23000000&color=%23000000)](https://stackblitz.com/github/stylescape/boot.gl/tree/main?file=src%2Findex.html)
[![GitHub License](https://img.shields.io/github/license/stylescape/boot.gl?style=flat-square&logo=readthedocs&logoColor=FFFFFF&label=&labelColor=%23000000&color=%23000000&link=LICENSE)](https://github.com/stylescape/boot.gl/blob/main/LICENSE)

</div>

<div align="center">

[![Report a Bug](https://img.shields.io/badge/Report%20a%20Bug-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/boot.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=bug_report.yml)
[![Request a Feature](https://img.shields.io/badge/Request%20a%20Feature-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/boot.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=feature_request.yml)
[![Ask a Question](https://img.shields.io/badge/Ask%20a%20Question-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/boot.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=question.yml)
[![Make a Suggestion](https://img.shields.io/badge/Make%20a%20Suggestion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/boot.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=suggestion.yml)
[![Start a Discussion](https://img.shields.io/badge/Start%20a%20Discussion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/boot.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=discussion.yml)

</div>

---

<br/>

`boot.gl` is the style reset of the Stylescape suite. It ships three
independent baselines, so you can pick the one that fits. If you are unsure,
use the reboot.

| Stylesheet       | Source                     | What it does                                                                             |
| ---------------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `reboot.css`     | `scss/reboot.scss`         | **Recommended.** Readable typography, dark mode, logical properties; every value is a setting |
| `boot.gl.css`    | `scss/index.scss`          | Hard reset: strips margins, padding, borders, list markers and quotes from every element |
| `normalize.css`  | `scss/normalize.scss`      | modern-normalize: keeps browser defaults, fixes inconsistencies                          |
| `print.css`      | `scss/print.scss`          | Opt-in print styles; works next to any of the above                                      |

Each file ships expanded and minified (`*.min.css`). See the
[comparison](https://www.boot.gl/specifications/comparison/) with Meyer's
reset, normalize.css, sanitize.css, Bootstrap Reboot and Tailwind Preflight.

## Installation

```sh
npm install boot.gl
```

## Usage

### CSS

```html
<link rel="stylesheet" href="node_modules/boot.gl/css/boot.gl.min.css">
```

from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boot.gl@0.1/css/boot.gl.min.css">
```

or, through a bundler:

```js
import "boot.gl/css/boot.gl.css";
```

### Sass

```scss
// Hard reset, in a cascade layer so every unlayered style wins
@use "pkg:boot.gl" with ($layer: base);

// Or the configurable reboot
@use "pkg:boot.gl/scss/reboot" with (
    $body-bg: #fafafa,
    $link-color: teal,
);

// Mixins only (`reset-bleed`, `layer`), no CSS emitted
@use "pkg:boot.gl/scss/mixins" as boot;
```

`pkg:` URLs need Sass's Node package importer (`--pkg-importer=node`, or
`importers: [new NodePackageImporter()]` in the JS API).

## Development

```sh
npm install
npm run lint           # stylelint
npm test               # compile and check every stylesheet
npm run test:browser   # computed styles in Chromium, Firefox and WebKit
npm run build          # build dist/
npm run test:package   # pack dist/ and load it as a dependency (after build)
npm run dev            # dev server with a demo page on http://localhost:3000
```

