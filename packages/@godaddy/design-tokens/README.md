# @godaddy/design-tokens

This package provides pre-built design tokens in `/dist` (SCSS, CSS-in-JS, classnames, DTCG JSON) built from this repo’s `tokens.yml`. Consumers import these from the package.

## Source format

Edit **`src/tokens.yml`** (and **`src/schema.json`** for editor validation). Token keys at the root are **kebab-case** identifiers (no leading `$`); use DTCG properties (`$type`, `$value`, `$description`). In the source file, tokens are grouped **color → typography → spacing → radius, shadow, blur** (see the section banners in `tokens.yml`).

```yaml
# yaml-language-server: $schema=./schema.json
font-body-family:
  $type: fontFamily
  $value: "Some Font, system-ui, sans-serif"
  $description: "Primary font family used for body text and UI labels"
  $extensions:
    com.godaddy.classname:
      property: "font-family"
```

The keys in the file are meant to match the DTCG specification for design tokens. For more information, see the [DTCG specification](https://www.designtokens.org/).

**Validating your own DTCG YAML:** The package publishes its JSON schema so you can validate your own token YAML (e.g. in VS Code with the YAML extension). Use the `schema` export in your file’s `$schema` reference—for example, `# yaml-language-server: $schema=node_modules/@godaddy/design-tokens/schema`—or point your editor at the resolved path to `dist/schema.json` in the package.

### About the `$value` key

In this project, the `$value` key is used to define the fallback value for the token. This is the value that will be used if the token is not defined in the theme.

### $extensions.com.godaddy.classname.property

The `$extensions` key allows for vendor specific behavior to be defined for tokens. In this case, the `com.godaddy.classname` extension is used to define the property that the token should be applied to when used as a class.

For a token that should apply to multiple properties (e.g. spacing for both padding and gap), use an array:

```yaml
size-space-md:
  $type: dimension
  $value: "1rem"
  $extensions:
    com.godaddy.classname:
      property:
        - padding
        - gap
```

- **$type** – DTCG type (e.g. `fontFamily`, `color`, `dimension`).
- **$value** – Fallback token value (shape depends on type).
- **$description** – Optional description.
- **$extensions.com.godaddy.classname.property** – Required for classnames: the CSS property or list of properties to apply (e.g. `"font-family"` or `["padding", "gap"]`). The token value is applied to each property in the same class. Tokens without this are not included in the classnames output.

Run **`npm run build`** to regenerate all outputs in `/dist`.

## Exports

> [!NOTE]
>
> **SCSS** variables use a `$` prefix (Sass convention). **CSS-in-JS** and **classnames** use the kebab-case token name as-is (no leading `$`). Token keys contain hyphens; in JavaScript use **bracket notation** (e.g. `tokens['font-body-family']`).

### CSS-in-JS

If you are using a CSS-in-JS library, you can import the tokens as an object. Variables resolve to `var(--name, fallback)`.

```js
import styled from 'styled-components';
import { tokens } from '@godaddy/design-tokens/css-in-js';

const StyledComponent = styled.div`
  font-family: ${tokens['font-body-family']};
`;
```

### SCSS

If you are using [SCSS](https://sass-lang.com/), you can import the tokens as a module. Variables resolve to `var(--name, fallback)`. Hyphenated names are valid Sass variables.

```scss
@use '@godaddy/design-tokens/scss' as tokens;

.my-component {
  font-family: tokens.$font-body-family;
}
```

### Classnames (utility classes)

If you are using utility classes, you can import the tokens as a CSS module. Variables resolve to `var(--name, fallback)`.

```js
import classnames from '@godaddy/design-tokens/classnames.module.css';

function MyComponent() {
  return <div className={classnames['font-body-family']}>Hello World</div>;
}
```

> [!NOTE]
>
> Not all tokens are available as classnames. Only tokens with `$extensions.com.godaddy.classname.property` will have an associated classname.

### CSS autocomplete for `.css` files (VS Code)

If you're writing vanilla CSS, you can use the built file to get autocomplete for `var(--...)` in `.css` files. The build emits **`dist/design-tokens.css-data.json`** in [VS Code CSS Custom Data](https://github.com/microsoft/vscode-css-languageservice/blob/main/docs/customData.md) format. To get autocomplete for `var(--...)` in `.css` files, add that file to your VS Code settings:

```json
{
  "css.customData": [
    "./node_modules/@godaddy/design-tokens/dist/design-tokens.css-data.json"
  ]
}
```

Use the path to the built file; the package also exports `@godaddy/design-tokens/css-data` for tooling that resolves the package entry.

This allows you to type `--` in your `.css` files and get autocomplete for the token name and value.

> [!NOTE]
>
> Custom property names match the kebab-case token key (e.g. `font-body-family`). In CSS you use the custom property with `--`:
>
> ```css
> .my-component {
>   font-family: var(--font-body-family);
> }
> ```

### DTCG JSON

Use the generated DTCG JSON file (e.g. with import attributes or fetch). This JSON follows the [DTCG specification](https://www.designtokens.org/).

```js
import dtcg from '@godaddy/design-tokens/dtcg.json' with { type: 'json' };
// or fetch/require the file
```

This project _does not_ have embedded functionality to generate the CSS meant to be used in a theme to inform these values. In order to generate the CSS, you'll want to make a copy of the DTCG JSON file, change the values to represent your theme, and use a tool like [Style Dictionary](https://github.com/amzn/style-dictionary) to generate the CSS. Style Dictionary has a [built-in format](https://github.com/amzn/style-dictionary/blob/main/docs/formats/css-variables.md) for generating the CSS variables from the DTCG JSON file which will match the expected output of this project.

```json
"theme": {
  "buildPath": "dist/",
  "transforms": ["name/kebab"],
  "files": [
    { "destination": "theme.css", "format": "css/variables" }
  ]
}
```