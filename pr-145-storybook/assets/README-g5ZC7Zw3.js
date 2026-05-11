import{j as n}from"./iframe-B7T5JP5V.js";import{useMDXComponents as o}from"./index-DePaf8Jy.js";import{M as r,A as t,a as c,S as l}from"./blocks-Bk7QREwH.js";import{S as a,P as d,I as h}from"./icon.stories-BRDRskUT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BYgYdQsS.js";import"./index-CAEJ_Xno.js";import"./index-BdAGSb15.js";import"./index-DJiIj1IV.js";import"./index-Df5-bfyk.js";import"./index-Bwgt-6b6.js";import"./slots-B9LmtyAi.js";import"./index-WqDfzGyf.js";import"./index-CLj43KZG.js";import"./index-D2F0R-3K.js";import"./mergeProps-0UgpPvdG.js";import"./SSRProvider-CjHoC05b.js";import"./clsx-B-dksMZM.js";import"./index-CdSrwnD_.js";import"./create-external-store-TtP3UJpK.js";import"./index-B8f6_Ihb.js";import"./client-CtN9lC1q.js";import"./index-CgnGW5p0.js";import"./index-BtlUOAdW.js";const p=`import { Icon, type IconProps } from '@godaddy/antares';

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
`;function i(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{of:a,name:"Overview"}),`
`,n.jsx(e.h1,{id:"icon",children:"Icon"}),`
`,n.jsx(e.p,{children:"Flexible SVG icon component with on-demand loading, automatic caching, and extensive customization options"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"Icon"})," component provides a flexible and performant way to display SVG icons with extensive customization options. Built on top of the Bento Icon system, it features on-demand loading from a CDN, automatic caching, and enhanced props for the Antares design system."]}),`
`,n.jsx(e.h2,{id:"features",children:"Features"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"On-demand loading"}),": Icons are loaded asynchronously from CDN only when needed"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Automatic caching"}),": Once loaded, icons are cached for optimal performance"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Flexible sizing"}),": Support for ",n.jsx(e.code,{children:"width"})," and ",n.jsx(e.code,{children:"height"})," props"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Color inheritance"}),": Uses ",n.jsx(e.code,{children:"currentColor"})," by default for seamless theme integration"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Accessibility ready"}),": Built-in support for screen readers and keyboard navigation"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"TypeScript support"}),": Fully typed with comprehensive prop interfaces"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Bento integration"}),": Extends Bento Icon with additional Antares-specific features"]}),`
`]}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,n.jsx(e.h2,{id:"props",children:"Props"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"Icon"})," component accepts the following props:"]}),`
`,n.jsx(t,{of:d}),`
`,n.jsx(e.h3,{id:"prop-inheritance",children:"Prop Inheritance"}),`
`,n.jsxs(e.p,{children:["The component extends ",n.jsx(e.code,{children:"BentoIconProps"})," and passes through all standard HTML attributes and accessibility props to the underlying Bento Icon component. This includes:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Accessibility"}),": ",n.jsx(e.code,{children:"aria-label"}),", ",n.jsx(e.code,{children:"aria-describedby"}),", ",n.jsx(e.code,{children:"role"}),", ",n.jsx(e.code,{children:"title"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Events"}),": ",n.jsx(e.code,{children:"onClick"}),", ",n.jsx(e.code,{children:"onMouseOver"}),", ",n.jsx(e.code,{children:"onFocus"}),", etc."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Styling"}),": ",n.jsx(e.code,{children:"className"}),", ",n.jsx(e.code,{children:"style"}),", ",n.jsx(e.code,{children:"data-*"})," attributes"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Transform"}),": ",n.jsx(e.code,{children:"rotate"}),", ",n.jsx(e.code,{children:"flip"})," for icon transformations"]}),`
`]}),`
`,n.jsx(e.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(c,{of:h,inline:!0}),`
`,n.jsx(l,{language:"tsx",code:p}),`
`,n.jsx(e.h2,{id:"size-variants",children:"Size Variants"}),`
`,n.jsx(e.p,{children:"Specify explicit width and height values:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star" width={24} height={24} />
`})}),`
`,n.jsx(e.p,{children:"You can use different values for width and height:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star" width={32} height={16} />
`})}),`
`,n.jsx(e.h2,{id:"customization",children:"Customization"}),`
`,n.jsx(e.h3,{id:"slots",children:"Slots"}),`
`,n.jsx(e.p,{children:"The Icon component uses Bento's slot system with the following component hierarchy and available slot override points:"}),`
`,n.jsx(e.h4,{id:"component-hierarchy",children:"Component Hierarchy"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-text",children:`Icon (registered as "Icon")
└── BentoIcon (registered as "BentoIcon", slot="icon")
    └── BentoIllustration (registered as "BentoIllustration", slot="content")
`})}),`
`,n.jsx(e.h4,{id:"available-slot-overrides",children:"Available Slot Overrides"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"icon"})}),": Overrides the entire BentoIcon component - affects icon loading, caching, sprite/SVG mode switching, data attributes, and the overall icon wrapper"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"icon.content"})}),": Overrides the BentoIllustration component - affects SVG transformations (rotate, flip), accessibility attributes (",n.jsx(e.code,{children:"role"}),", ",n.jsx(e.code,{children:"focusable"}),", ",n.jsx(e.code,{children:"aria-labelledby"}),"), viewBox calculations, and final SVG element rendering"]}),`
`]}),`
`,n.jsxs(e.p,{children:["For complete slot override patterns and examples, see the ",n.jsx(e.code,{children:"@bento/slots"})," package documentation."]}),`
`,n.jsx(e.h3,{id:"custom-icons",children:"Custom Icons"}),`
`,n.jsx(e.p,{children:"While the Icon component loads design system approved icons from the CDN by default, teams can introduce custom icons using the underlying Bento Icon system."}),`
`,n.jsx(e.h4,{id:"adding-icons-synchronously",children:"Adding Icons Synchronously"}),`
`,n.jsxs(e.p,{children:["Use the ",n.jsx(e.code,{children:"set"})," method to add custom icons that are available immediately:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`import { Icon, set, parser } from '@godaddy/antares';

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
`,n.jsx(e.h4,{id:"adding-icons-asynchronously",children:"Adding Icons Asynchronously"}),`
`,n.jsxs(e.p,{children:["Use the ",n.jsx(e.code,{children:"ondemand"})," method to load custom icons from your own sources:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`import { Icon, ondemand, parser } from '@godaddy/antares';

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
`,n.jsx(e.h4,{id:"custom-icon-apis",children:"Custom Icon APIs"}),`
`,n.jsxs(e.p,{children:["The following methods are exported from ",n.jsx(e.code,{children:"@godaddy/antares"})," for custom icon management:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"set(icons)"})}),": Synchronously add icons to the store"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"ondemand(loader)"})}),": Register an asynchronous icon loader (returns unregister function)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"parser(svgString)"})}),": Parse SVG strings into React elements"]}),`
`]}),`
`,n.jsxs(e.p,{children:["These are re-exports of the underlying Bento Icon system methods. For complete API documentation, advanced usage patterns, and implementation details, see the ",n.jsx(e.code,{children:"@bento/icon"})," and ",n.jsx(e.code,{children:"@bento/svg-parser"})," package documentation."]}),`
`,n.jsx(e.h4,{id:"notes",children:"Notes"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Custom icons integrate seamlessly with all Icon component features (transformations, accessibility, sprite mode, etc.)"}),`
`,n.jsxs(e.li,{children:["Multiple ",n.jsx(e.code,{children:"ondemand"})," loaders can be registered and will be called in order until one returns content"]}),`
`,n.jsxs(e.li,{children:["Use the ",n.jsx(e.code,{children:"parser"})," function to convert SVG strings to React elements"]}),`
`,n.jsx(e.li,{children:"Custom icons are cached automatically just like CDN icons"}),`
`]}),`
`,n.jsx(e.h3,{id:"styling",children:"Styling"}),`
`,n.jsx(e.h4,{id:"css-classes",children:"CSS Classes"}),`
`,n.jsxs(e.p,{children:["The component accepts standard ",n.jsx(e.code,{children:"className"})," and ",n.jsx(e.code,{children:"style"})," props:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star" className="my-icon" style={{ margin: '10px' }} />
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Important"}),": When you supply a ",n.jsx(e.code,{children:"className"}),", you make a commitment to take over all styling of the component as it will remove the standard class names. Use data attributes for targeted styling instead."]}),`
`,n.jsx(e.h4,{id:"data-attributes",children:"Data Attributes"}),`
`,n.jsx(e.p,{children:"The component automatically adds data attributes for styling hooks:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"data-icon"}),": The icon name (always present)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"data-color"}),": Applied when color prop is set"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"data-loading"}),": Applied during icon loading from CDN"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"data-mode"}),': Applied when mode prop is set (e.g., "sprite")']}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"data-flip"}),': Applied when flip prop is set ("horizontal" or "vertical")']}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"data-rotate"}),": Applied when rotate prop is set (90, 180, or 270)"]}),`
`]}),`
`,n.jsx(e.p,{children:"The component also includes accessibility attributes:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'role="presentation"'}),": For decorative icons"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'role="img"'}),": When title prop is provided"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'focusable="false"'}),": Prevents keyboard focus"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* Style by icon name */
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
`,n.jsx(e.h2,{id:"color-customization",children:"Color Customization"}),`
`,n.jsx(e.h3,{id:"inherit-from-parent-default",children:"Inherit from Parent (Default)"}),`
`,n.jsxs(e.p,{children:["By default, icons inherit the color from their parent element via ",n.jsx(e.code,{children:"currentColor"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<div style={{ color: 'blue' }}>
  <Icon icon="star" /> {/* Will be blue */}
</div>
`})}),`
`,n.jsx(e.h3,{id:"explicit-colors",children:"Explicit Colors"}),`
`,n.jsx(e.p,{children:"Override the color with specific values:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star" color="#ff6b35" />          // Hex color
<Icon icon="star" color="rgb(255, 107, 53)" /> // RGB color
<Icon icon="star" color="var(--primary-color)" /> // CSS variable
<Icon icon="star" color="currentColor" />     // Explicit inheritance
`})}),`
`,n.jsx(e.h2,{id:"icon-transformations",children:"Icon Transformations"}),`
`,n.jsxs(e.p,{children:["Transform capabilities are inherited from the Bento Illustration component. For complete transformation options and implementation details, see the ",n.jsx(e.code,{children:"@bento/illustration"})," package documentation."]}),`
`,n.jsx(e.h3,{id:"rotation",children:"Rotation"}),`
`,n.jsx(e.p,{children:"Rotate icons by 90-degree increments:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="arrow" rotate={90} />   // 90 degrees
<Icon icon="arrow" rotate={180} />  // 180 degrees
<Icon icon="arrow" rotate={270} />  // 270 degrees
`})}),`
`,n.jsx(e.h3,{id:"flipping",children:"Flipping"}),`
`,n.jsx(e.p,{children:"Flip icons horizontally or vertically:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="arrow" flip="horizontal" />
<Icon icon="arrow" flip="vertical" />
`})}),`
`,n.jsx(e.h2,{id:"loading-states",children:"Loading States"}),`
`,n.jsx(e.h3,{id:"placeholder-content",children:"Placeholder Content"}),`
`,n.jsx(e.p,{children:"Provide fallback SVG content while icons load from the CDN:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3" />
  </svg>
</Icon>
`})}),`
`,n.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,n.jsx(e.h3,{id:"decorative-icons",children:"Decorative Icons"}),`
`,n.jsxs(e.p,{children:["For purely decorative icons, no additional attributes are needed. The icon will have ",n.jsx(e.code,{children:'role="presentation"'})," and be ignored by screen readers:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star" /> {/* Decorative, screen readers will ignore */}
`})}),`
`,n.jsx(e.h3,{id:"semantic-icons",children:"Semantic Icons"}),`
`,n.jsxs(e.p,{children:["For icons that convey meaning, use the ",n.jsx(e.code,{children:"title"})," prop. This automatically adds ",n.jsx(e.code,{children:'role="img"'})," and provides screen reader accessible text:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`{/* Semantic icon - use title prop */}
<Icon icon="star" title="Favorite item" />

{/* Warning icon with semantic meaning */}
<Icon icon="alert" title="Warning: Your session will expire soon" />

{/* Status indicator with meaning */}
<Icon icon="check-circle" title="Task completed successfully" />
`})}),`
`,n.jsx(e.h3,{id:"interactive-icons",children:"Interactive Icons"}),`
`,n.jsxs(e.p,{children:["For interactive icons within buttons or links, use the ",n.jsx(e.code,{children:"title"})," prop on the icon and ",n.jsx(e.code,{children:"aria-label"})," on the interactive element:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`{/* Button with icon - label the button, not the icon */}
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
`,n.jsx(e.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,n.jsx(e.h3,{id:"default-icon-loading",children:"Default Icon Loading"}),`
`,n.jsx(e.p,{children:"Icons are loaded on-demand from a CDN using the following process:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"First Request"}),": When an icon is first encountered, it triggers an asynchronous fetch from the CDN"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"SVG Parsing"}),": The fetched SVG string is parsed into a React element using ",n.jsx(e.code,{children:"@bento/svg-parser"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Automatic Caching"}),": Once loaded, the icon is cached in memory to avoid subsequent network requests"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Full SVG Rendering"}),": Each icon instance renders as a complete SVG element with all path data"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`// Each icon renders as a full SVG element
<Icon icon="star" />  // <svg><path d="M3 22v-20l18 10-18 10z" /></svg>
<Icon icon="star" />  // <svg><path d="M3 22v-20l18 10-18 10z" /></svg>
<Icon icon="star" />  // <svg><path d="M3 22v-20l18 10-18 10z" /></svg>
`})}),`
`,n.jsx(e.p,{children:"This approach works well for SSR and small numbers of icons, but can lead to DOM bloat when the same icon appears many times."}),`
`,n.jsx(e.h3,{id:"sprite-mode-optimization",children:"Sprite Mode Optimization"}),`
`,n.jsxs(e.p,{children:["When ",n.jsx(e.code,{children:'mode="sprite"'})," is enabled, the component switches to a more efficient rendering strategy:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Icon icon="star" mode="sprite" />
<Icon icon="star" mode="sprite" />
<Icon icon="star" mode="sprite" />
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"What happens with sprite mode:"})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Sprite Sheet Creation"}),": A hidden SVG sprite sheet is automatically injected into the DOM containing symbol definitions"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Reference Rendering"}),": Each icon renders as a lightweight ",n.jsx(e.code,{children:"<use>"})," element that references the sprite"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Deduplication"}),": Icon path data only exists once in the sprite sheet, regardless of how many times it's used"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Client-Side Hydration"}),": The sprite sheet is generated and injected after hydration, causing a brief paint event"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"DOM Output:"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Hidden sprite sheet (created automatically) -->
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
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Performance Benefits:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Reduced DOM Size"}),": Path data stored once instead of duplicated"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Lower Memory Usage"}),": Especially beneficial with many repeated icons"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Faster Rendering"}),": Browser optimizations for ",n.jsx(e.code,{children:"<use>"})," elements"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Trade-offs:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"SSR Limitation"}),": Sprite references render empty until client-side hydration"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Initial Flash"}),": Brief moment where icons appear/disappear during sprite injection"]}),`
`]}),`
`,n.jsx(e.h3,{id:"recommendations",children:"Recommendations"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use default mode"})," for SSR applications or when icons appear infrequently"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use sprite mode"})," when the same icons appear many times (navigation, lists, tables)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Consider preloading"})," frequently used icons to reduce loading delays"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Provide fallback content"})," for critical icons to handle loading states"]}),`
`]}),`
`,n.jsx(e.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,n.jsx(e.h3,{id:"icon-not-loading",children:"Icon Not Loading"}),`
`,n.jsx(e.p,{children:"If an icon fails to load:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Check icon name"}),": Ensure the icon exists in the CDN"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Network connectivity"}),": Verify CDN is accessible"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Check browser console"}),": Look for network errors"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Fallback content"}),": Provide placeholder content for loading states"]}),`
`]}),`
`,n.jsx(e.h3,{id:"performance-issues",children:"Performance Issues"}),`
`,n.jsx(e.p,{children:"For performance optimization:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Preload common icons"}),": Consider preloading frequently used icons"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use sprite mode"}),": For repeated icons, consider sprite mode which consolidates multiple icons into a single SVG sprite sheet, reducing DOM size and improving performance when the same icon appears multiple times"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Minimize icon sets"}),": Only load icons that are actually used"]}),`
`]})]})}function G(s={}){const{wrapper:e}={...o(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{G as default};
