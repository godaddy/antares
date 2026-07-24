/** CDN host that serves the icons. */
export const CDN = 'https://img6.wsimg.com/ux-assets';

/** Package path the icons are served from. */
export const ICON_PACKAGE = '@ux/icon';

/**
 * Version of the design assets package used in the CDN path.
 * This must stay in sync with the icon package, which shares the same source
 * files and deploys them to the CDN. Currently hardcoded until the design
 * assets package is available as a dependency.
 */
export const DESIGN_ASSETS_VERSION = '5.0.0';
