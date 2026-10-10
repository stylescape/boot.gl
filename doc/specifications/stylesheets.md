# Stylesheets

| Baseline  | CSS                                  | Sass entry point   |
| --------- | ------------------------------------ | ------------------ |
| Reset     | `css/boot.gl.css`, `css/boot.gl.min.css`     | `scss/index.scss`     |
| Normalize | `css/normalize.css`, `css/normalize.min.css` | `scss/normalize.scss` |
| Reboot    | `css/reboot.css`, `css/reboot.min.css`       | `scss/reboot.scss`    |
| Print     | `css/print.css`, `css/print.min.css`         | `scss/print.scss`     |

Pick one of reset, normalize and reboot; print works with any of them. If
you are unsure, use the reboot. The [Comparison](comparison.md) page puts
them next to other libraries.

## Reset

Removes margin, padding, borders and font styling from every element, along
with list markers, quotation marks and table spacing. Elements look like
plain text until you style them. Based on Eric Meyer's CSS reset, with
`border-box` sizing, block-level media and balanced headings on top. See
[Reset Settings](reset_settings.md) to adjust it.

## Normalize

[modern-normalize](https://github.com/sindresorhus/modern-normalize), the
maintained successor of normalize.css for current browsers. Keeps useful
browser defaults, fixes inconsistencies between browsers and applies
`border-box` sizing.

## Reboot

*Recommended.*

A baseline with readable defaults: system font stack, `border-box` sizing,
spaced headings and paragraphs, styled code, links and form controls, and a
dark mode that follows the user's colour scheme.
See [Reboot Settings](reboot_settings.md) to adjust it.

## Print

Print styles adapted from HTML5 Boilerplate: black text on white, link URLs
after links, no page breaks inside rows, images, code and quotes. All rules
sit in `@media print`, so load it on every page next to any baseline. Set
`$show-link-urls: false` to keep URLs off the page.

## Loading

```html
<link rel="stylesheet" href="node_modules/boot.gl/css/reboot.min.css">
```

From a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boot.gl@0.1/css/reboot.min.css">
```

```js
import "boot.gl/css/reboot.css";
```

```scss
@use "pkg:boot.gl";                 // reset
@use "pkg:boot.gl/scss/normalize";  // normalize
@use "pkg:boot.gl/scss/reboot";     // reboot
@use "pkg:boot.gl/scss/print";      // print, next to any of the above
@use "pkg:boot.gl/scss/mixins";     // mixins only, no CSS
```
