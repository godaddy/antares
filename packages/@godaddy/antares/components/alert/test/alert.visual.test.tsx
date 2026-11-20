import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { CustomRegionsExample } from '../examples/custom-regions.tsx';
import { InteriorExample } from '../examples/interior.tsx';
import { InModalExample } from '../examples/in-modal.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';

async function settle() {
  await new Promise(function wait(resolve) {
    setTimeout(resolve, 400);
  });
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Alert', function alertTests() {
    it.each([
      ['default', <DefaultExample />],
      ['emphases', <EmphasesExample />],
      ['dismissible', <DismissibleExample />],
      ['with-action', <WithActionExample />],
      ['composition', <CompositionExample />],
      ['custom-regions', <CustomRegionsExample />],
      ['interior', <InteriorExample />]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);
      await expect(container).toMatchScreenshot(name);
    });

    it('renders the nested modal composition', async function inModalExample() {
      await render(<InModalExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open alert dialog' }));
      const dialog = await page.getByRole('dialog').element();
      await settle();
      const overlay = dialog.parentElement?.parentElement;
      if (!overlay) throw new Error('Expected modal overlay to exist');
      await expect(overlay as HTMLElement).toMatchScreenshot('in-modal');
    });

    it.each([320, 419, 420, 640])('renders composed actions at width %s', async function responsiveExample(width) {
      const { container } = await render(<PlaygroundExample width={width} showAction dismissible />);
      await expect(container).toMatchScreenshot(`actions-${width}`);
    });

    it('renders narrow RTL content', async function rtlExample() {
      const { container } = await render(<PlaygroundExample width={320} dir="rtl" showAction dismissible />);
      await expect(container).toMatchScreenshot('actions-rtl');
    });

    it('wraps a long title beside the close column', async function longTitle() {
      const { container } = await render(
        <PlaygroundExample
          width={320}
          title="Your payment method expires soon. Update it to keep your services running."
          showAction
          dismissible
        />
      );
      await expect(container).toMatchScreenshot('long-title');
    });

    it('renders custom regions without an icon or close control', async function omittedRegions() {
      const { container } = await render(
        <CustomRegionsExample width={320} showIcon={false} initiallyDismissible={false} />
      );
      await expect(container).toMatchScreenshot('custom-regions-omitted');
    });
  });
});
