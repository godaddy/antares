# @godaddy/themes

Theme definitions for GoDaddy products. Each theme provides a complete set of design token values that conform to the contract defined by `@godaddy/design-tokens`.

## Structure

The only required file is `src/<brand>/<theme>/index.json`. Everything else — how you split your tokens, whether you use a shared palette, the filenames you choose — is up to you.

```text
src/
  <brand>/
    CODEOWNERS            # Required — review routing for this brand
    _palette.json         # Shared color aliases (optional)
    <theme>/
      CODEOWNERS          # Review routing override (optional)
      index.json          # Required — must cover all design tokens
      ...                 # Any other .json files (optional)
```

The `godaddy/airo` directory splits tokens into `color.json`, `typography.json`, `spacing.json`, and `effects.json` referenced by `index.json` — but a theme could just as easily put all tokens directly in `index.json` or organize files differently.

Token files follow the [DTCG](https://www.designtokens.org/) specification. Files that combine multiple sources use the **resolver** format:

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "color": {
      "description": "Semantic color tokens",
      "sources": [
        { "$ref": "../_palette.json" },
        { "color-action-background-primary-default": { "$type": "color", "$value": "{godaddy-blue}" } }
      ]
    }
  },
  "resolutionOrder": ["sets/color"]
}
```

Plain token files (no `$schema`/`sets`) are also supported and can be referenced via `$ref`.

## Adding a theme

1. Create a directory at `src/<brand>/<theme>/`
2. Add an `index.json` that covers every token defined in `@godaddy/design-tokens` (either inline or via a resolver referencing other files)
3. Run `npm run build` — it will fail if any tokens are missing

## Build

```sh
npm run build
```

Produces CSS files in `dist/` mirroring the `src/` structure. Each `.json` file (except `_` prefixed) generates a corresponding `.css` file with custom properties wrapped in `@scope { :scope {} }`.

The build pipeline:
1. A local **resolver** (`scripts/resolver.ts`) loads each entry, follows `$ref` sources, and merges tokens into a flat map
2. **Style Dictionary** with `@tokens-studio/sd-transforms` transforms DTCG values (objects) to CSS and writes the output files

## Usage

Theme CSS files are applied by placing a `<link>` element directly inside the element where the theme should take effect — **not** in the `<head>`. The `@scope` rule ensures custom properties are scoped to the nearest ancestor that loads the stylesheet.

```html
<body>
  <link rel="stylesheet" href="https://cdn.example.com/themes/godaddy/airo/index.css" />
  <header>...</header>
  <main>...</main>
  <footer>
    <!-- Dark theme applies only within the footer -->
    <link rel="stylesheet" href="https://cdn.example.com/themes/godaddy/dark/index.css" />
    ...
  </footer>
</body>
```

This allows multiple themes to coexist on the same page, each scoped to the subtree where its `<link>` appears.

### Why `@scope` instead of `:root`

Declaring custom properties on `:root` makes them global — only one theme can be active at a time, and overriding requires specificity tricks or cascade layers. `@scope` ties the properties to the element that loaded the stylesheet, so different regions of the page can use different themes without conflicts. It also means the theme activates based on _where_ the `<link>` appears in the DOM rather than requiring class names or data attributes.

> [!NOTE]
> This package does not prescribe where the CSS files are hosted. The `href` values above are illustrative — your actual URLs will depend on your CDN or asset pipeline.

## Conventions

- Files prefixed with `_` provide shared aliases but do not produce CSS output
- `index.json` must cover every token in `@godaddy/design-tokens` (validated at build time)
- Token values can be CSS strings (e.g. `"royalblue"`, `"1rem"`) or DTCG objects (e.g. shadow `{ offsetX, offsetY, blur, spread, color }`) — Style Dictionary transforms objects to CSS
- Alias references (e.g. `"{godaddy-blue}"`) are resolved by Style Dictionary at build time
