# Creating New Bento Components

## Prerequisites
- Identify the RAC component in react-spectrum repo

## ⚠️ IMPORTANT: Follow This Doc EXACTLY
- Do NOT make assumptions based on other packages
- Do NOT skip steps or create shortcuts
- If anything is unclear, STOP and ask
- When in doubt, reference another component's implementation

---

## Step-by-Step

### 1. Copy RAC Component
- Location: `/Users/kawikabader/Documents/projects/react-spectrum/packages/react-aria-components/src/{component}`
- Copy to: `packages/{component}/src/index.tsx`
- Also copy TypeScript types/interfaces from RAC
- **ALL component code goes in ONE file** (`src/index.tsx`) — do NOT split into multiple files

### 1.5. Review Architecture Docs
- [ ] Read `composition.mdx` for orchestrator vs primitive patterns
- [ ] Determine component type: **orchestrator**, **interactive primitive**, or **form input**
- [ ] Review slot naming conventions (semantic names like `trigger`, `content`, not DOM names)

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

- [ ] Include story variants for all states:
  - [ ] BasicExample (default)
  - [ ] Disabled variant
  - [ ] Invalid variant  
  - [ ] Required variant
  - [ ] ReadOnly variant (if applicable)
  - [ ] Any other state combinations (selected, pressed, hovered, focused)

- [ ] Verify every prop can be toggled in Storybook controls panel

---

### 6. Final Validation Checklist

Before considering the component complete:

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
- [ ] ✅ Stories exist for: basic, disabled, invalid, required, readonly
- [ ] ✅ Open Storybook and verify all controls work

#### Package Files
- [ ] ✅ `package.json` has correct dependency versions (match other packages)
- [ ] ✅ `tsconfig.json` extends workspace config
- [ ] ✅ `tsup.config.ts` entry points to `src/index.tsx`
- [ ] ✅ `vitest.config.ts` exists but NO test files

---

## ❌ Common Anti-Patterns to Avoid

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
✅ Full argTypes for every prop + story variants

### DON'T copy patterns from other packages blindly
❌ "I saw checkbox has multiple files, so I'll do that"
✅ Follow THIS document, not existing code patterns

### DON'T skip validation
❌ Assuming everything is correct without checking
✅ Go through validation checklist line by line