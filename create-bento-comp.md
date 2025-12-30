# Creating New Bento Components

## Prerequisites
- Identify the RAC component in react-spectrum repo

## Step 0: Check Existing Bento Primitives FIRST

**Before copying ANY RAC code, check if Bento already has primitives you should compose with.**

### Orchestrators (coordinate children via slots)
| Package | Use For |
|---------|---------|
| `@bento/overlay` | Trigger + content coordination (`type="menu"`, `"listbox"`, `"dialog"`) |
| `@bento/listbox` | Selectable lists, options, virtualization |

### Interaction Primitives
| Package | Use For |
|---------|---------|
| `@bento/pressable` | Press/click handling with data attributes |
| `@bento/button` | Accessible buttons (composes pressable) |
| `@bento/dismiss` | Escape key / click-outside dismissal |
| `@bento/focus-lock` | Focus trapping within a region |
| `@bento/scroll-lock` | Prevent body scroll |

### Layout & Containers
| Package | Use For |
|---------|---------|
| `@bento/container` | Base layout primitive with slots |
| `@bento/box` | Polymorphic container, `Slot` component |
| `@bento/portal` | Render to document.body, SSR-safe |
| `@bento/divider` | Visual/semantic separators |

### Form Inputs
| Package | Use For |
|---------|---------|
| `@bento/checkbox` | Checkboxes with groups |
| `@bento/radio` | Radio buttons with groups |
| `@bento/input` | Text inputs |

### Typography & Icons
| Package | Use For |
|---------|---------|
| `@bento/heading` | Semantic headings (h1-h6) |
| `@bento/text` | Text with semantic variants |
| `@bento/icon` | Icon rendering |
| `@bento/illustration` | Illustration rendering |

### Accessibility
| Package | Use For |
|---------|---------|
| `@bento/visually-hidden` | Screen-reader-only content |
| `@bento/field-error` | Form validation messages |

### Core Utilities (always use these)
| Package | Use For |
|---------|---------|
| `@bento/slots` | `withSlots`, `contains`, `Slot` |
| `@bento/use-props` | `useProps` hook |
| `@bento/use-data-attributes` | `useDataAttributes` hook |
| `@bento/forward` | Ref forwarding utilities |
| `@bento/error` | `BentoError` for validation |

---

### Decision Process

1. **List the patterns your component needs** (overlay, focus trap, form input, etc.)
2. **Check if Bento has a primitive for each pattern**
3. **Compose with existing primitives** rather than reimplementing hooks

**Example: Building Menu**
- Needs: trigger coordination, overlay state, focus management, portal
- Bento has: `Overlay` (trigger + state), `FocusLock`, `Portal`
- Solution: Compose with Overlay instead of calling `useOverlayTriggerState`

```tsx
<Overlay type="menu" defaultOpen={false}>
  <Button slot="trigger">Open Menu</Button>
  <Portal mounted={open}>
    <FocusLock contain restoreFocus>
      <Menu slot="content">...</Menu>
    </FocusLock>
  </Portal>
</Overlay>
```

**Only proceed to Step 1 if no existing primitive covers the pattern.**

---

## ⚠️ IMPORTANT: Follow This Doc EXACTLY
- Do NOT make assumptions based on other packages
- Do NOT skip steps or create shortcuts
- If anything is unclear, STOP and ask
- When in doubt, reference another component's implementation

---

## Step-by-Step

### 1. Copy RAC Component
- Location: `/react-spectrum/packages/react-aria-components/src/{component}`
- Copy to: `packages/{component}/src/index.tsx`
- Also copy TypeScript types/interfaces from RAC
- **ALL component code goes in ONE file** (`src/index.tsx`) — do NOT split into multiple files

### 1.5. Review Architecture Docs
- [ ] Read `composition.mdx` for orchestrator vs primitive patterns
- [ ] Determine component type: **orchestrator**, **interactive primitive**, or **form input**
- [ ] Review slot naming conventions (semantic names like `trigger`, `content`, not DOM names)

---

### 1.75. ⚠️ CRITICAL: Analyze RAC vs Bento Architecture Differences

**Before writing ANY code**, explicitly map how RAC patterns translate to Bento patterns. This prevents multiple rounds of debugging.

---

#### Always Answer (every component):

1. **Wrapper Components**
   - Does RAC wrap children in helper components (`PressResponder`, `FocusScope`, `Provider`, etc.)?
   - Bento's slot system handles prop injection → **usually don't need wrapper components**
   - Pass props through slots instead: `slots={{ trigger: pressProps }}`

2. **Hook Contracts**
   - Read the React Aria hook signatures you'll use (`useButton`, `useCheckbox`, `useMenuItem`, etc.)
   - Note which props are **always required** vs conditionally used
   - **Never conditionally pass hook props** — pass them always, use flags to control behavior
   - Example: `useMenuItem` expects `onClose` always present; `shouldCloseOnSelect` controls if it's called

3. **Context Dependencies**
   - What contexts does RAC expect? (`ButtonContext`, `CheckboxGroupContext`, `OverlayTriggerStateContext`, etc.)
   - Bento uses its own slot context → **RAC contexts won't exist automatically**
   - Create Bento-specific contexts or pass state via props/slots

4. **Render Props**
   - Does RAC use render props for state exposure (`children: (state) => ReactNode`)?
   - If yes, preserve this pattern — it's how users access internal state
   - Combine with `useDataAttributes` for styling hooks

---

#### Answer If Applicable:

**If component has overlays/popovers (Menu, Select, Popover, Modal, Tooltip):**
- RAC uses `Popover`, `OverlayContainer`, `Modal` with built-in mount/unmount
- Bento doesn't have these → **conditionally render overlay content yourself**
- Use `{state.isOpen && <Content />}` pattern for correct focus management

**If component has triggers (Menu, Popover, Dialog, Tooltip):**
- RAC often uses `PressResponder` to wrap trigger children
- Bento slots inject props automatically → **don't wrap in `PressResponder`**
- Render children directly, pass trigger props via slots

**If component is a form input (Checkbox, Radio, Input, Switch):**
- RAC uses hidden native inputs for form submission
- Use `VisuallyHidden` (not `display:none`) for accessibility
- Support `inputRef` prop for direct input access on primitives

**If component uses collections (ListBox, Menu, Select, ComboBox):**
- RAC uses `Collection`, `CollectionBuilder` from `@react-aria/collections`
- These can often be used directly
- Watch for context dependencies in collection items

**If component is a group (CheckboxGroup, RadioGroup, ToggleGroup):**
- Create context for group state
- Use React Stately for state management
- Pass state through context to child items

---

#### Mapping Template (fill out relevant rows before coding):

```markdown
## RAC → Bento Mapping for {ComponentName}

| RAC Pattern | Bento Equivalent | Applies? | Notes |
|-------------|------------------|----------|-------|
| Wrapper components (`PressResponder`, etc.) | Slot props | ☐ | |
| Hook X requires prop Y always | Pass Y, use flag Z | ☐ | |
| Context X expected | Create Bento context / pass via props | ☐ | |
| Render props for state | Preserve pattern | ☐ | |
| `Popover`/`Modal` component | Conditional render `{open && ...}` | ☐ | |
| Hidden native input | `VisuallyHidden` | ☐ | |
| `Collection`/`CollectionBuilder` | Use directly | ☐ | |
| Group state context | Create context + React Stately | ☐ | |
```

**Only proceed to Step 2 after completing this analysis.**

---

### 2. Refactor to Bento Patterns

#### Always (every component)
- [ ] Wrap with `withSlots('Bento{Name}', function Component(...) { })`
- [ ] Use `useProps()`: `const { props, apply, ref } = useProps(args)`
- [ ] Use `apply()` to spread props (with exclusion list for component-specific props)
- [ ] Export TypeScript interfaces for props
- [ ] Extend from appropriate base types (`ContainerProps`, `AriaCheckboxProps`, etc.)

#### If renders DOM (most primitives)
- [ ] Use `Container` as root element (with `as` prop if needed, e.g., `as="label"`)
- [ ] Use `PolymorphicProps<T, Props>` / `PolymorphicComponentProps<T, Props>` for polymorphic typing
- [ ] Never use raw HTML (`<button>`, `<div>`) — prefer Bento primitives

#### If orchestrator (coordinates children via slots)
- [ ] Use `Slot` component if no wrapping DOM needed, otherwise `Container` with `slots` prop
- [ ] Pass `slots` object with semantic names: `trigger`, `content`, `title`, `description`, `close`, `icon`, `header`, `footer`
- [ ] Use nested slot names with dot notation: `trigger.icon`, `panel.title`, `panel.footer`
- [ ] Pass `null` to conditionally hide slots: `overlay: state.isOpen ? {...overlayProps} : null`
- [ ] Two-pass `useProps()` pattern if children need state:
  1. First pass: merge slot props for React Aria hooks
  2. Execute render prop children
  3. Second pass: call `useProps()` again with state

#### If interactive (pressable, focusable, hoverable)
- [ ] Use React Aria hooks (`useButton`, `useFocusRing`, `useHover`, `usePress`, etc.)
- [ ] Use `mergeProps` to combine React Aria prop objects
- [ ] Use `mergeRefs` from `@react-aria/utils` for combining refs
- [ ] Use `useDataAttributes` to expose state for styling:
  ```tsx
  {...useDataAttributes({
    pressed: isPressed,
    hovered: isHovered,
    focused: isFocused,
    focusVisible: isFocusVisible,
    disabled: isDisabled
  })}
  ```

#### If form input (checkbox, radio, input, select)
- [ ] Use `VisuallyHidden` for hidden native inputs (not `display:none`)
- [ ] Use `HiddenSelect` for native form submission when needed (orchestrators like Select)
- [ ] Support `inputRef` prop for direct input access **ONLY for primitives** (Checkbox, Radio, Input) — not for orchestrators (Select, ComboBox) where the form element is internal
- [ ] Expose form-related data attributes: `data-selected`, `data-invalid`, `data-required`, `data-readonly`, `data-indeterminate`

#### If group component (CheckboxGroup, RadioGroup, ListBox)
- [ ] Create context for group state (e.g., `CheckboxGroupStateContext`)
- [ ] Use React Stately for state management (`useCheckboxGroupState`, `useListState`, etc.)
- [ ] Pass state through context to child items

---

### 3. Simplification
- [ ] Remove unused RAC props/features
- [ ] Remove Environment-related code if not needed
- [ ] Simplify API surface (fewer props = better)

---

### 4. Package Structure
- [ ] `package.json` with proper dependencies and peer dependencies
- [ ] `tsconfig.json` extending workspace config
- [ ] `tsup.config.ts` for bundling
- [ ] `vitest.config.ts` for testing
- [ ] Add package to workspace (Nx)
- [ ] **DO NOT create `test/` folder or test files** — tests are handled separately

---

### 5. Storybook Story
- [ ] Create `{component}.stories.tsx`
- [ ] **Expose ALL props as controls (argTypes)** — EVERY SINGLE PROP must have an argType entry
  
  Example structure:
  ```tsx
  const defaultArgTypes = {
    propName: {
      control: { type: 'text' | 'boolean' | 'select' | 'object' as const },
      description: 'Clear description of what this prop does',
      table: { 
        defaultValue: { summary: 'default value or —' }, 
        type: { summary: 'TypeScript type' } 
      }
    },
    // ... repeat for EVERY prop
  };
  ```
  
  ❌ **DON'T:**
  - Use helper functions without explicit argTypes
  - Create minimal stories with missing controls
  - Skip any props from the interface
  
  ✅ **DO:**
  - List every single prop from your component's interface
  - Include accessibility props (aria-label, aria-describedby, etc.)
  - Include styling props (className, style, id)
  - Add proper control types for each prop
  - Add descriptions for what each prop does

- [ ] Create **ONE** basic example file in `examples/{component}.tsx`
  
  ❌ **DON'T:** Create multiple example files (controlled, disabled, sections, etc.)
  ✅ **DO:** Create exactly one file: `examples/{component}.tsx`

- [ ] **Minimize story variants** — use controls instead of separate stories
  
  **Rule**: Only create separate story variants when **JSX structure differs** (e.g., with/without sections).
  Otherwise, let users toggle states via Storybook controls.
  
  ✅ **DO:**
  - `BasicExample` — all states toggleable via controls (disabled, selection, etc.)
  - `WithSections` — only if JSX structure is different
  
  ❌ **DON'T:**
  - Create separate stories for Disabled, Required, Invalid, ReadOnly
  - These are just prop changes — use controls instead

- [ ] Verify every prop can be toggled in Storybook controls panel

---

### 6. Test with Playwright MCP Browser Tools

After building the component, **always test in Storybook using browser MCP tools**:

```bash
# Build the component first
cd packages/{component} && npm run build
```

Then use the browser tools to verify functionality:

1. **Navigate**: `browser_navigate` to `http://localhost:6006/?path=/story/components-{name}--basic-{name}`
2. **Snapshot**: `browser_snapshot` to see the accessibility tree and component state
3. **Interact**: `browser_click` on triggers, buttons, menu items, etc.
4. **Verify**:
   - Actions fire correctly (check Actions panel)
   - State changes work (open/close, select/deselect)
   - No console errors (check `browser_console_messages`)
   - Keyboard navigation works (`browser_press_key`)
5. **Fix issues** before moving to final validation

This catches bugs like:
- Hooks errors from conditional rendering
- Focus management issues
- Missing event handlers
- Incorrect ARIA attributes

---

### 7. Final Validation Checklist

Before considering the component complete:

#### Pre-Implementation
- [ ] ✅ Step 0 completed — checked existing Bento primitives for overlap
- [ ] ✅ Composing with existing orchestrators (Overlay, Portal, etc.) where applicable
- [ ] ✅ Step 1.75 RAC→Bento mapping completed BEFORE coding
- [ ] ✅ Identified wrapper components to remove (PressResponder, etc.)
- [ ] ✅ Reviewed all hook signatures for required vs optional props
- [ ] ✅ Identified context dependencies and how to handle them
- [ ] ✅ Answered applicable conditional questions (overlays, triggers, form inputs, etc.)

#### Source Code
- [ ] ✅ All code is in ONE file (`src/index.tsx`)
- [ ] ✅ No separate component files (select.tsx, select-value.tsx, etc.)
- [ ] ✅ Uses `withSlots('Bento{Name}', ...)` for all exported components
- [ ] ✅ Uses `useProps()` and `apply()`
- [ ] ✅ All TypeScript interfaces are exported

#### Examples
- [ ] ✅ Exactly ONE example file exists: `examples/{component}.tsx`
- [ ] ✅ No other example files (no controlled, disabled, sections variants)

#### Tests
- [ ] ✅ NO `test/` folder exists
- [ ] ✅ NO test files created

#### Storybook
- [ ] ✅ Count props in interface, count argTypes entries — numbers match
- [ ] ✅ Every prop has: control type, description, table metadata
- [ ] ✅ Minimal story variants (only separate when JSX differs)
- [ ] ✅ All states toggleable via controls (disabled, invalid, required, etc.)
- [ ] ✅ **Use Playwright MCP browser tools to test in Storybook:**
  1. Navigate to the story: `browser_navigate` to `http://localhost:6006/?path=/story/components-{name}--basic-{name}`
  2. Take a snapshot: `browser_snapshot` to see the component state
  3. Interact with component: `browser_click` on triggers, inputs, items
  4. Verify behavior: check that actions fire, states change, no console errors
  5. Test edge cases: disabled states, keyboard navigation, close behavior

#### Package Files
- [ ] ✅ `package.json` has correct dependency versions (match other packages)
- [ ] ✅ `tsconfig.json` extends workspace config
- [ ] ✅ `tsup.config.ts` entry points to `src/index.tsx`
- [ ] ✅ `vitest.config.ts` exists but NO test files

---

## ❌ Common Anti-Patterns to Avoid

### DON'T reimplement what Bento already provides
❌ Reimplementing hooks that existing orchestrators already handle
❌ Writing focus trap logic when `@bento/focus-lock` exists
❌ Writing portal logic when `@bento/portal` exists
❌ Writing press handlers when `@bento/pressable` or `@bento/button` exists
✅ Check Step 0 first — list patterns, check primitives, compose

### DON'T split source files
❌ Creating `select.tsx`, `select-value.tsx`, `index.tsx`
✅ Everything in `src/index.tsx`

### DON'T create multiple examples
❌ Creating `select.tsx`, `select-controlled.tsx`, `select-disabled.tsx`
✅ Only `examples/{component}.tsx`

### DON'T create test files
❌ Creating `test/*.test.tsx`
✅ Tests handled separately (only config files)

### DON'T use minimal storybook stories
❌ Using helpers without argTypes: `getStory(Example)` and nothing else
✅ Full argTypes for every prop

### DON'T create unnecessary story variants
❌ Separate stories for Disabled, Invalid, Required, ReadOnly
✅ One story with controls — only separate when JSX structure differs

### DON'T copy patterns from other packages blindly
❌ "I saw checkbox has multiple files, so I'll do that"
✅ Follow THIS document, not existing code patterns

### DON'T skip the RAC→Bento architecture analysis
❌ "I'll just copy RAC code and adapt it as I go"
✅ Complete Step 1.75 mapping BEFORE writing any code
✅ Understand WHY RAC uses wrapper components, contexts, and specific hook patterns
✅ Know which RAC patterns translate directly vs need Bento-specific handling

### DON'T skip validation
❌ Assuming everything is correct without checking
✅ Go through validation checklist line by line