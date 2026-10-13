import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { MultipleExample } from '../examples/multiple.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { FormStepsExample } from '../examples/form-steps.tsx';
import { NestedExample } from '../examples/nested.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Accordion', function accordionTests() {
    it.each([
      ['default', <DefaultExample />],
      ['multiple', <MultipleExample />],
      ['controlled', <ControlledExample />],
      ['disabled', <DisabledExample />],
      ['form-steps', <FormStepsExample />],
      ['nested', <NestedExample />]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);

      await expect(container).toMatchScreenshot(name);
    });
  });
});
