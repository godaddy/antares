import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(async function reset() {
    // `page.viewport` persists across tests, so reset it for every one.
    await page.viewport(414, 896);
    await resetHover();
  });

  describe('#Alert', function alertTests() {
    it.each([
      ['default', <DefaultExample />],
      ['emphases', <EmphasesExample />],
      ['dismissible', <DismissibleExample />],
      ['with-action', <WithActionExample />],
      ['composition', <CompositionExample />],
      ['narrow', <PlaygroundExample width={320} showAction dismissible />],
      ['narrow-rtl', <PlaygroundExample width={320} dir="rtl" showAction dismissible />]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);
      await expect(container).toMatchScreenshot(name);
    });

    it('wide example', async function wideScreenshot() {
      await page.viewport(900, 400);
      const { container } = await render(<PlaygroundExample width={640} showAction dismissible />);
      await expect(container).toMatchScreenshot('wide');
    });
  });
});
