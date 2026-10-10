# Comparison

How boot.gl relates to other CSS resets and baselines. boot.gl's rules are
mostly not new: its normalize is modern-normalize, its reboot is a fork of
Bootstrap Reboot, and its reset is Eric Meyer's with modern defaults. What
it adds is one package with three baselines, configured from Sass, with a
cascade layer option and a dark-mode reboot.

## At a glance

| | Approach | Package | Maintained | Sass settings | Layer option | Dark mode | Reduced motion |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **boot.gl reset** | Remove all styling | npm | Yes | Yes | Yes | n/a | Yes |
| **boot.gl normalize** | Keep and fix defaults | npm | Tracks modern-normalize | Layer only | Yes | n/a | No |
| **boot.gl reboot** | Opinionated baseline | npm | Yes | Every value | Yes | `light-dark()` | Yes |
| Eric Meyer's reset 2.0 | Remove all styling | Copy-paste | No (2011) | No | No | n/a | No |
| normalize.css 8 | Keep and fix defaults | npm | No (2018) | No | No | n/a | No |
| modern-normalize | Keep and fix defaults | npm | Yes | No | No | n/a | No |
| sanitize.css | Normalize plus opinions | npm | Rarely | No | No | No | Separate module |
| Bootstrap Reboot | Opinionated baseline | Part of Bootstrap | Yes | Every value | No | `data-bs-theme` | Smooth scroll only |
| Tailwind Preflight | Remove most styling | Part of Tailwind | Yes | No | Always `base` | No | No |
| Josh Comeau / Andy Bell resets | Small modern reset | Copy-paste | Blog posts | No | No | n/a | Bell: yes |

## Picking a baseline

- **You style every element yourself** (design system, component library):
  the boot.gl reset, Tailwind Preflight if you already use Tailwind, or a
  copy-paste modern reset if you want no dependency.
- **You want browser defaults, minus the inconsistencies**: modern-normalize,
  either directly or as boot.gl's `normalize.css` when you want the `$layer`
  option or the other baselines from the same package.
- **You want readable pages out of the box**: the boot.gl reboot. It is the
  recommended boot.gl baseline: Bootstrap's Reboot without Bootstrap, with
  dark mode, logical properties and cascade layers.

## Compared one by one

### Eric Meyer's reset

The boot.gl reset starts from the same idea: zero margins, padding, borders
and font styles on every element. It applies them through `*` instead of a
list of element selectors, so the reset has zero specificity, and adds
`border-box` sizing, block-level media, balanced headings and reduced
motion. Each addition is a setting, so `@use "pkg:boot.gl" with
($box-sizing: false, $media-block: false, $text-wrap: false,
$interpolate-size: false, $reduced-motion: false)` comes close to the
original.

### normalize.css and modern-normalize

normalize.css has not been released since 8.0.1 in 2018 and carries many
rules for Internet Explorer and the old Edge. modern-normalize is its
maintained successor for current browsers. boot.gl's `normalize.css` is
modern-normalize rule for rule, plus the `$layer` setting; the test suite
fails when it drifts from the `modern-normalize` version boot.gl tracks.

### sanitize.css

sanitize.css goes further than normalize: `border-box`, form control
styling, typography and reduced-motion modules. The boot.gl reboot covers
similar ground in one file and borrows sanitize.css's accessibility cursors
(`aria-busy`, `aria-disabled`, `:disabled`). sanitize.css styles form
controls in more depth.

### Bootstrap Reboot

The boot.gl reboot is a fork of Bootstrap 5's Reboot, so the defaults look
familiar. Differences:

- No Bootstrap: one file, configured with `@use … with (…)`.
- Colours are custom properties with `light-dark()` values that follow the
  user's colour scheme. Bootstrap switches themes with `data-bs-theme`.
- Logical properties instead of an RTLCSS build for right-to-left pages.
- One `$spacer` drives all spacing.
- Optional cascade layer, reduced motion and accessibility cursors.

Fixes in Bootstrap's Reboot do not reach boot.gl automatically.

### Tailwind Preflight

Preflight is built on modern-normalize and removes most styling, like the
boot.gl reset. It is part of Tailwind and always sits in Tailwind's `base`
layer. Outside Tailwind, use the boot.gl reset with `$layer` for the same
effect.

### Josh Comeau's and Andy Bell's resets

Short, well-explained snippets to copy into a project. The boot.gl reset
includes their main ideas (`border-box`, block media, `text-wrap`, reduced
motion) as settings, so you can update them through npm instead of
copying.

## What boot.gl does not do

- Style form controls beyond the basics (see sanitize.css).
- Ship components or utilities (see Bootstrap or Tailwind).
- Support Internet Explorer or the old Edge.
