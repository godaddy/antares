import type { CSSProperties } from 'react';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Heading } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { HeadingContextExample } from '../examples/heading-context.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Text', function textTests() {
    it('renders extra classes', async function rendersExtraClasses() {
      const { container } = await render(<DefaultExample className="extra-classes" />);
      expect(container.outerHTML).toContain('extra-classes');
    });
  });

  describe('#Heading', function headingTests() {
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
      const { getByRole } = await render(
        <div style={{ '--font-heading-weight': '500' } as CSSProperties}>
          <Heading>Themed weight</Heading>
        </div>
      );

      // A relative `bolder` would resolve to 700 and ignore the theme.
      expect(getComputedStyle(getByRole('heading').element()).fontWeight).toEqual('500');
    });
  });
});
