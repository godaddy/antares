# theme token switcher

This addon adds a single toolbar dropdown ("Theme tokens") containing one
checkbox per registered token sheet. Each checkbox independently injects
or removes its corresponding stylesheet in the preview iframe, so any
combination of token sheets — including none and all — is selectable at
runtime. The dropdown stays open while the user flips multiple toggles.

## Architecture

The addon contributes to **both** the Storybook manager and preview
bundles. The toggle catalog is split into two files so each bundle only
imports what it can actually use:

| File | Bundle(s) | Responsibility |
| --- | --- | --- |
| `index.ts` | both | Exports `managerEntries` and `previewAnnotations` |
| `addon.tsx` | manager | Custom `types.TOOL` toolbar item; reads the toggle catalog from `toggles-meta.ts` |
| `preview.tsx` | preview | Registers `globalTypes` and a decorator that syncs `<style>` tags |
| `toggles-meta.ts` | manager + preview | **CSS-free** toggle catalog (names, defaults). |
| `toggles.ts` | preview | Combines `toggles-meta.ts` with the CSS payloads. |

`toggles.ts` is **not** imported by the manager. The manager bundle's
builder cannot resolve Vite's `?inline` suffix, so doing so would break
the build. The split keeps the CSS imports isolated to the preview while
still letting the manager render an accurate, up-to-date dropdown.

## Why two files?

Coupling between the metadata and the CSS payloads is enforced by
TypeScript, not by file count or runtime checks:

```ts
// toggles.ts
const CSS: Record<ToggleName, string> = {
  Legacy: legacyCss,
  Nextgen: nextgenCss
};
```

`ToggleName` is a literal union derived from `TOGGLE_META` in
`toggles-meta.ts`. If a name is added to `TOGGLE_META` without a matching
entry in `CSS`, the build fails. If an entry is added to `CSS` that does
not exist in `TOGGLE_META`, the build also fails.

## Integration

Register the addon in `.storybook/main.ts` by including the path in the
`addons` array:

```ts
addons: [
  join(__dirname, './addons/theme-token-switcher/index.ts'),
  // the rest of the addon imports here
];
```

The addon owns the lifecycle of every registered stylesheet's `<style>`
tag. If a registered sheet is also imported unconditionally elsewhere in
`.storybook/preview.ts`, that import must be removed — otherwise the
toggle for that sheet will appear to have no effect.

## Adding a new token sheet

Two edits, in this order:

1. Append a `createMeta` call in `toggles-meta.ts`. Pass a single
   identifier-safe word for `name` — no spaces, no punctuation. That
   one string drives the dropdown label, the globals key,
   and the lowercased `<style>` tag id; no id is specified by hand.

   ```ts
   export const TOGGLE_META = [
     // ...existing entries
     createMeta({ name: 'MyTheme', defaultEnabled: false })
   ];
   ```

   For the example above: label is `MyTheme`, globals key is
   `myTheme`, `<style>` id is `theme-token-switcher-mytheme`.

2. TypeScript will now refuse to compile `toggles.ts`. Add the matching
   `?inline` CSS import and wire it under the same `name` key in `CSS`:

   ```ts
   import myThemeCss from '...?inline';

   const CSS: Record<ToggleName, string> = {
     // ...existing entries
     MyTheme: myThemeCss
   };
   ```

`addon.tsx` and `preview.tsx` automatically pick up the new entry — no
manager-side changes needed.

## Gotchas

1. **Last-loaded wins for collisions.** When multiple toggles are
   enabled, the toggle declared **later** in `TOGGLE_META` wins for any
   colliding custom properties — its `<style>` tag is appended after the
   previous one. Order toggles deliberately.
2. **Toggling a sheet off removes everything in it.** If a registered
   stylesheet contains rules beyond design tokens (e.g. resets, global
   `body` styles), those rules are removed alongside the tokens when the
   toggle is off.
3. **`@property` declarations don't unregister.** A stylesheet that
   registers properties via `@property` will leave those registrations
   in place even after its `<style>` tag is removed. Cascaded values
   disappear; the property registration persists for the life of the
   document.
4. **Vite-only.** The `?inline` import suffix is a Vite feature; this
   addon assumes the `@storybook/react-vite` framework.
