# @godaddy/themes

Theme definitions for GoDaddy products. Each theme provides a complete set of design token values that conform to the contract defined by `@godaddy/design-tokens`.

## Structure

The only required file is `src/<brand>/<theme>/index.json`. Everything else — how you split your tokens, whether you use a shared palette, the filenames you choose is up to you but there are recommendations below.

```text
src/
  <brand>/
    CODEOWNERS            # Required — review routing for this brand
    _palette.json         # Shared color aliases (optional)
    _fonts.json           # Shared font families (optional)
    <theme>/
      CODEOWNERS          # Review routing override (optional)
      index.json          # Required must cover all design tokens
      color.json          # Defines colors for <theme> 
      typography.json     # Defines typography for <theme>
      spacing.json        # Defines dimension (spacing/rounding) for <theme>
      effects.json        # Defines shadows and blurs for <theme>
      ...                 # Any other .json files (optional)
```

You can import files into other files to consolidate, organize, and reuse values within a brand and across themes.

Splitting these files allows different slices of a theme to be served. For example, it's more common for colors to change across a brand and not common for typography to change. This means you could have several themes that focus on changing colors, but always reference the same typography values owned by the brand.

Token files loosely follow the [DTCG](https://www.designtokens.org/) specification. Files that combine multiple sources use the **resolver** format:

```json5
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "color": {
      "description": "Semantic color tokens",
      "sources": [
        // This can be thought of as an "import"
        { "$ref": "../_palette.json" },
        // Additional token-value assignments using the import
        { "color-action-background-primary-default": {
            "$type": "color",
            "$value": "{some-alias}"
          }
        }
      ]
    }
  },
  // This can be thought of as an "export"
  "resolutionOrder": ["sets/color"]
}
```

Plain token files (no `$schema`/`sets`) are also supported and can be referenced via `$ref`.

The values (set at `$value`) can be CSS strings or the expected DTCG format. The transformer should convert DTCG values to the appropriate CSS value or otherwise write the string as provided.

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
> This package does not prescribe where the CSS files are hosted. The `href` values above are illustrative — your actual URLs will depend on the CDN or asset pipeline.

## Conventions

- Files prefixed with `_` provide shared aliases but do not produce CSS output
- `index.json` must cover every token in `@godaddy/design-tokens` (validated at build time)
- Token values can be CSS strings (e.g. `"royalblue"`, `"1rem"`) or DTCG objects (e.g. shadow `{ offsetX, offsetY, blur, spread, color }`) — Style Dictionary transforms objects to CSS
- Alias references (e.g. `"{godaddy-blue}"`) are resolved by Style Dictionary at build time
