/// <reference types="vite/client" />
import legacyCss from '../../legacy-tokens.css?inline';

const legacy = makeSheet(legacyCss);

/**
 * Theme catalog. Each key becomes one entry in the toolbar; the value
 * lists the sheets to apply, in cascade order (later wins for
 * colliding `:root` custom properties).
 */
export const RECIPES = {
  Legacy: [legacy],
  None: []
} as const satisfies Record<string, readonly CSSStyleSheet[]>;

/** Constructs a `CSSStyleSheet` synchronously from a raw CSS string. */
function makeSheet(css: string): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}
