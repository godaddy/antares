***REMOVED***Upgrade Guide: Migrating from `@ux/icon` to `@bento/icon`

This guide will help you migrate from the legacy `@ux/icon` package in UXCore2 to the new `@bento/icon` package in the Bento design system.

#***REMOVED***Overview of Changes

The migration from `@ux/icon` to `@bento/icon` represents a fundamental shift in how icons are managed and rendered:

- **From individual icon imports** to a **centralized icon store**
- **From class-based components** to **functional components with hooks**
- **From static icon bundles** to **dynamic icon loading**
- **From CSS-based styling** to **prop-based configuration**

#***REMOVED***Installation

First, install the new `@bento/icon` package:

```bash
npm install @bento/icon
```

You can keep `@ux/icon` installed during the migration period, but plan to remove it once migration is complete.

#***REMOVED***API Comparison

##***REMOVED***Old API (`@ux/icon`)

```tsx
// Individual icon imports
import StarIcon from '@ux/icon/star';
import EditIcon from '@ux/icon/edit';
import '@ux/icon/star/index.css';
import '@ux/icon/edit/index.css';

// Usage
<StarIcon width="24" height="24" title="Favorite" />
<EditIcon className="my-icon" />
```

##***REMOVED***New API (`@bento/icon`)

```tsx
// Single import with icon store management
import { Icon, set } from '@bento/icon';

// Set up icons in your store
set({
  star: <svg viewBox="0 0 24 24"><path d="..." /></svg>,
  edit: <svg viewBox="0 0 24 24"><path d="..." /></svg>
});

// Usage
<Icon icon="star" width={24} height={24} title="Favorite" />
<Icon icon="edit" className="my-icon" />
```

#***REMOVED***Migration Steps

##***REMOVED***Step 1: Update Package Dependencies

```json
{
  "dependencies": {
    "@bento/icon": "^latest",
    // Remove @ux/icon when migration is complete
    // "@ux/icon": "^2301.0.0"
  }
}
```

##***REMOVED***Step 2: Set Up Icon Store

Create a centralized icon setup file (e.g., `src/icons/setup.ts`):

```tsx
import { set } from '@bento/icon';

// Import your SVG content (you'll need to extract these from @ux/icon)
import starSvg from './svgs/star.svg?raw';
import editSvg from './svgs/edit.svg?raw';
import { parser } from '@bento/icon/parser';

// Set up your icons
set({
  star: parser(starSvg),
  edit: parser(editSvg),
  // Add all your icons here
});
```

Import this setup file early in your application (e.g., in your main entry point):

```tsx
// src/main.tsx or src/index.tsx
import './icons/setup';
import App from './App';
// ... rest of your app setup
```

##***REMOVED***Step 3: Update Component Usage

###***REMOVED***Before (`@ux/icon`)
```tsx
import StarIcon from '@ux/icon/star';
import '@ux/icon/star/index.css';

function MyComponent() {
  return (
    <button>
      <StarIcon width="16" height="16" />
      Favorite
    </button>
  );
}
```

###***REMOVED***After (`@bento/icon`)
```tsx
import { Icon } from '@bento/icon';

function MyComponent() {
  return (
    <button>
      <Icon icon="star" width={16} height={16} />
      Favorite
    </button>
  );
}
```

##***REMOVED***Step 4: Handle Props Migration

| `@ux/icon` Prop | `@bento/icon` Prop | Notes |
|-----------------|-------------------|-------|
| `width` | `width` | ✅ Same |
| `height` | `height` | ✅ Same |
| `className` | `className` | ✅ Same |
| `title` | `title` | ✅ Same |
| `desc` | Not available | Use `title` for accessibility |
| `role` | Automatic | Automatically set based on `title` presence |
| N/A | `icon` | **New required prop** - icon name |
| N/A | `mode` | **New optional prop** - `'svg'` or `'sprite'` |
| N/A | `children` | **New optional prop** - placeholder content |

##***REMOVED***Step 5: Extract SVG Content

You'll need to extract the actual SVG content from your `@ux/icon` usage. Here are several approaches:

###***REMOVED***Option A: Manual Extraction
1. Find the SVG files in `node_modules/@ux/icon/[icon-name]/`
2. Copy the SVG content to your project
3. Use the `parser` to convert to React elements

###***REMOVED***Option B: Dynamic Loading (Recommended)
Set up on-demand loading for a smoother migration:

```tsx
import { ondemand } from '@bento/icon';
import { parser } from '@bento/icon/parser';

// Map old icon names to new ones if needed
const iconNameMap: Record<string, string> = {
  'star': 'star',
  'edit': 'edit',
  // Add mappings for renamed icons
};

ondemand(async function loadUxIcon(iconName: string) {
  try {
    // Attempt to load from your icon assets
    const response = await fetch(`/icons/${iconName}.svg`);
    if (!response.ok) throw new Error('Icon not found');
    
    const svgContent = await response.text();
    return parser(svgContent);
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`, error);
    return null;
  }
});
```

#***REMOVED***Advanced Migration Patterns

##***REMOVED***Handling Icon Accessories in Components

If you have components that use icon accessories (like in `@ux/dialog`, `@ux/summary`):

###***REMOVED***Before
```tsx
import Alert from '@ux/icon/alert';
import Star from '@ux/icon/star';

const ACCESSORIES = {
  critical: Alert,
  highlight: Star,
};
```

###***REMOVED***After
```tsx
import { Icon } from '@bento/icon';

const ACCESSORIES = {
  critical: 'alert',
  highlight: 'star',
};

// Usage in component
function MyDialog({ emphasis }) {
  const iconName = ACCESSORIES[emphasis];
  return (
    <div>
      {iconName && <Icon icon={iconName} />}
      {/* rest of component */}
    </div>
  );
}
```

##***REMOVED***Performance Optimization with Sprites

For better performance when using the same icons multiple times:

```tsx
import { Icon } from '@bento/icon';

// Use sprite mode for repeated icons
<Icon icon="star" mode="sprite" />
<Icon icon="star" mode="sprite" />
<Icon icon="star" mode="sprite" />
```

##***REMOVED***Server-Side Rendering Considerations

For SSR applications, ensure icons are available during server rendering:

```tsx
// Set up icons before server rendering
import { set } from '@bento/icon';
import iconData from './icon-data.json';

// Pre-load critical icons for SSR
set(iconData);
```

#***REMOVED***Common Migration Issues and Solutions

##***REMOVED***Issue 1: Missing Icons
**Problem**: Icon doesn't render after migration
**Solution**: Ensure the icon is added to the store and the name matches exactly

```tsx
// Debug missing icons
import { pick } from '@bento/icon';

const iconContent = pick('my-icon')();
if (!iconContent) {
  console.warn('Icon "my-icon" not found in store');
}
```

##***REMOVED***Issue 2: Styling Differences
**Problem**: Icons look different after migration
**Solution**: Check for CSS conflicts and ensure proper sizing

```tsx
// Explicit sizing
<Icon icon="star" width={24} height={24} />

// CSS custom properties for consistent sizing
<Icon icon="star" style={{ '--icon-size': '1.5rem' }} />
```

##***REMOVED***Issue 3: Accessibility Changes
**Problem**: Screen readers behave differently
**Solution**: Update accessibility props

```tsx
// For decorative icons (old default)
<Icon icon="star" /> // role="presentation" by default

// For semantic icons
<Icon icon="star" title="Favorite item" /> // role="img" with title
```

#***REMOVED***Automated Migration Tools

We've created a codemod to automate most of the migration process:

```bash
***REMOVED***Run the codemod on your source code
npx jscodeshift -t https://raw.githubusercontent.com/godaddy/bento-dev/main/ux-to-bento-icon-codemod.js src/

***REMOVED***Or preview changes first (dry run)
npx jscodeshift -t https://raw.githubusercontent.com/godaddy/bento-dev/main/ux-to-bento-icon-codemod.js --dry --print src/
```

The codemod will:
- Remove all `@ux/icon` imports and CSS imports
- Add `@bento/icon` imports where needed
- Transform JSX from `<StarIcon />` to `<Icon icon="star-filled" />`
- Handle icon name mappings for renamed icons
- Generate `src/icons/setup.ts` with all discovered icons
- Generate `extract-icons.sh` script to extract SVG files

After running the codemod, follow the post-codemod steps in the generated files.

#***REMOVED***Testing Your Migration

1. **Visual Testing**: Ensure icons render correctly
2. **Accessibility Testing**: Verify screen reader compatibility
3. **Performance Testing**: Check bundle size and runtime performance
4. **SSR Testing**: Ensure server-side rendering works correctly

#***REMOVED***Rollback Plan

If you need to rollback during migration:

1. Keep both packages installed temporarily
2. Use feature flags to switch between implementations
3. Gradually migrate component by component

```tsx
// Feature flag approach
import { useFeatureFlag } from './feature-flags';
import { Icon as BentoIcon } from '@bento/icon';
import UxIcon from '@ux/icon/star';

function MyIcon(props) {
  const useBentoIcons = useFeatureFlag('bento-icons');
  
  if (useBentoIcons) {
    return <BentoIcon icon="star" {...props} />;
  }
  
  return <UxIcon {...props} />;
}
```

#***REMOVED***Benefits After Migration

- **Smaller bundle sizes**: Only load icons you actually use
- **Better performance**: Sprite mode reduces DOM duplication
- **Dynamic loading**: Load icons on-demand from CDNs
- **Consistent API**: Single component for all icons
- **Better TypeScript support**: Improved type safety
- **Future-proof**: Built on modern React patterns

#***REMOVED***Getting Help

- Check the `@bento/icon` documentation for detailed API reference
- Review the examples in the `@bento/icon` package
- Consult the Bento design system documentation
- Reach out to the UX Platform team for migration support

#***REMOVED***Conclusion

While the migration from `@ux/icon` to `@bento/icon` requires some upfront work, the new system provides better performance, flexibility, and maintainability. Take the migration step by step, test thoroughly, and don't hesitate to reach out for help when needed. 