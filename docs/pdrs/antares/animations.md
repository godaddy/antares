# Antares Motion Decision Record

Status: **Proposed**

This document proposes motion guidelines for Antares. It records recommended defaults and an
implementation direction for review; it is not an approved public motion-token contract. The
current component changes reflect this proposal, while public token adoption remains deferred to
the theming.

## Table of Contents

- [Problem](#problem)
- [Methodology](#methodology)
- [Current motion baseline](#current-motion-baseline)
- [Research provenance](#research-provenance)
- [Duration rationale](#duration-rationale)
- [Easing rationale](#easing-rationale)
- [Public comparison](#public-comparison)
- [Material 3](#material-3)
- [Carbon](#carbon)
- [Fluent 2 and WinUI](#fluent-2-and-winui)
- [Atlassian Design](#atlassian-design)
- [Polaris](#polaris)
- [Spectrum and React Aria Components](#spectrum-and-react-aria-components)
- [Standards and accessibility](#standards-and-accessibility)
- [Proposed adopt, reject, defer](#proposed-adopt-reject-defer)
- [Short term implementation direction](#short-term-implementation-direction)
- [Future token architecture](#future-token-architecture)
- [Tradeoffs and open questions](#tradeoffs-and-open-questions)
- [Validation expectations](#validation-expectations)
- [References](#references)

---

## Problem

Antares needs motion that clarifies state and space without turning common interactions into decoration. The audit found a familiar set of issues: hard coded timing drift, a few missing reduced motion branches, some layout based movement that could be expressed more cleanly with transform or anchored overlays, and a small number of transitions that were simply too slow for frequent UI use.

The guiding constraint is restraint. Motion should help users understand what changed, where it came from, and whether it is still interruptible. If a surface is high frequency, keyboard driven, or purely structural, the right answer may be no motion at all.

## Methodology

The review used an eight part gate.

1. Justified motion.
2. Frequency fit.
3. Responsive easing.
4. Sub 300ms UI motion.
5. Correct origin and physicality.
6. Interruptibility.
7. GPU safe properties.
8. Accessibility and cohesion.

Each candidate motion role was checked against purpose first, then frequency, then whether the motion could be expressed with exact-property CSS transitions and state driven hooks. No motion remained a valid outcome.

## Current Motion Baseline

The current Antares baseline is mixed, which is normal for a mature component library.

- Some overlays already use anchored spatial motion, but not always with the same duration or easing.
- Some feedback surfaces use a generic ease that is good enough but not especially deliberate.
- Some moving parts still animate layout position when a transform would better preserve performance and feel.
- Some surfaces are intentionally static because they are dense, frequent, or primarily structural.

The decision record therefore separates motion into four buckets: keep and tune, keep as is, make static, and do not introduce new motion.

## Research Provenance

The motion guidance in this record is informed by public sources and craft heuristics, not by any package dependency on external motion libraries or private tooling.

- `emilkowalski/skills` is useful as a public GitHub source of motion craft heuristics.
- Public design systems with motion guidance were reviewed to compare duration ladders, semantic models, and accessibility expectations.
- The Antares component architecture was used as the final constraint: CSS Modules, RAC state hooks, and component-local policies remain the operating model.

These inputs are research references, not runtime dependencies and not normative standards.

## Duration Rationale

The working durations in this record are intentionally modest and component-local.

### 125ms

Use for a lightweight anchored surface that appears rarely but should still feel immediate. This is short enough to keep the eye from waiting, but long enough that the transition is readable.

### 150ms

Use for frequent feedback, especially color or other non-spatial state changes. This is the best default for everyday interaction feedback because it feels responsive without becoming noisy.

### 200ms

Use for small overlays and centered surfaces that need a bit of presence on entry and exit. This is the sweet spot for a popover or modal-like surface that should orient the user but not linger.

### 250ms

Use for larger spatial movement such as drawers or other edge-bound transitions. It is long enough to suggest physical movement, but still comfortably under the UI threshold where motion starts to feel sluggish.

### Why these values fit Antares

The values are a practical compromise between frequency and weight. A daily control should not feel theatrical, but a rare surface can afford a little more spatial clarity. The result is a local-value strategy: keep literal timing in component CSS first, and only promote repeated roles to tokens later.

## Easing Rationale

The curve is part of the meaning.

- `cubic-bezier(0.23, 1, 0.32, 1)` works well for anchored entry and exit because it decelerates into place and feels controlled.
- `cubic-bezier(0.77, 0, 0.175, 1)` works for short spatial movement because it stays crisp while still feeling physical.
- `ease` is acceptable for simple non-spatial state feedback where the exact contour is not critical.
- `linear` belongs to determinate progress, not to ordinary UI feedback.

The common shorthand names `easeOutQuint` and `easeInOutQuart` are descriptive, not canonical. The control points are what matter.

## Public Comparison

The systems below are the most useful public references for Antares motion design. The goal is not to copy them, but to understand their semantics, their public token model, and their accessibility posture.

| System | Taxonomy | Representative durations | Representative easing / spring | Token or API model | Application | Reduced motion | Governance | Caveat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Material 3 | Semantic motion scheme with distinct motion roles | Public `MotionScheme` APIs; transition timing guidance remains separate from the newer expressive theming work | Named spring examples for effect and spatial motion; public guidance distinguishes motion types | `MotionScheme` plus motion themed APIs | Component behavior and transitions | Platform expectations apply | Google Material | Do not collapse current `MotionScheme` APIs into older transition timing guidance |
| Carbon | Tokenized motion taxonomy | 70, 110, 150, 240, 400, 700ms | Productive and expressive easing taxonomy | Sass and token documentation | Component transitions and interface rhythm | Motion guidance acknowledges restraint | IBM Carbon | Current token pages and v10 canonical ladder should be read together |
| Fluent 2 and WinUI | Resource-based timing and easing guidance | 83, 167, 250ms | Timing and easing guidance for choreography and hierarchy | Resource dictionaries and docs | Flyouts and control choreography | Public guidance supports restraint | Microsoft | Public semantic catalog is thinner than some peers |
| Atlassian Design | Semantic motion tokens and applying-motion guidance | 0, 50, 100, 150, 200, 250, 400, 600ms | Practical curves for interactions; bold curves for entrances; exits are shorter and less dramatic | Motion tokens and variables | Popups, modals, flags, and feedback | Explicit reduced motion guidance | Atlassian | Early Access and legacy caveats apply |
| Polaris | CSS custom property motion model | Current token page exposes motion token names; migration docs show how the model evolves | `ease-out` `(0.19, 0.91, 0.38, 1)` appears in the public token page | `--p-motion-*` model | Shopify UI patterns | System consistency is emphasized | Shopify Polaris | Avoid inventing extra duration claims not present on the public page |
| Spectrum and RAC | Motion guidance plus state-driven styling hooks | 130, 160, 190, 220, 250, 300, 350, 400, 450, 500ms ladder | Curves vary by interaction and transition type | React Aria state hooks plus data attributes | Overlays and stateful components | Reduced motion guidance exists | Adobe Spectrum and React Aria | RAC exposes state hooks, not a public motion token system |

## Material 3

Material 3 is the most useful example of a modern semantic motion system because it treats motion as a capability rather than a pile of one-off durations.

Verified takeaways:

- Current `MotionScheme` APIs are public and intended for theming motion behavior.
- Material's newer expressive motion work introduces separate thinking for effects and spatial motion.
- The older transition guidance remains useful, but it is not the same thing as the newer scheme-based API surface.

Proposed direction for Antares:

- Adopt the idea of semantic motion roles.
- Reject the idea that Antares needs a large expressive theme layer to be coherent.

## Carbon

Carbon is a strong reference for a restrained duration ladder and a clear productive versus expressive taxonomy.

Verified takeaways:

- The canonical ladder used in the public docs includes 70, 110, 150, 240, 400, and 700ms.
- The docs distinguish productive motion from expressive motion.
- The Sass and token documentation together describe the public surface rather than a hidden implementation trick.

Proposed direction for Antares:

- Adopt the idea of a compact, purposeful ladder.
- Reject broad expressive defaults for everyday component motion.

## Fluent 2 and WinUI

Fluent's public timing guidance is useful for cadence and hierarchy, especially where motion should help the user understand attention and choreography.

Verified takeaways:

- Public timing resources include 83, 167, and 250ms.
- The docs frame motion around hierarchy and choreography rather than pure flourish.
- The publicly visible catalog is less semantic than some other systems, which is itself a useful data point.

Proposed direction for Antares:

- Adopt the cadence and hierarchy lesson.
- Reject the idea that a motion system must be richly semantic to be useful.

## Atlassian Design

Atlassian is the strongest public reference for Antares because it combines semantic tokens, explicit duration guidance, asymmetry, and accessibility thinking.

Verified takeaways:

- Public motion guidance includes `motion.duration.instant`, `xxshort`, `xshort`, `short`, `medium`, `long`, `xlong`, and `xxlong`.
- Entrances use bold curves; exits should be shorter and less dramatic.
- The public guidance is explicit that entrances and exits are not symmetrical.
- Early Access and legacy caveats mean the documentation should be read carefully rather than treated as a single static truth.

Proposed direction for Antares:

- Adopt semantic tokens and reduced motion discipline. Entry and exit stay symmetrical in this pass;
  asymmetry is not adopted.
- Reject copying Atlassian naming into Antares; the policy is useful, not the literal names.

## Polaris

Polaris is useful as a migration lesson.

Verified takeaways:

- The current motion token page exposes a `--p-motion-*` model.
- The public easing example includes `ease-out` with `(0.19, 0.91, 0.38, 1)`.
- The v10 to v11 migration materials show that motion vocabularies can evolve if the change is documented and codemodded carefully.

Proposed direction for Antares:

- Adopt the idea of a token namespace that can migrate cleanly.
- Reject premature proliferation of component-named motion tokens.

## Spectrum and React Aria Components

Spectrum and React Aria are the most important pair for Antares implementation because Antares sits on RAC primitives.

Verified takeaways:

- Spectrum publishes a 130 to 500ms duration ladder.
- The curve guidance varies by interaction and transition type.
- RAC state hooks such as entering and exiting make CSS transitions interruptible and reversible.

Proposed direction for Antares:

- Adopt state-driven CSS transitions over JS choreography wherever possible.
- Preserve positioning ownership in the overlay layer instead of overwriting it with motion logic.

## Standards and Accessibility

Accessibility and standards guidance is part of the motion policy, not an afterthought.

### DTCG reality

The `2025.10` DTCG format page currently presents itself as preview draft material and not as a final authoritative standard. This record treats it as a useful shape reference only. Any examples here are illustrative, not a claim of standards conformance.

### Accessibility references

- WCAG 2.3.3 and the WAI C39 technique support reducing motion where it can distract or disorient.
- Media Queries Level 5 provides `prefers-reduced-motion`.
- MDN easing guidance is a useful public reference for curve behavior.

### Runtime policy for Antares

1. Respect `prefers-reduced-motion`.
2. Remove spatial movement when the user has asked for less motion.
3. Keep small opacity feedback when it helps comprehension.
4. Gate hover motion behind hover-capable pointer environments.
5. Keep keyboard response, focus, and activation immediate; state transitions may remain modality-independent when subtle and interruptible.

## Proposed Adopt, Reject, Defer

| Area | Decision | Why |
| --- | --- | --- |
| Semantic duration roles | Adopt | Gives a stable way to talk about timing by purpose |
| Semantic easing roles | Adopt | Keeps motion reusable without forcing a component explosion |
| New public runtime motion API | Reject | Antares does not need one to ship good motion |
| Material expressive theme parity | Reject | Too broad for Antares baseline motion |
| Carbon-style duration ladder | Adopt | Clear and restrained |
| Fluent cadence and hierarchy guidance | Adopt | Good fit for choreographed UI timing |
| Atlassian semantic tokens | Adopt | Best public fit for component motion governance |
| Atlassian entry/exit asymmetry | Reject | Symmetrical transitions are enough for the current surfaces; revisit if exits start to feel slow |
| Polaris migration lessons | Adopt | Useful for future token evolution |
| Spectrum and RAC state-driven transitions | Adopt | Matches Antares architecture |
| DTCG as authoritative shipping standard | Reject | It is still preview draft material |

## Short Term Implementation Direction

The short-term strategy is deliberately simple.

1. Keep literal timing and easing values local in component CSS first.
2. Use exact-property CSS transitions instead of broad or catch-all transitions.
3. Lean on RAC state hooks such as entering and exiting for overlay surfaces.
4. Preserve reduced motion branches for spatial motion.
5. Avoid adding a public runtime dependency or component-specific motion API.
6. Promote a role to tokens only after it repeats across multiple components.

This keeps Antares shippable now while leaving room for a public design token layer later.

## Future Token Architecture

The long-term direction is semantic, purpose-based motion tokens owned by `@godaddy/design-tokens`, with component implementations consuming them through local fallback values.

### Suggested duration roles

- `instant` for removed spatial motion or reduced paths.
- `feedback` for frequent state changes, around 150ms.
- `surface` for overlays and small anchored surfaces, around 200ms.
- `spatial` for larger movement, around 250ms.

### Suggested easing roles

- `feedback` for non-spatial state feedback, often `ease`.
- `enter-exit` for anchored surfaces, `cubic-bezier(0.23,1,0.32,1)`.
- `move` for short spatial changes, `cubic-bezier(0.77,0,0.175,1)`.
- `drawer` for edge-bound translation, `cubic-bezier(0.32,0.72,0,1)`.
- `linear` for progress and determinate value changes.

### Optional composite tokens

Composite transition tokens can come later, but only after the base duration and easing roles stabilize. That keeps the system from turning into a token explosion before the basics are proven.

### Connection to `@godaddy/design-tokens`

The intended migration path is:

1. Start with local literals in component CSS.
2. Introduce public semantic duration and easing tokens in the design-token package.
3. Components consume the semantic tokens with local fallback values.
4. Keep transform distance, transform origin, choreography, gestures, keyframes, and reduced motion alternatives as component policy rather than token policy.
5. Version and migrate the tokens like any other public design token surface.

This avoids a token model that names every component. Tokens should describe reusable timing and easing intent, not encode a component-by-component catalog.

### Illustrative token shape

The DTCG `2025.10` page is preview material, so the example below is illustrative only.

```json
{
  "motion": {
    "duration": {
      "surface": { "value": "200ms" }
    }
  }
}
```

## Tradeoffs and Open Questions

### Tradeoffs

- Local literals are faster to ship, easier to reason about, and safer for component ownership.
- Semantic tokens are more scalable, but only once a role is repeated enough to justify promotion.
- Motion that is too generic becomes forgettable; motion that is too bespoke becomes hard to maintain.

### Open questions

- Which motion roles repeat often enough to justify public token promotion first?
- Should transition composites be introduced only after duration and easing roles stabilize?
- Where is the right boundary between tokenized timing and component-specific choreography?

## Validation Expectations

Any future implementation that follows this record should verify:

- Reduced motion removes spatial movement while keeping useful feedback.
- Anchored overlays keep their source relationship and remain interruptible.
- Motion stays within the short UI timing range.
- State-driven CSS transitions do not become layout thrash or broad transition catch-alls.
- Promoted tokens reflect repeated public roles rather than single component names.

## References

- `https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme`
- `https://m3.material.io/blog/m3-expressive-motion-theming`
- `https://m3.material.io/styles/motion/transitions/transition-patterns`
- `https://preview.carbondesignsystem.com/building-blocks/foundations/motion/code/`
- `https://v10.carbondesignsystem.com/guidelines/motion/overview/`
- `https://github.com/carbon-design-system/carbon/blob/main/packages/motion/docs/sass.md`
- `https://learn.microsoft.com/en-us/windows/apps/design/motion/timing-and-easing`
- `https://github.com/microsoft/microsoft-ui-xaml/blob/main/controls/dev/CommonStyles/CommandBarFlyout/CommandBarFlyout_themeresources.xaml`
- `https://atlassian.design/foundations/motion/applying-motion`
- `https://atlassian.design/foundations/motion`
- `https://atlassian.design/components/motion/variables`
- `https://polaris-site-prod-kit.s5y-polaris-site-prod-ki-483d.prod.shopifyapps.com/tokens/motion`
- `https://github.com/Shopify/polaris-react-archive/blob/main/documentation/guides/migrating-from-v10-to-v11.md`
- `https://github.com/Shopify/polaris-react/pull/9068`
- `https://spectrum.adobe.com/page/motion/`
- `https://github.com/adobe/react-spectrum/blob/main/packages/dev/s2-docs/pages/react-aria/styling.mdx`
- `https://www.designtokens.org/TR/2025.10/format/`
- `https://www.w3.org/WAI/WCAG22/Techniques/css/C39`
- `https://www.w3.org/TR/mediaqueries-5/`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function`
- `https://github.com/ionic-team/ionic-framework/blob/main/core/src/components/modal/gestures/swipe-to-close.ts`
- `https://github.com/emilkowalski/skills`
