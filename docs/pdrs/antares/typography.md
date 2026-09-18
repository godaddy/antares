# Typography and coordinated sizing in Antares

Status: **Design direction agreed; implementation proposed**

## Proposed API

Antares will coordinate typography, controls, and container spacing through a shared interface size.
Set `size` on a participating container to establish defaults for its contents; set it on a child to
override those defaults. Component names express the purpose of text, and heading levels express
document structure independently of visual size.

```tsx
// Future composition: Card is outside the initial pilot.
<Card size="sm">
  <TextLockup>
    <Heading slot="title" level={2}>Billing</Heading>
    <Text slot="body">Manage your payment methods.</Text>
  </TextLockup>
  <Button>Update payment method</Button>
</Card>

<Text>Body copy</Text>
<Detail emphasis="passive">Supporting copy with an explicit color treatment</Detail>
<Heading level={2} size="xl">A visually large section heading</Heading>
<Text as="strong">Payment required</Text>

<TextField size="sm">
  <Label>Email</Label>
  <Input />
  <Detail slot="description">We'll send receipts here.</Detail>
  <FieldError />
</TextField>
```

These examples describe the intended API, not capabilities already implemented. The first implementation
will cover shared sizing infrastructure, Modal, TextLockup, Text, Detail, Heading, Label, Button, and
TextField. Broader adoption follows visual review of that pilot.

## Why this change

Typography currently has several owners. Text provides wrapping and truncation without a full typography
treatment, Heading still depends on browser or application font sizes, TextLockup applies role tokens to
its slots, and controls and fields declare their own styles. A consumer cannot choose a compact section
and predict how its text, controls, and spacing will respond.

The goal is a system that is easy to explain and compose:

- A container's `size` coordinates typography, default padding, and default gaps. Width and height
  constraints remain separate.
- Controls receive a complete size treatment: typography, padding, internal spacing, and appropriate
  minimum dimensions. Changing only their label size is insufficient.
- Explicit child props win. Nesting does not repeatedly shrink values.
- Named component parts can have different treatments without changing unrelated content.
- Existing tokens supply themeable values. They are a foundation, not a constraint against a needed
  treatment or API change.

## Public vocabulary

| Surface | Size scale | Meaning |
| --- | --- | --- |
| Participating containers and controls | `sm`, `md`, `lg` | Coordinated interface presentation, including type and default spacing |
| Text, Detail, Heading, Label | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | A tier within the component's typography treatment |
| TextLockup | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | Coordinated named text parts and directly paired accessories |
| SizeProvider (working name) | `sm`, `md`, `lg` | Defaults for participating descendants, without a DOM wrapper |

Equal size names coordinate components; they do not require equal font sizes or identical dimensions.
For example, body `md` and detail `md` use different token values. A component can map its interface size
to different tiers for its title, label, input, and supporting text.

### Text components

| Component | Purpose | Default treatment |
| --- | --- | --- |
| `Text` | Body copy | Body typography, or the owning text surface's treatment when composed as its label |
| `Detail` | Supporting copy, captions, metadata | Detail typography; no automatic muted color |
| `Heading` | Semantic document heading | Heading typography; `level` chooses the element only |
| `Label` | Names a form field | A distinct, themeable label treatment with a medium-weight default |

Text and Detail share implementation and the existing text folder:

```text
components/text/src/
  index.tsx         public barrel
  text.tsx          Text and Detail implementation
  index.module.css shared styles
```

Detail does not get a separate component directory. Text and Detail retain the existing element,
alignment, wrapping, and truncation behavior. `Text as="p"` changes the element without selecting a
different visual role. Label retains its form-label semantics and accessibility integration.

Purpose is visible in the component name. There is no `Text variant="detail"`; `role` remains the ARIA
attribute. Typography does not expose `weight`, `family`, `lineHeight`, `letterSpacing`, or separate visual
italic and underline controls. Treatments own their default font properties.

### Feedback color and semantic emphasis

Typography exposes `emphasis` using the existing feedback vocabulary:

```tsx
emphasis?: 'critical' | 'warning' | 'success' | 'info' | 'highlight'
  | 'premium' | 'internal' | 'neutral' | 'passive';
```

`emphasis` selects color, not weight. When omitted, typography inherits the surrounding color. Choosing
Detail alone does not make text muted, and choosing `neutral` is an explicit color choice rather than a
synonym for omission. Components may supply contextual colors for their parts, such as validation text.

Use semantic `strong` and `em` elements for their corresponding treatments:

```tsx
<Text as="strong">Payment required</Text>
<Detail as="em">Offer ends tomorrow</Detail>
<Text emphasis="critical">Payment failed</Text>
```

The existing `--font-weight-strong` and `--font-style-em` tokens support these semantic treatments.
There is no public weight prop. Label's medium weight belongs to its treatment, not to a new consumer
override.

### Heading semantics

`level` controls the `h1` through `h6` element. It never selects a visual size, including when `size` is
omitted. Two otherwise equivalent Headings with different levels have the same typography.

Resolve the level from an explicit prop, then the owning semantic context, then the existing standalone
fallback of `3`. Resolve visual size separately through the rules below. A dialog can supply its title's
semantic level and visual treatment independently. There is no level-to-size default map.

## Size resolution and precedence

### Interface size

For an ordinary participating container or control, resolve size in this order:

1. An explicit `size` on that component.
2. A default supplied by the component that owns that part, if applicable.
3. The nearest interface-size scope.
4. Standalone `md`.

A sized container supplies its resolved size to participating descendants. A nested container without an
explicit size inherits the nearest scope. `sm` identifies a treatment; it is not a multiplier applied at
each nesting level. A small container inside another small container stays small.

An explicit control size affects the control and the parts it owns. It does not resize siblings or an
overlay owned by a common ancestor. Modal is the deliberate reset boundary described below.

### Typography and named parts

Resolve each typography property independently:

1. An explicit child prop for that property.
2. The owning component's text-surface or named-slot treatment.
3. The component's treatment at the inherited interface size.
4. Its standalone treatment at `md`.

Component and slot mappings are defaults, not forced styles. A medium Modal may, for example, map its
title to heading `lg` while body text and controls remain `md`. This illustrates the rule; it is not final
visual approval of that title mapping. Component documentation must state the eventual mappings.

Unslotted content follows the general scope rather than a named part's defaults. An explicit `size`
changes the child's typography tier; an explicit `emphasis` changes its color without resetting its size,
weight, family, variation settings, or line height. Wrapping and truncation props do not change type.

### Spacing and bounds

A container maps its resolved size to its own default padding and gaps, including defaults supplied to
its regions. Explicit spacing props override those defaults. Regions continue to own their padding where
required by the composition model, including scrolling content.

Box, Flex, and Grid pass size context through without reinterpreting their spacing props:

```tsx
<Card size="sm">
  <Flex gap="md">
    <Button>Save</Button>
    <Button>Cancel</Button>
  </Flex>
</Card>
```

Both buttons are small. The explicit `gap="md"` remains the normal layout `md` gap. Global spacing and
font token names keep their meanings. Container width, height, and maximum bounds remain independent
of interface size.

## Scope boundaries

### Modal starts an independent scope

Modal defaults to `md`, even when its trigger appears inside a small container. `<Modal size="sm">`
explicitly selects a small modal interior. The trigger keeps the surrounding size.

```tsx
<SizeProvider size="sm">
  <ModalTrigger>
    <Button>Edit billing</Button>
    <Modal>
      <Heading slot="title">Billing</Heading>
      <Content>
        Default medium body text and controls.
        <Button>Save</Button>
      </Content>
    </Modal>
  </ModalTrigger>
</SizeProvider>
```

The reset belongs to Modal, not to whether React happens to render it in a portal. It applies to its
body baseline, participating controls, spacing defaults, and named-part mappings.

### Attached overlays share their interaction owner's size

The common owner establishes sizing for both the trigger and its attached content. This owner is
MenuTrigger, PopoverTrigger, or the Select root, rather than the trigger Button itself.

```tsx
<MenuTrigger size="lg">
  <Button>Actions</Button>
  <Menu>
    <MenuItem>Duplicate</MenuItem>
  </Menu>
</MenuTrigger>

<MenuTrigger size="lg">
  <Button size="sm">Actions</Button>
  <Menu size="md">
    <MenuItem>Duplicate</MenuItem>
  </Menu>
</MenuTrigger>
```

In the first example, the trigger and menu use large treatments. In the second, their explicit sizes
override the owner's defaults independently. Changing only the Button would leave the Menu large.
An owner without an explicit size uses its surrounding scope, then `md`.

Size flows down through context. Do not inspect arbitrary sibling props or infer an owner's size from
its trigger. React context reaches portals; the portaled surface must still apply its own CSS typography
baseline because CSS inheritance follows the DOM tree.

### TextLockup coordinates its own parts

TextLockup resolves its size from an explicit prop, an owning component's default if present, the
interface scope, then `md`. Its six-tier size coordinates its named eyebrow, title, and body parts and
directly paired accessories. It does not create a new interface-size scope for unrelated controls.

```tsx
<Card size="sm">
  <TextLockup size="xl">
    <Tag slot="eyebrow">New</Tag>
    <Heading slot="title" level={2}>More room to grow</Heading>
    <Text slot="body">Choose the plan that fits your business.</Text>
    <Button>Start</Button>
  </TextLockup>
</Card>
```

The named text parts use the lockup's `xl` treatments. The Button remains `sm`. Unslotted content stays
on the surrounding defaults; an explicit size on a named child overrides that part's default.

The current text mapping uses the matching tier of detail for the eyebrow, heading for the title, and
body for the body slot. It is the starting point for pilot review. Accessory mappings are separate:

| Accessory | Starting mapping | Override |
| --- | --- | --- |
| Eyebrow Tag | Lockup `2xl`/`xl` -> Tag `lg`; `lg`/`md`/`sm` -> `md`; `xs` -> `sm` | Explicit Tag size wins |
| Icon paired with a title or other text part | Follows that part's line height through `1lh` | Explicit supported accessory sizing wins |

The Tag mapping already exists. New accessory arrangements must document their mappings rather than
silently treating every descendant as part of the lockup.

Named typography sizes use the same token values at every container width. The existing automatic
TextLockup title reduction below 520px for `sm` and `2xl` is removed when adopting this model. Responsive
typography is later work, not an implicit adjustment to a named tier.

### Custom sections can provide defaults without a wrapper

A public provider lets consumers establish the same scope for custom compositions:

```tsx
<SizeProvider size="sm">
  <Text>Compact copy</Text>
  <Button>Save</Button>
</SizeProvider>
```

`SizeProvider` is the working name; the final export name remains to be confirmed during implementation.
It renders no DOM element and supplies defaults to participating components. It cannot style bare text
nodes or ordinary HTML wrappers by itself. Consumers needing a styled body surface use a participating
container or apply the appropriate typography to their own surface.

## Ownership of rendered typography

### Actual surfaces style bare text

Sized surfaces such as Modal and the eventual Card apply the body typography for their resolved scope
on an actual DOM element. Bare text and text inside ordinary wrappers inherit this baseline. An explicit
Text in that same body context receives the same body treatment.

This uses normal CSS inheritance, not broad selectors over descendants. Native headings retain browser
or application styling; use Heading for an Antares heading treatment. A container must not restyle every
`h2`, `p`, or `span` in consumer content.

### Controls own the label treatment

These compositions must have identical typography:

```tsx
<Button>Save</Button>
<Button><Text>Save</Text></Button>
<Button><Text maxLines={1}>Save</Text></Button>
```

Controls apply their complete typography on the appropriate control surface and provide an internal
default that lets a composed Text preserve that treatment. Adding Text for wrapping, truncation, or
color must not reset the label to body defaults. This includes all font properties, including
`font-variation-settings`, not just font size.

Explicit overrides remain local to their property:

```tsx
<Button><Text emphasis="critical">Save</Text></Button>
<Button><Text size="lg">Save</Text></Button>
```

The first changes label color only. The second overrides the label's size tier without resizing the
Button's padding or minimum dimensions, or resetting unrelated treatment properties. It is an explicit
departure from the coordinated default.

Icons paired with control labels continue to follow line height. Put shared label typography on the
surface from which both label and icon inherit; styling only a sibling label wrapper cannot coordinate
the icon. Inline actions still need to match their surrounding text, and their component mapping must
document that exception during adoption.

Do not depend on stylesheet import order to suppress Text defaults. The internal treatment mechanism
must preserve the owner-provided properties and apply only explicit overrides. Its exact context shape
is an implementation detail, not a public typography opt-out API.

### Label and fields share one treatment

Label remains visually distinct from Detail, including its medium-weight default. Fields consume that
shared, themeable treatment instead of independently redefining its family, size, and weight. The pilot
maps this treatment to existing label intents and font-size tokens; new tokens require separate approval.

TextField coordinates the label, native input or textarea, supporting copy, validation text, owned
controls, and default gaps. Those parts can use different typography tiers. Explicit child props still
win, and input dimensions must account for padding, line height, and appropriate minimum sizes.

The pilot must reconcile existing field-injected classes with the new Label and Text/Detail treatments.
Keep field state and accessibility wiring, including required indicators and description/error
associations. Native input values and placeholders need their typography on the input surface; adding a
Text component around the field cannot style them.

## Participation matrix

This is the intended classification for adoption. Only the listed pilot components are in the first
implementation. Later rows derive from the general rules; they do not imply that those components
already participate or that their individual mappings have received visual approval. Each component's
documentation must eventually state its category, consumed defaults, supplied defaults, overrides, and
independent dimensions.

### Pilot and core composition

| Category / components | Consumes | Affects or provides | Boundary and exceptions |
| --- | --- | --- | --- |
| Wrapperless scope: SizeProvider | Explicit size, otherwise inherited scope or `md` | Interface-size defaults for participating descendants | No DOM baseline; final public name pending |
| Independent surface: Modal | Explicit size or its own `md` default | Body baseline, interface scope, region spacing, named-part treatments | Resets ambient size; width and height constraints stay separate |
| State owner: ModalTrigger | No shared modal sizing decision | Trigger continues in the surrounding scope | Modal owns its reset |
| Typography: Text, Detail, Heading, Label | Explicit props, owner treatment, ambient size | Typography on their own elements | No interface scope; Heading level is semantic; Label has its own treatment |
| Text composition: TextLockup | Six-tier size or inherited/default size | Named text parts and directly paired accessories | Passes ambient interface scope through to unrelated controls |
| Action control: Button | Explicit, owner, or ambient interface size | Full control treatment and composed-label defaults | A child Text preserves the label treatment; local size does not resize siblings |
| Field owner: TextField | Explicit, owner, or ambient interface size | Label, input, description/error, owned controls, default spacing | Part overrides remain local; accessibility contexts must survive |
| Field parts: Input, TextArea, FieldError | TextField's owned-part treatment in the pilot | Native editing surface or validation text | Pilot support is required; broader standalone sizing adoption is separate |
| Layout: Box, Flex, Grid | Pass-through only | Existing explicit layout props | No size reset and no reinterpretation of spacing tokens |
| Regions: Header, Content, Footer, ButtonGroup, Group | Owning component's region defaults | Their own default spacing and layout | Pass interface scope through; explicit spacing wins |

### Later component adoption

| Category / components | Consumes | Affects or provides | Boundary and exceptions |
| --- | --- | --- | --- |
| Sized surface: Card | Explicit or ambient interface size | Body baseline, descendant scope, padding/gap and slot defaults | Future component in this worktree; outside the pilot; bounds separate |
| Attached owners: MenuTrigger, PopoverTrigger, Select root, SubmenuTrigger | Explicit or ambient interface size | Defaults shared by trigger and attached overlay | Child overrides are independent; no upward inference from trigger props |
| Attached surfaces: Menu, Popover, ListBox and their items | Owner defaults, explicit override, or ambient size | Surface typography, item/control treatments, default spacing | Apply baseline across portals; document individual part mappings |
| Tooltip / TooltipTrigger | Shared interaction-owner rule | Tooltip text and default spacing | Exact size API and part mappings need adoption design; positioning is separate |
| Drawer / InlineDrawer | Sized-surface rules as applicable | Body, regions, controls, named parts | Decide and document each scope boundary during adoption; Modal's reset is not automatically assigned to every drawer |
| Other actions: LinkButton, CloseButton, ToggleButton, SegmentedController, Pagination | Explicit, owner, or ambient interface size | Full control and label treatments | Document inline-action treatment and internal control defaults |
| Other fields: NumberField, DatePicker, RangeField, Checkbox, Radio, Switch and groups | Explicit, owner, or ambient interface size | Labels, inputs, supporting text, control geometry and gaps | Adopt complete control treatments; attached pickers share their owner size |
| Calendar / RangeCalendar | Owner or ambient interface size, explicit overrides | Cell typography, interactive dimensions and internal controls | Exact cell and part mappings require review |
| Compact text surfaces: Tag, Chip and related groups | Explicit, named-accessory, or ambient size | Their own type, padding, minimum dimensions, and paired icons | TextLockup's named accessory mapping takes precedence over ambient size |
| Content composites: Alert, Tabs, ProgressSteps, MetricsLockup, DropZone, Carousel | General scope and owned-part defaults | Text treatments and participating controls; component-owned default spacing where applicable | Individual mappings and public size APIs require adoption review; media bounds stay separate |
| Behavior-only wrappers: Pressable, FileTrigger | Pass-through only | Existing interaction behavior | Do not add typography or a size reset merely for wrapping children |

### Independent dimensions and special text surfaces

| Category / components | Consumes | Affects or provides | Boundary and exceptions |
| --- | --- | --- | --- |
| Text-paired Icon | Paired text's line height | Icon dimensions through `1lh` | Coordinate through the correct text surface; not a separate interface-size scope |
| Avatar | Its own physical size API | Diameter and fitted monogram | Ambient interface size does not resize either; preserve geometry-relative monogram type |
| CircularProgress, ProgressBar | Typography defaults for accompanying text when adopted | Label/value typography | Ring diameter and bar thickness remain independently controlled |
| Image and other media | Explicit dimensions and layout constraints | Media geometry | No automatic resizing from interface scope |
| BarChart, LineChart, DonutChart, GaugeChart and chart text helpers | Appropriate typography treatments for text during adoption | Axis labels, legends, tooltips, annotations and other text | Chart bounds stay independent; deliberately geometry-fitted center labels retain their sizing |
| Native input values, placeholders, SVG text | Owning component's resolved part treatment | Font properties on the actual text surface | Cannot always be rendered through Text; share the same token vocabulary |

Independent geometry is not an exemption from typography cleanup. Chart labels and indicator text still
need deliberate ownership and themeable font properties. Preserve the special geometry-relative sizes
used by Avatar monograms and fitted chart center labels without letting new Text defaults override them
through stylesheet order.

## Implementation responsibilities

Three mechanisms have separate jobs:

| Mechanism | Responsibility |
| --- | --- |
| React size context | Carry the chosen interface size through composition and portals; implement inheritance and deliberate resets |
| Internal component and slot mappings | Turn size into default part treatments, control dimensions, padding, and gaps; preserve explicit overrides |
| CSS tokens and surface inheritance | Supply actual themeable values and style bare text on real surfaces |

Do not redefine global token names such as `--font-body-size-md` inside a small container. Select the
appropriate token for the resolved treatment. A token continues to mean the same thing wherever it is
read, so small scopes cannot accidentally change the meaning of an explicitly medium child.

Keep mappings internal. This proposal does not commit to a public configurable recipe system or subtree
theme API. Existing tokens plus internal component mappings are sufficient for the first implementation.

### Context and accessibility

Use named defaults for named parts, with an unslotted path that leaves arbitrary body content on the
general scope. A leaf label surface can supply its treatment to composed Text without turning every
nested composite into that label. Deliberately handle context ownership and shadowing.

Preserve React Aria Components (RAC) accessibility context when adding visual defaults. RAC Dialog
supplies the title id through HeadingContext; replacing that context can break `aria-labelledby`.
Merge with the context in the correct ownership boundary, and preserve semantic levels, ids, refs,
event handlers, field associations, and explicit child props. The same care applies to TextField's
Label, Input, description, and error contexts.

Resolve inherited values before applying standalone defaults. A default assigned too early, such as
destructuring `size = 'md'` before reading context, must not mask an enclosing scope. Verify nested
composites and portaled content rather than relying on assumed RAC merge behavior.

### Tokens and CSS

The existing body, detail, and heading roles provide family, size, line height, weight, and variation
tokens. Reuse these treatments for text primitives, owned control surfaces, and non-component text
surfaces without duplicating independent typography decisions.

The pilot must use existing curated tokens and legacy intents. Changes to
`packages/@godaddy/design-tokens` require separate curation and approval; they are outside this pilot.

For role properties, retain the established token -> legacy intent -> literal fallback strategy where
the intent represents the same treatment. Consult the repository's
[token mapping](../../../.agents/skills/antares-components/references/token-intent-legacy-map.json)
and [token guidance](../../../.agents/skills/antares-components/references/tokens.md). The body role may
need both body and paragraph legacy fallbacks. Include `font-variation-settings`.

Named font sizes resolve through role-size token -> literal. A legacy role's single font-size value
cannot represent all six tiers. Do not derive the ramp by repeatedly multiplying or dividing a base.
Label retains a distinct themeable treatment using existing label intents and the curated global
font-size scale. Do not introduce an unapproved Label token family, silently map Label to Detail, or
lose its medium weight.

Use component-named private properties on the surface that consumes them. Follow the existing
[spacing rules](./gu-spacing.md) for default padding and gaps, including valid fallbacks. Use classes
for size treatments, keep selectors at the repository's low specificity, and reserve data-attribute
selectors for RAC state. Avoid descendant element rules and stylesheet-order dependencies.

## Current foundations and migration audit

Verified against this worktree on 2026-09-18. Paths below are relative to
`packages/@godaddy/antares/` unless stated otherwise. These are current-code observations, not evidence
that the proposed inheritance system is already implemented.

| Area | Current state | Adoption work |
| --- | --- | --- |
| `components/text/src/index.tsx` | Element selection, alignment, wrapping, truncation, RAC context; no full typography defaults | Add Text/Detail treatments, color emphasis, and owner-preserving composition in the shared folder |
| `components/heading/src/index.tsx` | Leaves omitted level to RAC context, then fallback `3`; CSS sets weight but no font size | Preserve working semantic context; add visual size and treatment independently |
| `components/label/src/index.tsx` and `components/_internal/field-styles/index.module.css` | Label wraps RACLabel; field CSS supplies label color, 0.875rem size and 500 weight; descriptions use 0.875rem/400 | Centralize Label treatment and reconcile field defaults with explicit typography overrides |
| `components/text-lockup/src/` | Six sizes, named RAC contexts, Tag mapping, direct `md` default; title reductions below 520px for `sm` and `2xl` | Consume ambient sizing, preserve local ownership and child overrides, remove automatic responsive tier changes |
| Button, TextField, Select, Menu, Switch, ToggleButton | Existing size APIs support `sm`/`md` | Add complete `lg` treatments and shared-size consumption during each component's rollout |
| Tag, Chip, SegmentedController | Already expose `sm`/`md`/`lg` | Existing scales still need integration; matching names alone do not establish participation |
| Modal and overlay composition | No coordinated Modal size prop; OverlayDialog supplies structural region contexts | Add Modal reset, body baseline, region/slot mappings, and preserve dialog accessibility |
| Card | No component or export in this worktree | Keep as a future composition example; no Card implementation in the pilot |
| Icon, Avatar, chart center labels | Icon uses `1lh`; Avatar and some chart labels use geometry-relative font sizes | Preserve intended relationships while preventing new text defaults from replacing fitted type |

### Existing token ramps

`packages/@godaddy/design-tokens/src/tokens.yml` defines these values. They are reference values, not
new approval of every component mapping.

| Tier | Body | Detail | Heading |
| --- | --- | --- | --- |
| `xs` | 0.75rem | 0.6875rem | 1rem |
| `sm` | 0.875rem | 0.75rem | 1.125rem |
| `md` | 1rem | 0.8125rem | 1.25rem |
| `lg` | 1.125rem | 0.875rem | 1.5rem |
| `xl` | 1.25rem | 1rem | 1.875rem |
| `2xl` | 1.5rem | 1.125rem | 2.25rem |

Body and Detail default to regular weight with line heights of 1.5 and 1.4. Heading defaults to bold
with a line height of 1.25. All three expose family and variation tokens. There is currently no dedicated
Label role or medium-weight token in this file.

During later migration, audit each component's legacy intents, literal sizes, calculated sizes, and
text-surface ownership against the actual code. Do not apply a blanket conversion such as label ->
detail or automatically snap an old calculated value without visual review. Components with missing
fallbacks or production styles tied to documentation-only variables need verification in their own
adoption work.

## Pilot and rollout

The current change is documentation only. Implementation starts with a small, visually reviewed pilot:

1. Shared size infrastructure and the public wrapperless provider.
2. Text and Detail in the shared text implementation, plus Heading and Label.
3. Button, including direct and wrapped label equivalence.
4. TextField, including its Label, Input/TextArea, supporting text, FieldError, and owned controls.
5. TextLockup and Modal, exercising named parts, inheritance, resets, and portals together.

The pilot must demonstrate the following before broad adoption:

| Scenario | Required result |
| --- | --- |
| Standalone components and inherited `sm`/`md`/`lg` | Predictable defaults and complete control sizing, including padding and minimum dimensions |
| Nested providers and sized surfaces | Nearest scope wins; repeated `sm` nesting does not progressively shrink content |
| Explicit child size, emphasis, and spacing | Only the corresponding default is overridden |
| Bare text, ordinary wrappers, and Text on a sized surface | Matching body typography; wrapperless provider alone does not claim to style bare text |
| Direct Button label and Text-wrapped label | Identical computed font properties, line height, icon relationship, and default control dimensions |
| Text used only for color or truncation inside a control | Existing label treatment survives |
| Heading level changes without size changes | Correct semantic elements with unchanged visual typography |
| Named parts alongside unslotted content and nested composites | Part defaults stay local; explicit props and accessibility context survive |
| TextLockup larger than its surrounding scope | Named text and paired accessories follow the lockup; unrelated controls keep the interface size |
| Field label, input, supporting copy, error, and internal control | Shared Label treatment, coordinated hierarchy, working input and accessible associations |
| Modal opened from a small scope, including a portal | Default medium interior; explicit small Modal works; trigger remains small |
| Narrow and wide TextLockup surfaces | Named tiers retain the same token values; normal wrapping can still change |
| Token theme, legacy-intent theme, and fallback rendering | Valid font declarations and preserved variable-font settings |
| Existing Avatar and fitted chart text using Text | New defaults do not override geometry-relative sizes |

Use representative compositions for visual review and targeted browser/SSR checks for context,
accessibility, and computed-style contracts. Review actual small, medium, and large control dimensions,
field hierarchy, and named-part mappings together. Do not treat the illustrative Modal title tier or
current token ramps as approval of all resulting visuals.

After pilot review, adopt the remaining components by category, documenting their mappings and testing
their boundaries. Attached-overlay adoption must verify shared owner sizing, independent child
overrides, and portals. Component documentation should make adoption status clear until the rollout is
complete. Card remains outside the pilot; responsive sizing follows separately.

### Details to settle through implementation and review

- Final export name for the wrapperless provider.
- Label mappings onto existing tokens and intents, preserving its distinct medium-weight treatment.
- Exact per-size typography, padding, gap, and minimum-dimension mappings for pilot components.
- Internal context composition that preserves owner treatments and RAC accessibility data.
- Later components' individual mappings and unresolved boundaries, especially Drawer and InlineDrawer.

These details do not reopen the agreed public roles, override rules, Modal reset, overlay ownership, or
separation between interface size and physical media dimensions.

## Comparative references and later work

The references support individual parts of the design; none is claimed to implement this whole model.

| Reference | Relevant precedent | Antares decision |
| --- | --- | --- |
| Uxcore2 Text and TextLockup (`packages/components/text/`, `packages/components/text-lockup/src/text-props.js`) | Category-based text, semantic strong treatment, feedback color, and per-part lockup mappings | Keep purpose in component names and named tiers; do not copy the numeric modular scale or visual use of `as` |
| [Radix Card](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/card.css) | Size changes component padding and radius | Antares additionally coordinates participating descendant typography and controls |
| [Radix Select](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/select.tsx) | Root context shares size with trigger and portaled content | Use the common interaction owner for attached overlays |
| [Chakra Card recipe](https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/theme/recipes/card.ts) and [docs](https://chakra-ui.com/docs/components/card) | Per-size container and named-part mappings | Use internal mappings; a public configurable recipe API is not required |
| [Ant Design ConfigProvider](https://ant.design/components/config-provider) | Inherited component sizing | Provide a wrapperless size scope with explicitly documented participation |

Responsive typography and a prose scope for rendered Markdown remain later work. This proposal does
not add arbitrary font-style props, leading trim, tabular-figure controls, a public recipe system, or a
subtree theme API. Feedback color through `emphasis` is included in this proposal.
