# InlineDrawer → Composable RAC-native Rework

**Goal:** Strip `InlineDrawer` to a RAC `Disclosure` + size CSS. Remove `InlineDrawerTrigger`, `isPeek`, id-threading, and the custom peek region. Serve both the accordion and sidebar-rail patterns purely by composition.

## Target API

- `InlineDrawer` — RAC `Disclosure` + CSS. Props: `placement` (`'top'` default), `minSize`, `maxSize`, `animate`, `className`, `children`, plus RAC `Disclosure` passthrough (`isExpanded`/`defaultExpanded`/`onExpandedChange`/`isDisabled`). Emits `data-placement`, `data-animate`, and `--_min-size`/`--_max-size`.
- `InlineDrawerPanel` — thin forward to RAC `DisclosurePanel` (hides on collapse). No branch, no ids, no context.
- **Removed:** `InlineDrawerTrigger`, `InlineDrawerTriggerProps`, `InlineDrawerContext`, `isPeek`, `toSize`'s peek usage stays (plain number→px).

## Two composition patterns

**Accordion** (content hides):
```tsx
<InlineDrawer>
  <Button slot="trigger">Toggle details</Button>
  <InlineDrawerPanel><Box padding="md"><Text>…</Text></Box></InlineDrawerPanel>
</InlineDrawer>
```

**Sidebar rail** (content always visible; width toggles):
```tsx
const [expanded, setExpanded] = useState(false);
<InlineDrawer placement="left" isExpanded={expanded} onExpandedChange={setExpanded}
              minSize="min-content" maxSize="max-content">
  <Flex direction="column" gap="xs" padding="xs">
    <ToggleButton isSelected={expanded} onChange={setExpanded} aria-label="Menu"><Icon icon="bulleted-list" /></ToggleButton>
    {NAV.map((i) => (
      <LinkButton key={i.label} href={i.href} aria-label={i.label} variant="minimal">
        <Icon icon={i.icon} />{expanded ? i.label : null}
      </LinkButton>
    ))}
  </Flex>
</InlineDrawer>
```

## CSS model

- Wrapper size (rail): `[data-placement=left|right]` → `inline-size: var(--_min-size, auto)`, `[data-expanded]` → `var(--_max-size, auto)`; `top|bottom` → `block-size`. Falls back to `auto` for accordion (no min/max set).
- Panel size (accordion): `.panel` binds `inline/block-size` to RAC's `--disclosure-panel-width/height`.
- `interpolate-size: allow-keywords` on `.inlineDrawer` (animate min/max-content where supported); `.panel { interpolate-size: numeric-only }` so RAC's px→auto isn't disturbed.
- `data-animate='false'` and `prefers-reduced-motion` → `transition: none`.
- Delete `.trigger` / `.triggerButton`.

## Files
- `src/index.tsx`, `src/index.module.css` — rewrite.
- `exports/InlineDrawer.ts` — drop `InlineDrawerTrigger` + type.
- `examples/`: rewrite `default` (accordion), `sidebar-nav` (rail), `controlled` (accordion controlled), `inline-drawer-playground` (accordion; props placement/animate/isDisabled). Rework coverage examples `disabled`/`ref-forwarding`/`classname-passthrough` to use `Button slot="trigger"`.
- `inline-drawer.stories.tsx` — playground argTypes (placement/animate/isDisabled).
- tests (node/browser/visual) — update trigger queries (Button text / ToggleButton aria-label), drop `.custom-trigger`, rework sidebar tests.
- `README.mdx` — composition docs.

## Verify
typecheck, lint, node+browser green, InlineDrawer coverage 100%, visual eyeball of sidebar (collapsed rail / expanded).
