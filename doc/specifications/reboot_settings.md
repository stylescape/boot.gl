# Reboot Settings

Every value in `reboot.scss` is a `!default` setting. Override any of them
when you load the module:

```scss
@use "pkg:boot.gl/scss/reboot" with (
    $font-family-base: (Georgia, serif),
    $body-bg: #fafafa,
    $enable-smooth-scroll: false,
);
```

A setting whose default is `null` generates no declaration until you set
it. Sass replaces a `null` passed to `with` by the default value, so to drop
one of the colours below, set it to `false`.

### Options

| Setting | Default |
| --- | --- |
| `$layer` | `null` (wrap the output in `@layer <name>`) |
| `$prefix` | `"boot-"` (custom property prefix) |
| `$enable-smooth-scroll` | `true` |
| `$enable-button-pointers` | `true` |
| `$enable-dark-mode` | `true` |
| `$enable-reduced-motion` | `true` (animations and transitions finish instantly under `prefers-reduced-motion: reduce`) |
| `$enable-aria-cursors` | `true` (`progress` cursor on `[aria-busy="true"]`, `not-allowed` on `[aria-disabled="true"]` and `:disabled`) |

### Spacing

| Setting | Default |
| --- | --- |
| `$spacer` | `1rem` |
| `$block-margin-bottom` | `$spacer` (address, lists, blockquote, pre, figure) |

### Typography

| Setting | Default |
| --- | --- |
| `$font-size-root` | `null` |
| `$font-family-sans-serif` | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| `$font-family-monospace` | `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |
| `$font-family-base` | `$font-family-sans-serif` |
| `$font-family-code` | `$font-family-monospace` |
| `$font-size-base` | `1rem` |
| `$font-weight-base` | `400` |
| `$font-weight-bolder` | `bolder` |
| `$line-height-base` | `1.5` |

### Body

| Setting | Default |
| --- | --- |
| `$body-color` | `#212529` |
| `$body-color-dark` | `#dee2e6` |
| `$body-bg` | `#fff` |
| `$body-bg-dark` | `#212529` |
| `$body-text-align` | `null` |

### Headings

| Setting | Default |
| --- | --- |
| `$headings-margin-bottom` | `$spacer * 0.5` |
| `$headings-font-family` | `null` |
| `$headings-font-style` | `null` |
| `$headings-font-weight` | `500` |
| `$headings-line-height` | `1.2` |
| `$headings-color` | `inherit` |
| `$h1-font-size` | `$font-size-base * 2.5` |
| `$h2-font-size` | `$font-size-base * 2` |
| `$h3-font-size` | `$font-size-base * 1.75` |
| `$h4-font-size` | `$font-size-base * 1.5` |
| `$h5-font-size` | `$font-size-base * 1.25` |
| `$h6-font-size` | `$font-size-base` |

### Text

| Setting | Default |
| --- | --- |
| `$paragraph-margin-bottom` | `$spacer` |
| `$list-padding-inline-start` | `$spacer * 2` |
| `$dt-font-weight` | `700` |
| `$dd-margin-bottom` | `$spacer * 0.5` |
| `$small-font-size` | `0.875em` |
| `$sub-sup-font-size` | `0.75em` |
| `$mark-padding` | `0.1875em` |
| `$mark-color` | `inherit` |
| `$mark-bg` | `#fff3cd` |
| `$mark-bg-dark` | `#664d03` |

### Links

| Setting | Default |
| --- | --- |
| `$link-color` | `#0d6efd` |
| `$link-color-dark` | `#6ea8fe` |
| `$link-decoration` | `underline` |
| `$link-hover-color` | `#0a58ca` |
| `$link-hover-color-dark` | `#8bb9fe` |
| `$link-hover-decoration` | `null` |

### Horizontal rules

| Setting | Default |
| --- | --- |
| `$hr-margin-y` | `$spacer` |
| `$hr-color` | `inherit` |
| `$hr-opacity` | `0.25` |
| `$hr-height` | `1px` |

### Code

| Setting | Default |
| --- | --- |
| `$code-font-size` | `0.875em` |
| `$code-color` | `#d63384` |
| `$code-color-dark` | `#e685b5` |
| `$pre-color` | `null` |
| `$kbd-padding-y` | `0.1875rem` |
| `$kbd-padding-x` | `0.375rem` |
| `$kbd-font-size` | `$code-font-size` |
| `$kbd-color` | `#fff` |
| `$kbd-color-dark` | `#212529` |
| `$kbd-bg` | `#212529` |
| `$kbd-bg-dark` | `#dee2e6` |
| `$kbd-border-radius` | `0.25rem` |
| `$nested-kbd-font-weight` | `null` |

### Tables

| Setting | Default |
| --- | --- |
| `$table-cell-padding-y` | `$spacer * 0.5` |
| `$table-caption-color` | `#6c757d` |
| `$table-caption-color-dark` | `#adb5bd` |
| `$table-th-font-weight` | `null` |

### Forms

| Setting | Default |
| --- | --- |
| `$legend-margin-bottom` | `$spacer * 0.5` |
| `$legend-font-size` | `1.5rem` |
| `$legend-font-weight` | `null` |

## Colours and dark mode

The reboot writes its colours to custom properties on `:root` and reads them
back with `var()`:

```css
:root {
    color-scheme: light dark;
    --boot-body-color: light-dark(#212529, #dee2e6);
    --boot-body-bg: light-dark(#fff, #212529);
    /* link-color, link-hover-color, code-color, mark-bg, kbd-color, kbd-bg,
       table-caption-color */
}
```

`light-dark()` picks the value that matches the user's colour scheme. To
change a colour at runtime, set its custom property:

```css
:root {
    --boot-link-color: light-dark(teal, turquoise);
}
```

Set `color-scheme: light` on `:root` to force light mode, or set
`$enable-dark-mode: false` to emit the light values only.
