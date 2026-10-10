# Reset Settings

The reset (`scss/index.scss`) takes these `!default` settings:

```scss
@use "pkg:boot.gl" with (
    $layer: base,
    $media-block: false,
);
```

| Setting | Default | Effect |
| --- | --- | --- |
| `$layer` | `null` | Wraps the reset in `@layer <name>`. `null` emits it unlayered. |
| `$box-sizing` | `border-box` | `box-sizing` for every element and pseudo-element. `false` keeps `content-box`. |
| `$media-block` | `true` | `img`, `picture`, `video`, `canvas` and `svg` become blocks with `max-inline-size: 100%`. |
| `$text-wrap` | `true` | `text-wrap: balance` on headings, `pretty` on paragraphs, list items and captions. |
| `$interpolate-size` | `true` | `interpolate-size: allow-keywords` on `:root`, so `height: auto` can animate. |
| `$reduced-motion` | `true` | Under `prefers-reduced-motion: reduce`, animations and transitions finish instantly and smooth scrolling is off. |

The `$media-block` and `$text-wrap` rules use `:where()`, so like the `*`
rule they have zero specificity.

## Normalize

`scss/normalize.scss` is modern-normalize with one setting, `$layer`, with
the same meaning:

```scss
@use "pkg:boot.gl/scss/normalize" with ($layer: base);
```

## Print

`scss/print.scss` takes `$layer` and `$show-link-urls` (default `true`,
prints the URL after each link and the title after each abbreviation):

```scss
@use "pkg:boot.gl/scss/print" with ($show-link-urls: false);
```

## Cascade layers without Sass

The compiled CSS is unlayered. Put it in a layer when you import it:

```css
@import url("boot.gl/css/boot.gl.css") layer(base);
```

## Mixins

`scss/mixins` emits no CSS on its own:

```scss
@use "pkg:boot.gl/scss/mixins" as boot;

.card {
    @include boot.reset-bleed;   // margin, padding, border, font, vertical-align
}

@include boot.layer(components) {
    .button { padding: 0.5rem 1rem; }
}

@include boot.reduced-motion;    // the reset's reduced-motion rule
```

`reset-bleed` can also be written `reset_bleed`; Sass treats `-` and `_`
alike.
