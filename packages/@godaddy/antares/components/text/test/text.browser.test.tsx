import { TreatmentsExample } from '../examples/treatments.tsx';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Text', function textTests() {
    it('renders fixed role ramps, semantic emphasis, and feedback colors', async function treatments() {
      const { getByText } = await render(<TreatmentsExample />);
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const ramps = {
        Body: [12, 14, 16, 18, 20, 24],
        Detail: [11, 12, 13, 14, 16, 18],
        Heading: [16, 18, 20, 24, 30, 36],
        Label: [11, 12, 14, 16, 18, 20]
      };
      for (const [role, ramp] of Object.entries(ramps)) {
        sizes.forEach(function checkTier(size, index) {
          const element = getByText(`${role} ${size}`, { exact: true }).element();
          expect(getComputedStyle(element).fontSize).toBe(`${ramp[index]}px`);
        });
      }
      expect(getComputedStyle(getByText('Strong body').element()).fontWeight).toBe('700');
      expect(getComputedStyle(getByText('Emphasized detail').element()).fontStyle).toBe('italic');
      expect(getComputedStyle(getByText('Body md', { exact: true }).element()).color).toBe(
        getComputedStyle(getByText('Detail md', { exact: true }).element()).color
      );
      expect(getComputedStyle(getByText('critical', { exact: true }).element()).color).not.toBe(
        getComputedStyle(getByText('neutral', { exact: true }).element()).color
      );
    });
    it('renders extra classes', async function rendersExtraClasses() {
      const { container } = await render(<DefaultExample className="extra-classes" />);
      expect(container.outerHTML).toContain('extra-classes');
    });
  });
});
