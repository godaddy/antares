import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';
import { DetailExample } from '../examples/detail.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Text', function textTests() {
    it('renders extra classes', async function rendersExtraClasses() {
      const { container } = await render(<DefaultExample className="extra-classes" />);
      expect(container.outerHTML).toContain('extra-classes');
    });

    it('uses the md body tier outside a scope unless a size is set', async function sizes() {
      const { getByText } = await render(<SizesExample />);
      const size = (text: string) => getComputedStyle(getByText(text).element()).fontSize;

      expect(size('Default')).toEqual('16px');
      expect(size('Extra small')).toEqual('12px');
      expect(size('Medium')).toEqual('16px');
      expect(size('2x large')).toEqual('24px');
    });

    it('changes only the color with emphasis', async function emphasis() {
      const { getByText, container } = await render(<EmphasisExample />);
      const critical = getComputedStyle(getByText('Payment failed').element());

      expect(critical.color).not.toEqual(getComputedStyle(container).color);
      expect(critical.fontSize).toEqual(getComputedStyle(container).fontSize);
    });

    it('applies the detail role to Detail', async function detail() {
      const { getByText } = await render(<DetailExample />);

      expect(getComputedStyle(getByText('Updated 2 hours ago').element()).fontSize).toEqual('13px');
    });
  });
});
