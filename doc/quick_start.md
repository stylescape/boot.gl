# Quick Start

## Install

```sh
npm install boot.gl
```

## Load a baseline

Pick one of the three [stylesheets](specifications/stylesheets.md) and load
it before your own styles.

```html
<link rel="stylesheet" href="node_modules/boot.gl/css/boot.gl.min.css">
<link rel="stylesheet" href="styles.css">
```

## With Sass

```scss
@use "pkg:boot.gl";
```

`pkg:` URLs need Sass's Node package importer (`--pkg-importer=node`, or
`importers: [new NodePackageImporter()]` in the JS API).

## Reuse the reset on your own selectors

```scss
@use "pkg:boot.gl" as boot;

.card {
    @include boot.reset_bleed;
}
```
