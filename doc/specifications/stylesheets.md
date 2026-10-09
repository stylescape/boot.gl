# Stylesheets

| Baseline  | CSS                                  | Sass entry point   |
| --------- | ------------------------------------ | ------------------ |
| Reset     | `css/boot.gl.css`, `css/boot.gl.min.css`     | `scss/index.scss`     |
| Normalize | `css/normalize.css`, `css/normalize.min.css` | `scss/normalize.scss` |
| Reboot    | `css/reboot.css`, `css/reboot.min.css`       | `scss/reboot.scss`    |

## Reset

Removes margin, padding, borders and font styling from every element, along
with list markers, quotation marks and table spacing. Elements look like
plain text until you style them. Based on Eric Meyer's CSS reset.

## Normalize

[normalize.css](https://github.com/necolas/normalize.css) v8.0.1. Keeps useful
browser defaults and fixes inconsistencies between browsers.

## Reboot

A baseline with readable defaults: system font stack, `border-box` sizing,
spaced headings and paragraphs, styled code, links and form controls.
See [Reboot Settings](reboot_settings.md) to adjust it.

## Loading

```html
<link rel="stylesheet" href="node_modules/boot.gl/css/reboot.min.css">
```

```js
import "boot.gl/css/reboot.css";
```

```scss
@use "pkg:boot.gl";                 // reset
@use "pkg:boot.gl/scss/normalize";  // normalize
@use "pkg:boot.gl/scss/reboot";     // reboot
```
