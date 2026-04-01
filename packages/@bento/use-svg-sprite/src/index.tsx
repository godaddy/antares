import { useEffect, useMemo, useContext, type ReactElement } from 'react';
import { Box, type BoxContext } from '@bento/box';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

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

/**
 * React hook that introduces SVG illustrations to a sprite sheet. The hook
 * creates a new symbol element for the provided illustration and adds it to the
 * sprite sheet. The hook returns a React element that references the newly
 * added symbol.
 *
 * @param name - The name of the SVG that should be added to the SVG sprite sheet.
 * @param [Graphic] - The component that renders the SVG content for the sprite sheet.
 * @returns A React element containing the SVG use reference or null if no component is provided.
 * @public
 */
export function useSVGSprite(name: string, Graphic: ReactElement | undefined): ReactElement | null {
  const { env } = useContext<BoxContext<Record<string, any>>>(Box);
  const id = `${root}-${name}`;

  useEffect(
    function populate() {
      const sheet = sprite(root);
      const exists = sheet.querySelector(`symbol[data-symbol="${name}"]`);

      if (exists || !Graphic) return;

      const target = document.createElement('div');
      const container = createRoot(target);
      const props = Graphic.props;

      //
      // We want to render the SVG Component to a string so we can inject it
      // into the sprite sheet. The `renderToString` API is not available in
      // `react-dom/client` bundle so we're using a workaround to render the
      // component to a detached DOM node. This approach has a few caveats:
      //
      // 1. We're not allowed to render when React is already rendering, so we
      //    need to defer the rendering to the next tick to prevent race
      //    conditions.
      // 2. The `render` API queues the render update, so we need to flush the
      //    update synchronously so we can reliably extract the rendered SVG
      //    content.
      //
      // Given that the hook already renders the `<use>` element, it okay to
      // _slightly_ delay the injection of the symbol into the sprite sheet as
      // the browser would automatically paint icons once it's available.
      //
      queueMicrotask(function delay() {
        flushSync(() => container.render(Graphic));
        sheet.innerHTML += `<symbol id="${id}" data-symbol="${name}" viewBox="${(props as any)?.viewBox}">${target.innerHTML}</symbol>`;
        container.unmount();
      });
    },
    [name, Graphic]
  );

  return useMemo(
    function useReference() {
      return (
        <svg
          viewBox={(Graphic?.props as any)?.viewBox}
          xmlns={namespace}
          width={(Graphic?.props as any)?.width}
          height={(Graphic?.props as any)?.height}
        >
          <use xlinkHref={`${env.sprite}#${id}`} fill="currentColor" />
        </svg>
      );
    },
    [Graphic, id]
  );
}
