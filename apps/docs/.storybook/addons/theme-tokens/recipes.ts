/// <reference types="vite/client" />
import legacyCss from '../../legacy-tokens.css?inline';
import nextgenCss from '../../../../../packages/@godaddy/antares/variables.css?inline';

const legacy = makeSheet(legacyCss);
const nextgen = makeSheet(nextgenCss);

/**
 * Theme catalog. Each key becomes one entry in the toolbar; the value
 * lists the sheets to apply, in cascade order (later wins for
 * colliding `:root` custom properties).
 *
 * `Both` puts Nextgen last to mirror production layering.
 */
export const RECIPES = {
  Legacy: [legacy],
  Nextgen: [nextgen],
  Both: [legacy, nextgen],
  None: []
} as const satisfies Record<string, readonly CSSStyleSheet[]>;

/** Constructs a `CSSStyleSheet` synchronously from a raw CSS string. */
function makeSheet(css: string): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}
