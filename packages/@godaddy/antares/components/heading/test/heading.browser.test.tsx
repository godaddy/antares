import assume from 'assume';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Heading', function headingTests() {
    it('renders heading levels', async function rendersLevels() {
      const { locator } = await render(<DefaultExample />);

      assume(locator.getByRole('heading', { level: 1, name: 'Heading level 1' }).element()).exists();
      assume(locator.getByRole('heading', { level: 2, name: 'Heading level 2' }).element()).exists();
      assume(locator.getByRole('heading', { level: 3, name: 'Heading level 3' }).element()).exists();
    });

    it('sizes a heading independently of its level', async function sizes() {
      const { getByRole } = await render(<SizesExample />);
      const size = (name: string) => getComputedStyle(getByRole('heading', { name }).element()).fontSize;

      expect(size('Level 2, 2xl')).toEqual('36px');
      expect(size('Level 2, sm')).toEqual('18px');
      expect(size('Level 4, xl')).toEqual('30px');
      expect(size('Level 4, default tier')).toEqual('20px');
    });
  });
});
