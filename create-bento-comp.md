# Creating New Bento Components

## Prerequisites
- Identify the RAC component in react-spectrum repo

## Step-by-Step

### 1. Copy RAC Component
- Location: `/Users/kbader/Documents/projects/oss/react-spectrum/packages/react-aria-components/src/{component}`
- Copy to: `packages/{component}/src/index.tsx`
- Also copy TypeScript types/interfaces from RAC

### 1.5. Review Architecture Docs
- [ ] Read `composition.mdx` for orchestrator vs primitive patterns
- [ ] Check if component should render `Container` or use `Slot` component
- [ ] Review slot naming conventions (semantic names like `trigger`, `content`, not DOM names)

### 2. Refactor to Bento Patterns

#### Core Patterns
- [ ] Wrap with `withSlots()` HOC (first arg: component name like `'BentoButton'`, second: component function)
- [ ] Use `Container` for root element (with `as` prop if needed, e.g., `as="label"`)
- [ ] For orchestrators without DOM: use `Slot` component instead of Container

#### Props & State
- [ ] Replace `useContextProps` with `useProps` (two-pass pattern for orchestrators)
- [ ] First pass: merge slot props for React Aria hooks
- [ ] Execute render prop children manually BEFORE second `useProps` call
- [ ] Second pass: call `useProps` again with state, use `apply()` to merge props
- [ ] Use `apply()` with exclusion list for React Aria-specific props (see Button example)
- [ ] Add `useDataAttributes` to expose component state for styling

#### React Aria Integration
- [ ] Use React Aria hooks (`useButton`, `useFocusRing`, `useHover`, `useCheckbox`, etc)
- [ ] Use `mergeProps` to combine multiple React Aria prop objects
- [ ] Use `mergeRefs` for combining React Aria ref with forwarded ref

#### Context & Slots
- [ ] Pass state through Context when needed (e.g., `CheckboxGroupStateContext`, `ListStateContext`)
- [ ] For orchestrators: pass `slots` object to `Container`/`Slot` with semantic names
- [ ] Use semantic slot names: `trigger`, `content`, `label`, `value`, `icon`, etc (NOT `button`, `div`, `span`)

#### Accessibility
- [ ] Use `VisuallyHidden` for hidden inputs (not `display:none`)
- [ ] Use `HiddenSelect` for native form submission when needed

#### Simplification
- [ ] Remove unused RAC props/features
- [ ] Remove Environment-related code if not needed (check if DOM checks are necessary)
- [ ] Simplify API surface (fewer props = better)

### 3. Storybook Story
- [ ] Create `{component}.stories.tsx`
- [ ] Expose ALL props as controls (argTypes)
- [ ] Include basic example
- [ ] Include all variant combinations (disabled, invalid, readonly, etc)
- [ ] Include state combinations (selected, pressed, hovered, focused)
- [ ] Make sure every prop can be toggled/tested manually
