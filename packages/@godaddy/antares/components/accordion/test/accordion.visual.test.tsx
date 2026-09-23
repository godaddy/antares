import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { MultipleExample } from '../examples/multiple.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { FormStepsExample } from '../examples/form-steps.tsx';
import { CompositionExample } from '../examples/composition.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);
  beforeEach(async function resetViewport() {
    await page.viewport(800, 1000);
  });

  describe('#Accordion', function accordionTests() {
    it.each([
      ['default-open', <DefaultExample />],
      ['all-collapsed', <DefaultExample defaultExpandedKeys={[]} />],
      ['multiple-open', <MultipleExample />],
      ['disabled-item', <DisabledExample />],
      ['disabled-group', <DisabledExample isGroupDisabled />],
      ['form-steps', <FormStepsExample />],
      ['composition-boundary', <CompositionExample />],
      [
        'functional-trigger',
        <CompositionExample
          triggerProps={{
            className: function triggerClass() {
              return 'custom-trigger-function';
            },
            style: function triggerStyle() {
              return { textDecoration: 'underline' };
            }
          }}
        />
      ]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);

      await expect(container).toMatchScreenshot(name);
    });
  });
});
