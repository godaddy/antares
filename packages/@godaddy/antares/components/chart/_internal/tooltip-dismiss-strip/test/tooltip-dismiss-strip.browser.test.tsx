import assume from 'assume';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { BasicExample } from '../examples/basic.tsx';

function getStrip(container: HTMLElement) {
  return container.querySelector('[data-tooltip-dismiss-strip]') as HTMLDivElement;
}

describe('@godaddy/antares', function antares() {
  describe('#TooltipDismissStrip', function tooltipDismissStripTests() {
    describe('#basic', function basicTests() {
      it('omits strip in DOM when width is zero', async function zeroWidth() {
        const { container } = await render(<BasicExample width={0} />);

        expect(getStrip(container)).toBeNull();
      });

      it('renders dismiss strip and closes tooltip on pointerenter', async function dismissOnEnter() {
        const { container } = await render(<BasicExample />);

        const strip = getStrip(container);
        assume(strip).exists();

        const openButton = container.querySelector('button');
        assume(openButton).exists();
        await userEvent.click(openButton as HTMLButtonElement);

        await vi.waitUntil(function tooltipWasOpened() {
          return container.querySelector('[data-open-state="true"]') != null;
        });

        strip.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, cancelable: true }));

        await vi.waitUntil(function tooltipWasClosed() {
          return container.querySelector('[data-open-state="false"]') != null;
        });
      });
    });
  });
});
