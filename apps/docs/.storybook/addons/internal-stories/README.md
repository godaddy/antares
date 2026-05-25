# internal-stories

This addon adds an `internal` tag to all stories inside `_internal` folders so they are excluded from the default documentation view while still being accessible through Storybook filters.

## Usage

Include it as an addon in your `.storybook/main.ts` file:

```tsx
addons: [
  join('<absolutePath>', 'internal-stories/preset.ts')
],
```

Additionally, you can exclude the `internal` tag from the default filters so those stories are hidden by default:

```tsx
tags: {
  internal: {
    defaultFilterSelection: 'exclude'
  }
},
```
