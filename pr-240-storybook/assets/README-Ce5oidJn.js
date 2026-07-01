import{i as e}from"./preload-helper-MxSc4jeG.js";import{y as t}from"./iframe-BMHlgL0E.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CETn7dqd.js";import{t as c}from"./mdx-react-shim-DCFTjBV3.js";import{Icon as l,Props as u,n as d,t as f}from"./icon.stories-89bSswJn.js";var p,m=e((()=>{p=`import { Icon, type IconProps } from '@godaddy/antares';

/**
 * Example Icon component demonstrating basic usage with default star icon
 *
 * Renders a star icon with aria-label for accessibility and accepts additional
 * props to override defaults. Used in Storybook documentation and examples.
 *
 * @param props - Partial IconProps (excluding ref) to override default icon properties
 * @returns JSX element rendering the Icon component with star icon
 *
 * @example
 * \`\`\`typescript
 * // Basic usage with defaults
 * <IconExample />
 *
 * // With custom dimensions and color
 * <IconExample width={24} height={24} color="blue" />
 * \`\`\`
 */
export function IconExample(props: Partial<Omit<IconProps, 'ref'>>) {
  return <Icon icon="star" aria-label="Star icon" {...props} />;
}
`}));function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:f,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`icon`,children:`Icon`}),`
`,(0,_.jsx)(t.p,{children:`Flexible SVG icon component with on-demand loading, automatic caching, and extensive customization options`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`Icon`}),` component provides a flexible and performant way to display SVG icons with extensive customization options. Built on top of the Bento Icon system, it features on-demand loading from a CDN, automatic caching, and enhanced props for the Antares design system.`]}),`
`,(0,_.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`On-demand loading`}),`: Icons are loaded asynchronously from CDN only when needed`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Automatic caching`}),`: Once loaded, icons are cached for optimal performance`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Flexible sizing`}),`: Support for `,(0,_.jsx)(t.code,{children:`width`}),` and `,(0,_.jsx)(t.code,{children:`height`}),` props`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Color inheritance`}),`: Uses `,(0,_.jsx)(t.code,{children:`currentColor`}),` by default for seamless theme integration`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Accessibility ready`}),`: Built-in support for screen readers and keyboard navigation`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`TypeScript support`}),`: Fully typed with comprehensive prop interfaces`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Bento integration`}),`: Extends Bento Icon with additional Antares-specific features`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`Icon`}),` component accepts the following props:`]}),`
`,(0,_.jsx)(a,{of:u}),`
`,(0,_.jsx)(t.h3,{id:`prop-inheritance`,children:`Prop Inheritance`}),`
`,(0,_.jsxs)(t.p,{children:[`The component extends `,(0,_.jsx)(t.code,{children:`BentoIconProps`}),` and passes through all standard HTML attributes and accessibility props to the underlying Bento Icon component. This includes:`]}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Accessibility`}),`: `,(0,_.jsx)(t.code,{children:`aria-label`}),`, `,(0,_.jsx)(t.code,{children:`aria-describedby`}),`, `,(0,_.jsx)(t.code,{children:`role`}),`, `,(0,_.jsx)(t.code,{children:`title`})]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Events`}),`: `,(0,_.jsx)(t.code,{children:`onClick`}),`, `,(0,_.jsx)(t.code,{children:`onMouseOver`}),`, `,(0,_.jsx)(t.code,{children:`onFocus`}),`, etc.`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Styling`}),`: `,(0,_.jsx)(t.code,{children:`className`}),`, `,(0,_.jsx)(t.code,{children:`style`}),`, `,(0,_.jsx)(t.code,{children:`data-*`}),` attributes`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Transform`}),`: `,(0,_.jsx)(t.code,{children:`rotate`}),`, `,(0,_.jsx)(t.code,{children:`flip`}),` for icon transformations`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,_.jsx)(i,{of:l,inline:!0}),`
`,(0,_.jsx)(r,{language:`tsx`,code:p}),`
`,(0,_.jsx)(t.h2,{id:`size-variants`,children:`Size Variants`}),`
`,(0,_.jsx)(t.p,{children:`Specify explicit width and height values:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star" width={24} height={24} />
`})}),`
`,(0,_.jsx)(t.p,{children:`You can use different values for width and height:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star" width={32} height={16} />
`})}),`
`,(0,_.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,_.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,_.jsx)(t.p,{children:`The Icon component uses Bento's slot system with the following component hierarchy and available slot override points:`}),`
`,(0,_.jsx)(t.h4,{id:`component-hierarchy`,children:`Component Hierarchy`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-text`,children:`Icon (registered as "Icon")
└── BentoIcon (registered as "BentoIcon", slot="icon")
    └── BentoIllustration (registered as "BentoIllustration", slot="content")
`})}),`
`,(0,_.jsx)(t.h4,{id:`available-slot-overrides`,children:`Available Slot Overrides`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:(0,_.jsx)(t.code,{children:`icon`})}),`: Overrides the entire BentoIcon component - affects icon loading, caching, sprite/SVG mode switching, data attributes, and the overall icon wrapper`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:(0,_.jsx)(t.code,{children:`icon.content`})}),`: Overrides the BentoIllustration component - affects SVG transformations (rotate, flip), accessibility attributes (`,(0,_.jsx)(t.code,{children:`role`}),`, `,(0,_.jsx)(t.code,{children:`focusable`}),`, `,(0,_.jsx)(t.code,{children:`aria-labelledby`}),`), viewBox calculations, and final SVG element rendering`]}),`
`]}),`
`,(0,_.jsxs)(t.p,{children:[`For complete slot override patterns and examples, see the `,(0,_.jsx)(t.code,{children:`@bento/slots`}),` package documentation.`]}),`
`,(0,_.jsx)(t.h3,{id:`custom-icons`,children:`Custom Icons`}),`
`,(0,_.jsx)(t.p,{children:`While the Icon component loads design system approved icons from the CDN by default, teams can introduce custom icons using the underlying Bento Icon system.`}),`
`,(0,_.jsx)(t.h4,{id:`adding-icons-synchronously`,children:`Adding Icons Synchronously`}),`
`,(0,_.jsxs)(t.p,{children:[`Use the `,(0,_.jsx)(t.code,{children:`set`}),` method to add custom icons that are available immediately:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { Icon, set, parser } from '@godaddy/antares';

// Add a custom icon from an SVG string
const customIconSvg = '<svg viewBox="0 0 24 24"><path d="..."/></svg>';

set({
  'custom-logo': parser(customIconSvg),
  'team-icon': (
    <svg viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
});

// Now use your custom icon
<Icon icon="custom-logo" />
<Icon icon="team-icon" />
`})}),`
`,(0,_.jsx)(t.h4,{id:`adding-icons-asynchronously`,children:`Adding Icons Asynchronously`}),`
`,(0,_.jsxs)(t.p,{children:[`Use the `,(0,_.jsx)(t.code,{children:`ondemand`}),` method to load custom icons from your own sources:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { Icon, ondemand, parser } from '@godaddy/antares';

// Add a custom loader for team-specific icons
const unregister = ondemand(async function loadTeamIcons(iconName) {
  if (iconName.startsWith('team-')) {
    const response = await fetch(\`/api/team-icons/\${iconName}.svg\`);
    const svgContent = await response.text();
    return parser(svgContent);
  }
  // Return undefined to let other loaders handle this icon
});

// Icons prefixed with 'team-' will load from your custom endpoint
<Icon icon="team-dashboard" />
<Icon icon="team-settings" />

// Later, if needed, unregister the loader
unregister();
`})}),`
`,(0,_.jsx)(t.h4,{id:`custom-icon-apis`,children:`Custom Icon APIs`}),`
`,(0,_.jsxs)(t.p,{children:[`The following methods are exported from `,(0,_.jsx)(t.code,{children:`@godaddy/antares`}),` for custom icon management:`]}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:(0,_.jsx)(t.code,{children:`set(icons)`})}),`: Synchronously add icons to the store`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:(0,_.jsx)(t.code,{children:`ondemand(loader)`})}),`: Register an asynchronous icon loader (returns unregister function)`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:(0,_.jsx)(t.code,{children:`parser(svgString)`})}),`: Parse SVG strings into React elements`]}),`
`]}),`
`,(0,_.jsxs)(t.p,{children:[`These are re-exports of the underlying Bento Icon system methods. For complete API documentation, advanced usage patterns, and implementation details, see the `,(0,_.jsx)(t.code,{children:`@bento/icon`}),` and `,(0,_.jsx)(t.code,{children:`@bento/svg-parser`}),` package documentation.`]}),`
`,(0,_.jsx)(t.h4,{id:`notes`,children:`Notes`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsx)(t.li,{children:`Custom icons integrate seamlessly with all Icon component features (transformations, accessibility, sprite mode, etc.)`}),`
`,(0,_.jsxs)(t.li,{children:[`Multiple `,(0,_.jsx)(t.code,{children:`ondemand`}),` loaders can be registered and will be called in order until one returns content`]}),`
`,(0,_.jsxs)(t.li,{children:[`Use the `,(0,_.jsx)(t.code,{children:`parser`}),` function to convert SVG strings to React elements`]}),`
`,(0,_.jsx)(t.li,{children:`Custom icons are cached automatically just like CDN icons`}),`
`]}),`
`,(0,_.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,_.jsx)(t.h4,{id:`css-classes`,children:`CSS Classes`}),`
`,(0,_.jsxs)(t.p,{children:[`The component accepts standard `,(0,_.jsx)(t.code,{children:`className`}),` and `,(0,_.jsx)(t.code,{children:`style`}),` props:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star" className="my-icon" style={{ margin: '10px' }} />
`})}),`
`,(0,_.jsxs)(t.p,{children:[(0,_.jsx)(t.strong,{children:`Important`}),`: When you supply a `,(0,_.jsx)(t.code,{children:`className`}),`, you make a commitment to take over all styling of the component as it will remove the standard class names. Use data attributes for targeted styling instead.`]}),`
`,(0,_.jsx)(t.h4,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,_.jsx)(t.p,{children:`The component automatically adds data attributes for styling hooks:`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`data-icon`}),`: The icon name (always present)`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`data-color`}),`: Applied when color prop is set`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`data-loading`}),`: Applied during icon loading from CDN`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`data-mode`}),`: Applied when mode prop is set (e.g., "sprite")`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`data-flip`}),`: Applied when flip prop is set ("horizontal" or "vertical")`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`data-rotate`}),`: Applied when rotate prop is set (90, 180, or 270)`]}),`
`]}),`
`,(0,_.jsx)(t.p,{children:`The component also includes accessibility attributes:`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`role="presentation"`}),`: For decorative icons`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`role="img"`}),`: When title prop is provided`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`focusable="false"`}),`: Prevents keyboard focus`]}),`
`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-css`,children:`/* Style by icon name */
[data-icon="star"] {
  color: gold;
}

/* Style by color */
[data-color="red"] {
  border: 1px solid currentColor;
}

/* Style loading state */
[data-loading="true"] {
  opacity: 0.5;
}

/* Style sprite mode */
[data-mode="sprite"] {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

/* Style flipped icons */
[data-flip="horizontal"] {
  transform-origin: center;
}

/* Style rotated icons */
[data-rotate="90"] {
  transition: transform 0.2s ease;
}
`})}),`
`,(0,_.jsx)(t.h2,{id:`color-customization`,children:`Color Customization`}),`
`,(0,_.jsx)(t.h3,{id:`inherit-from-parent-default`,children:`Inherit from Parent (Default)`}),`
`,(0,_.jsxs)(t.p,{children:[`By default, icons inherit the color from their parent element via `,(0,_.jsx)(t.code,{children:`currentColor`}),`:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<div style={{ color: 'blue' }}>
  <Icon icon="star" /> {/* Will be blue */}
</div>
`})}),`
`,(0,_.jsx)(t.h3,{id:`explicit-colors`,children:`Explicit Colors`}),`
`,(0,_.jsx)(t.p,{children:`Override the color with specific values:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star" color="#ff6b35" />          // Hex color
<Icon icon="star" color="rgb(255, 107, 53)" /> // RGB color
<Icon icon="star" color="var(--primary-color)" /> // CSS variable
<Icon icon="star" color="currentColor" />     // Explicit inheritance
`})}),`
`,(0,_.jsx)(t.h2,{id:`icon-transformations`,children:`Icon Transformations`}),`
`,(0,_.jsxs)(t.p,{children:[`Transform capabilities are inherited from the Bento Illustration component. For complete transformation options and implementation details, see the `,(0,_.jsx)(t.code,{children:`@bento/illustration`}),` package documentation.`]}),`
`,(0,_.jsx)(t.h3,{id:`rotation`,children:`Rotation`}),`
`,(0,_.jsx)(t.p,{children:`Rotate icons by 90-degree increments:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="arrow" rotate={90} />   // 90 degrees
<Icon icon="arrow" rotate={180} />  // 180 degrees
<Icon icon="arrow" rotate={270} />  // 270 degrees
`})}),`
`,(0,_.jsx)(t.h3,{id:`flipping`,children:`Flipping`}),`
`,(0,_.jsx)(t.p,{children:`Flip icons horizontally or vertically:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="arrow" flip="horizontal" />
<Icon icon="arrow" flip="vertical" />
`})}),`
`,(0,_.jsx)(t.h2,{id:`loading-states`,children:`Loading States`}),`
`,(0,_.jsx)(t.h3,{id:`placeholder-content`,children:`Placeholder Content`}),`
`,(0,_.jsx)(t.p,{children:`Provide fallback SVG content while icons load from the CDN:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3" />
  </svg>
</Icon>
`})}),`
`,(0,_.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsx)(t.h3,{id:`decorative-icons`,children:`Decorative Icons`}),`
`,(0,_.jsxs)(t.p,{children:[`For purely decorative icons, no additional attributes are needed. The icon will have `,(0,_.jsx)(t.code,{children:`role="presentation"`}),` and be ignored by screen readers:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star" /> {/* Decorative, screen readers will ignore */}
`})}),`
`,(0,_.jsx)(t.h3,{id:`semantic-icons`,children:`Semantic Icons`}),`
`,(0,_.jsxs)(t.p,{children:[`For icons that convey meaning, use the `,(0,_.jsx)(t.code,{children:`title`}),` prop. This automatically adds `,(0,_.jsx)(t.code,{children:`role="img"`}),` and provides screen reader accessible text:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`{/* Semantic icon - use title prop */}
<Icon icon="star" title="Favorite item" />

{/* Warning icon with semantic meaning */}
<Icon icon="alert" title="Warning: Your session will expire soon" />

{/* Status indicator with meaning */}
<Icon icon="check-circle" title="Task completed successfully" />
`})}),`
`,(0,_.jsx)(t.h3,{id:`interactive-icons`,children:`Interactive Icons`}),`
`,(0,_.jsxs)(t.p,{children:[`For interactive icons within buttons or links, use the `,(0,_.jsx)(t.code,{children:`title`}),` prop on the icon and `,(0,_.jsx)(t.code,{children:`aria-label`}),` on the interactive element:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`{/* Button with icon - label the button, not the icon */}
<button aria-label="Close dialog">
  <Icon icon="close" />
</button>

{/* Icon button where icon has semantic meaning */}
<button aria-label="Mark as favorite">
  <Icon icon="star" title="Favorite" />
</button>

{/* Link with icon */}
<a href="/settings" aria-label="Go to settings">
  <Icon icon="settings" />
</a>
`})}),`
`,(0,_.jsx)(t.h2,{id:`performance-considerations`,children:`Performance Considerations`}),`
`,(0,_.jsx)(t.h3,{id:`default-icon-loading`,children:`Default Icon Loading`}),`
`,(0,_.jsx)(t.p,{children:`Icons are loaded on-demand from a CDN using the following process:`}),`
`,(0,_.jsxs)(t.ol,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`First Request`}),`: When an icon is first encountered, it triggers an asynchronous fetch from the CDN`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`SVG Parsing`}),`: The fetched SVG string is parsed into a React element using `,(0,_.jsx)(t.code,{children:`@bento/svg-parser`})]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Automatic Caching`}),`: Once loaded, the icon is cached in memory to avoid subsequent network requests`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Full SVG Rendering`}),`: Each icon instance renders as a complete SVG element with all path data`]}),`
`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`// Each icon renders as a full SVG element
<Icon icon="star" />  // <svg><path d="M3 22v-20l18 10-18 10z" /></svg>
<Icon icon="star" />  // <svg><path d="M3 22v-20l18 10-18 10z" /></svg>
<Icon icon="star" />  // <svg><path d="M3 22v-20l18 10-18 10z" /></svg>
`})}),`
`,(0,_.jsx)(t.p,{children:`This approach works well for SSR and small numbers of icons, but can lead to DOM bloat when the same icon appears many times.`}),`
`,(0,_.jsx)(t.h3,{id:`sprite-mode-optimization`,children:`Sprite Mode Optimization`}),`
`,(0,_.jsxs)(t.p,{children:[`When `,(0,_.jsx)(t.code,{children:`mode="sprite"`}),` is enabled, the component switches to a more efficient rendering strategy:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon="star" mode="sprite" />
<Icon icon="star" mode="sprite" />
<Icon icon="star" mode="sprite" />
`})}),`
`,(0,_.jsx)(t.p,{children:(0,_.jsx)(t.strong,{children:`What happens with sprite mode:`})}),`
`,(0,_.jsxs)(t.ol,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Sprite Sheet Creation`}),`: A hidden SVG sprite sheet is automatically injected into the DOM containing symbol definitions`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Reference Rendering`}),`: Each icon renders as a lightweight `,(0,_.jsx)(t.code,{children:`<use>`}),` element that references the sprite`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Deduplication`}),`: Icon path data only exists once in the sprite sheet, regardless of how many times it's used`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Client-Side Hydration`}),`: The sprite sheet is generated and injected after hydration, causing a brief paint event`]}),`
`]}),`
`,(0,_.jsx)(t.p,{children:(0,_.jsx)(t.strong,{children:`DOM Output:`})}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-html`,children:`<!-- Hidden sprite sheet (created automatically) -->
<svg id="bento-svg-sprite" style="display: none;">
  <symbol id="bento-svg-spritesheet-star" viewBox="0 0 24 24">
    <path d="M3 22v-20l18 10-18 10z" />
  </symbol>
</svg>

<!-- Lightweight icon references -->
<svg><use xlink:href="#bento-svg-spritesheet-star" /></svg>
<svg><use xlink:href="#bento-svg-spritesheet-star" /></svg>
<svg><use xlink:href="#bento-svg-spritesheet-star" /></svg>
`})}),`
`,(0,_.jsx)(t.p,{children:(0,_.jsx)(t.strong,{children:`Performance Benefits:`})}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Reduced DOM Size`}),`: Path data stored once instead of duplicated`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Lower Memory Usage`}),`: Especially beneficial with many repeated icons`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Faster Rendering`}),`: Browser optimizations for `,(0,_.jsx)(t.code,{children:`<use>`}),` elements`]}),`
`]}),`
`,(0,_.jsx)(t.p,{children:(0,_.jsx)(t.strong,{children:`Trade-offs:`})}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`SSR Limitation`}),`: Sprite references render empty until client-side hydration`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Initial Flash`}),`: Brief moment where icons appear/disappear during sprite injection`]}),`
`]}),`
`,(0,_.jsx)(t.h3,{id:`recommendations`,children:`Recommendations`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Use default mode`}),` for SSR applications or when icons appear infrequently`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Use sprite mode`}),` when the same icons appear many times (navigation, lists, tables)`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Consider preloading`}),` frequently used icons to reduce loading delays`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Provide fallback content`}),` for critical icons to handle loading states`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,_.jsx)(t.h3,{id:`icon-not-loading`,children:`Icon Not Loading`}),`
`,(0,_.jsx)(t.p,{children:`If an icon fails to load:`}),`
`,(0,_.jsxs)(t.ol,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Check icon name`}),`: Ensure the icon exists in the CDN`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Network connectivity`}),`: Verify CDN is accessible`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Check browser console`}),`: Look for network errors`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Fallback content`}),`: Provide placeholder content for loading states`]}),`
`]}),`
`,(0,_.jsx)(t.h3,{id:`performance-issues`,children:`Performance Issues`}),`
`,(0,_.jsx)(t.p,{children:`For performance optimization:`}),`
`,(0,_.jsxs)(t.ol,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Preload common icons`}),`: Consider preloading frequently used icons`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Use sprite mode`}),`: For repeated icons, consider sprite mode which consolidates multiple icons into a single SVG sprite sheet, reducing DOM size and improving performance when the same icon appears multiple times`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.strong,{children:`Minimize icon sets`}),`: Only load icons that are actually used`]}),`
`]})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),d(),m()}))();export{g as default};