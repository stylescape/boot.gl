# Quick Start

## Install

```sh
npm install boot.gl
```

## Load a baseline

Pick one of the three [stylesheets](specifications/stylesheets.md) and load
it before your own styles. If you are unsure, start with the reboot
(`reboot.min.css`); the example below uses the hard reset.

```html
<link rel="stylesheet" href="node_modules/boot.gl/css/boot.gl.min.css">
<link rel="stylesheet" href="styles.css">
```

or from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boot.gl@0.1/css/boot.gl.min.css">
```

## With Sass

```scss
@use "pkg:boot.gl";
```

`pkg:` URLs need Sass's Node package importer (`--pkg-importer=node`, or
`importers: [new NodePackageImporter()]` in the JS API).

## Reuse the reset on your own selectors

```scss
@use "pkg:boot.gl/scss/mixins" as boot;   // no reset emitted

.card {
    @include boot.reset-bleed;
}
```

## Put the reset in a cascade layer

Styles in a layer lose to every unlayered style, so nothing you write has to
fight the reset:

```scss
@use "pkg:boot.gl" with ($layer: base);
```
