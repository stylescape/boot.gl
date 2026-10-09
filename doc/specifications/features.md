# Features

- **Three baselines**: a hard reset, normalize.css and an opinionated reboot. Use one; they are not meant to be stacked.
- **Zero-specificity reset**: the reset targets `*`, so any rule you write afterwards wins without `!important` or extra selectors.
- **Reusable mixin**: `reset_bleed` strips margin, padding, border and font from any selector you choose.
- **Configurable reboot**: every colour, font, size and spacing value in the reboot is a `!default` Sass setting.
- **CSS or Sass**: each baseline ships as expanded and minified CSS, plus the Sass sources.
- **No dependencies**: pure CSS output, no JavaScript.
