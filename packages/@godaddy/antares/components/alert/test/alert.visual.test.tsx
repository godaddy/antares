import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';
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
      ['narrow', <PlaygroundExample width={320} showAction dismissible />]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);
      await expect(container).toMatchScreenshot(name);
    });
  });
});
