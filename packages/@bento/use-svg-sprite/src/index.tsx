import { useCallback, useEffect, useMemo, useContext, useState, type ReactElement, type SVGProps } from 'react';
import { Box, type BoxContext } from '@bento/box';
import { createPortal } from 'react-dom';

/**
 * This is the id of the sprite container that holds all the symbols.
 *
 * @constant {string} root - The root ID for the SVG sprite sheet.
 */
export const root = 'bento-svg-spritesheet';

/**
 * The XML namespace for SVG elements.
 * This constant is used to define the namespace URI for SVG elements,
 * ensuring that they are correctly interpreted by the browser.
 *
 * @constant {string} namespace - The SVG namespace URI.
 */
const namespace = 'http://www.w3.org/2000/svg';

/**
 * Retrieves an existing SVG sprite element by its ID or creates a new one if it
 * doesn't exist. The created SVG element is hidden from view by setting its
 * display style to 'none'.
 *
 * @param id - The ID of the SVG element to retrieve or create.
 * @returns The existing or newly created SVG element.
 * @private
 */
function sprite(id: string): SVGSVGElement {
  let sprite = document.getElementById(id) as unknown as SVGSVGElement;

  if (!sprite) {
    sprite = document.createElementNS(namespace, 'svg') as SVGSVGElement;
    sprite.style.display = 'none';
    sprite.id = id;

    document?.body?.appendChild(sprite);
  }

  return sprite;
}

function SpriteRegistration({ children, register }: { children: ReactElement; register: () => void }) {
  useEffect(register, [register]);
  return children;
}

/**
 * React hook that introduces SVG illustrations to a sprite sheet. The hook
 * creates a new symbol element for the provided illustration and adds it to the
 * sprite sheet. The hook returns a React element that references the newly
 * added symbol. Render the returned SVG to register its symbol.
 *
 * @param name - The name of the SVG that should be added to the SVG sprite sheet.
 * @param [Graphic] - The component that renders the SVG content for the sprite sheet.
 * @returns A React element containing the SVG use reference or null if no component is provided.
 * @public
 */
export function useSVGSprite(name: string, Graphic: ReactElement | undefined): ReactElement | null {
  const { env } = useContext<BoxContext<Record<string, any>>>(Box);
  const id = `${root}-${name}`;

  const props = Graphic?.props as SVGProps<SVGSVGElement> | undefined;
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(
    function prepare() {
      sprite(root);
      if (!Graphic || document.getElementById(id)) {
        setTarget(null);
        return;
      }

      setTarget((target) => target ?? document.createElement('div'));
    },
    [id, Graphic]
  );

  const populate = useCallback(
    function populate() {
      if (!target || !Graphic) return;

      const sheet = sprite(root);
      if (!document.getElementById(id)) {
        const symbol = document.createElementNS(namespace, 'symbol');
        symbol.id = id;
        symbol.setAttribute('data-symbol', name);
        if (props?.viewBox) symbol.setAttribute('viewBox', props.viewBox);

        // Keep a static copy after React removes the temporary portal.
        for (const child of target.childNodes) symbol.appendChild(child.cloneNode(true));
        sheet.appendChild(symbol);
      }

      setTarget(null);
    },
    [target, id, name, props?.viewBox, Graphic]
  );

  // Use a portal so sprite registration does not require react-dom/client in remote hosts.
  return useMemo(
    function useReference() {
      return (
        <svg viewBox={props?.viewBox} xmlns={namespace} width={props?.width} height={props?.height}>
          <use xlinkHref={`${env.sprite}#${id}`} fill="currentColor" />
          {target && Graphic
            ? createPortal(<SpriteRegistration register={populate}>{Graphic}</SpriteRegistration>, target)
            : null}
        </svg>
      );
    },
    [Graphic, id, target, env.sprite, props, populate]
  );
}
