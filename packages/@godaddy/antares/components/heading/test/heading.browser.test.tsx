import assume from 'assume';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { HeadingContextExample } from '../examples/heading-context.tsx';
import { HeadingWeightExample } from '../examples/heading-weight.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Heading', function headingTests() {
    it('renders heading levels', async function rendersLevels() {
      const { locator } = await render(<DefaultExample />);

      assume(locator.getByRole('heading', { level: 1, name: 'Heading level 1' }).element()).exists();
      assume(locator.getByRole('heading', { level: 2, name: 'Heading level 2' }).element()).exists();
      assume(locator.getByRole('heading', { level: 3, name: 'Heading level 3' }).element()).exists();
    });

    it('takes the level a container provides', async function containerLevel() {
      const { getByRole } = await render(<HeadingContextExample />);
      await expect.element(getByRole('heading', { level: 2, name: 'Container level' })).toBeVisible();
    });

    it('lets an explicit level win over the container', async function explicitLevel() {
      const { getByRole } = await render(<HeadingContextExample />);
      await expect.element(getByRole('heading', { level: 5, name: 'Explicit level' })).toBeVisible();
    });

    it('keeps its default level when the container provides none', async function defaultLevel() {
      const { getByRole } = await render(<HeadingContextExample />);
      await expect.element(getByRole('heading', { level: 3, name: 'Default level' })).toBeVisible();
    });

    it('takes its weight from the heading ramp', async function headingWeight() {
      const { getByRole } = await render(<HeadingWeightExample />);

      // A relative `bolder` would resolve to 700 and ignore the theme.
      expect(getComputedStyle(getByRole('heading').element()).fontWeight).toEqual('500');
    });
  });
});
