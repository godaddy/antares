/**
 * Build-time loader that prepends a `'use client'` directive to component
 * example modules for the docs site's RSC build.
 *
 * Examples render Antares components (whose implementation reaches client-only
 * React APIs), and the site imports each example into a React Server Component.
 * Rather than requiring every example file to carry a `'use client'` directive
 * (noise that would also leak into the displayed `<Source>` snippet), this
 * loader injects the client boundary at build time so the source files stay
 * clean. Storybook needs no equivalent - it runs entirely on the client.
 *
 * @param {string} source - The original module source.
 * @returns {string} The source with a leading `'use client'` directive.
 */
module.exports = function useClientLoader(source) {
  if (/^\s*(['"])use client\1/.test(source)) return source;
  return `'use client';\n${source}`;
};
