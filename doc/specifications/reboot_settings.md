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

A setting set to `null` generates no declaration.

### Options

| Setting | Default |
| --- | --- |
| `$enable-smooth-scroll` | `true` |
| `$enable-button-pointers` | `true` |

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
| `$body-bg` | `#fff` |
| `$body-text-align` | `null` |

### Headings

| Setting | Default |
| --- | --- |
| `$headings-margin-bottom` | `0.5rem` |
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
| `$paragraph-margin-bottom` | `1rem` |
| `$dt-font-weight` | `700` |
| `$small-font-size` | `0.875em` |
| `$sub-sup-font-size` | `0.75em` |
| `$mark-padding` | `0.1875em` |
| `$mark-bg` | `#fff3cd` |

### Links

| Setting | Default |
| --- | --- |
| `$link-color` | `#0d6efd` |
| `$link-decoration` | `underline` |
| `$link-hover-color` | `#0a58ca` |
| `$link-hover-decoration` | `null` |

### Horizontal rules

| Setting | Default |
| --- | --- |
| `$hr-margin-y` | `1rem` |
| `$hr-color` | `inherit` |
| `$hr-opacity` | `0.25` |
| `$hr-height` | `1px` |

### Code

| Setting | Default |
| --- | --- |
| `$code-font-size` | `0.875em` |
| `$code-color` | `#d63384` |
| `$pre-color` | `null` |
| `$kbd-padding-y` | `0.1875rem` |
| `$kbd-padding-x` | `0.375rem` |
| `$kbd-font-size` | `$code-font-size` |
| `$kbd-color` | `#fff` |
| `$kbd-bg` | `#212529` |
| `$kbd-border-radius` | `0.25rem` |
| `$nested-kbd-font-weight` | `null` |

### Tables

| Setting | Default |
| --- | --- |
| `$table-cell-padding-y` | `0.5rem` |
| `$table-caption-color` | `#6c757d` |
| `$table-th-font-weight` | `null` |

### Forms

| Setting | Default |
| --- | --- |
| `$legend-margin-bottom` | `0.5rem` |
| `$legend-font-size` | `1.5rem` |
| `$legend-font-weight` | `null` |
