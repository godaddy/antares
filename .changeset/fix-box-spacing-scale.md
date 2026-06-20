---
"@godaddy/antares": patch
---

fix: align Box/Flex/Grid spacing scale with Figma design system

The `--sp-*` CSS variables on the `.box` class used an exponential `pow()` formula (`density × 2^n`) that produced values mismatched with the Figma `Computed/Space/Box` variables and legacy `@ux/space` behavior. Replaced with a linear `density × factor` scale: `xs`=×0.5 (2px), `sm`=×1 (4px), `md`=×2 (8px), `lg`=×3 (12px), `xl`=×5 (20px), `2xl`=×8 (32px). `Flex` and `Grid` are fixed automatically.
