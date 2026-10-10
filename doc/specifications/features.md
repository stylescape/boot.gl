# Features

- **Three baselines**: a hard reset, modern-normalize and an opinionated reboot (recommended). Use one; they are not meant to be stacked.
- **Print styles**: an opt-in `print.css` that works with any baseline.
- **Zero-specificity reset**: the reset targets `*`, so any rule you write afterwards wins without `!important` or extra selectors.
- **Reusable mixin**: `reset-bleed` strips margin, padding, border and font from any selector you choose. Load `scss/mixins` to use it without emitting the reset.
- **Cascade layers**: set `$layer` to wrap any baseline in `@layer`, so every unlayered style you write wins.
- **Modern defaults**: the reset applies `border-box` sizing, block-level media, balanced headings and reduced motion; each is a setting you can turn off.
- **Accessibility**: the reset and reboot honour `prefers-reduced-motion`; the reboot shows `aria-busy`, `aria-disabled` and `:disabled` states with cursors.
- **Configurable reboot**: every colour, font, size and spacing value in the reboot is a `!default` Sass setting. Spacing derives from `$spacer`.
- **Dark mode**: the reboot's colours are custom properties (`--boot-body-bg`, …) that follow the user's colour scheme through `light-dark()`.
- **Direction-agnostic**: the reboot uses logical properties, so it works in right-to-left documents without a separate build.
- **CSS or Sass**: each baseline ships as expanded and minified CSS, plus the Sass sources.
- **No dependencies**: pure CSS output, no JavaScript.
