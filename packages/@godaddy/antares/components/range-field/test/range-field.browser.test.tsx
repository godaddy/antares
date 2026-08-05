import assume from 'assume';
import type { RangeFieldRef } from '@godaddy/antares';
import { createRef } from 'react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { PlaygroundExample } from '../examples/range-field-playground.tsx';
import { RangeExample } from '../examples/range.tsx';
import { ValueDisplayExample } from '../examples/value-display.tsx';

function getValue(element: Element) {
  return Number((element as HTMLInputElement).value);
}

describe('@godaddy/antares', function antares() {
  describe('#RangeField', function rangeFieldTests() {
    it('exposes its root element and focuses the first thumb', async function imperativeRef() {
      const rootRef = createRef<RangeFieldRef>();
      const { container } = await render(<PlaygroundExample rootRef={rootRef} />);
      const firstThumb = page.getByRole('slider', { name: 'Volume' }).element();

      assume(rootRef.current?.container instanceof HTMLDivElement).equals(true);
      assume(container.contains(rootRef.current?.container ?? null)).equals(true);

      rootRef.current?.focus();
      assume(document.activeElement).equals(firstThumb);
    });

    it('changes an uncontrolled value with arrow keys', async function arrowKeys() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(getValue(thumb.element())).equals(51);

      await user.keyboard('{ArrowLeft}');
      assume(getValue(thumb.element())).equals(50);
    });

    it('moves to the scale boundaries with Home and End', async function boundaries() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{Home}');
      assume(getValue(thumb.element())).equals(0);

      await user.keyboard('{End}');
      assume(getValue(thumb.element())).equals(100);
    });

    it('changes by a larger interval with Page Up and Page Down', async function pageKeys() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{PageUp}');
      assume(getValue(thumb.element())).equals(60);

      await user.keyboard('{PageDown}');
      assume(getValue(thumb.element())).equals(50);
    });

    it('updates controlled and committed values', async function controlledValue() {
      const user = userEvent.setup();
      await render(<ControlledExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{ArrowRight}');

      assume(page.getByText('Current value: 60').query()).is.not.equal(null);
      assume(page.getByText('Committed value: 60').query()).is.not.equal(null);
    });

    it('supports negative scales without clamping to zero', async function negativeScale() {
      const user = userEvent.setup();
      await render(
        <PlaygroundExample label="Temperature" defaultValue={-20} minValue={-100} maxValue={100} step={20} />
      );
      const thumb = page.getByRole('slider', { name: 'Temperature' });

      assume(getValue(thumb.element())).equals(-20);
      thumb.element().focus();
      await user.keyboard('{ArrowLeft}');
      assume(getValue(thumb.element())).equals(-40);
    });

    it('renders and independently adjusts every supplied value', async function multipleValues() {
      const user = userEvent.setup();
      await render(
        <PlaygroundExample
          label="Thresholds"
          defaultValue={[20, 50, 80]}
          thumbLabels={['Low threshold', 'Target threshold', 'High threshold']}
          step={10}
        />
      );
      const low = page.getByRole('slider', { name: 'Low threshold' });
      const target = page.getByRole('slider', { name: 'Target threshold' });
      const high = page.getByRole('slider', { name: 'High threshold' });

      target.element().focus();
      await user.keyboard('{ArrowRight}');

      assume(getValue(low.element())).equals(20);
      assume(getValue(target.element())).equals(60);
      assume(getValue(high.element())).equals(80);
    });

    it('moves focus through multiple thumbs in value order', async function thumbFocusOrder() {
      const user = userEvent.setup();
      await render(<RangeExample />);
      const minimum = page.getByRole('slider', { name: 'Minimum price' });
      const maximum = page.getByRole('slider', { name: 'Maximum price' });

      minimum.element().focus();
      assume(document.activeElement).equals(minimum.element());

      await user.tab();
      assume(document.activeElement).equals(maximum.element());
    });

    it('does not change a disabled value', async function disabledValue() {
      const user = userEvent.setup();
      await render(<DisabledExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{ArrowRight}');

      assume(getValue(thumb.element())).equals(50);
    });

    it('associates its description with every thumb', async function accessibleDetails() {
      const { container } = await render(
        <PlaygroundExample
          label="Thresholds"
          description="Choose the accepted interval."
          defaultValue={[20, 80]}
          thumbLabels={['Minimum threshold', 'Maximum threshold']}
        />
      );
      const description = container.querySelector('[slot="description"]');
      const thumbs = await page.getByRole('slider').all();

      assume(description?.id).is.not.equal('');
      assume(thumbs.length).equals(2);

      thumbs.forEach(function verifyThumb(thumb) {
        assume(thumb.element().getAttribute('aria-describedby')).includes(description?.id);
      });
    });

    it('renders decimal markers through the exact maximum', async function decimalMarkers() {
      const { container } = await render(
        <PlaygroundExample defaultValue={0.1} minValue={0} maxValue={0.3} step={0.1} markers />
      );
      const markers = container.querySelectorAll('[aria-hidden="true"]');

      assume(markers.length).equals(4);
      assume((markers[3] as HTMLElement).style.insetInlineStart).equals('100%');
    });

    it('renders distinct markers for large finite scales', async function largeScaleMarkers() {
      const { container } = await render(
        <PlaygroundExample
          label="Large finite scale"
          defaultValue={0}
          minValue={0}
          maxValue={1e308}
          step={1e307}
          markers
        />
      );
      const markerPositions = Array.from(
        container.querySelectorAll('[aria-hidden="true"]'),
        function getPosition(marker) {
          return (marker as HTMLElement).style.insetInlineStart;
        }
      );

      assume(markerPositions.length).equals(11);
      assume(new Set(markerPositions).size).equals(11);
      assume(markerPositions[1]).equals('10%');
      assume(markerPositions[10]).equals('100%');
    });

    it('omits markers when the step would produce an unsafe number of elements', async function markerLimit() {
      const { container } = await render(
        <PlaygroundExample defaultValue={50} minValue={0} maxValue={100} step={0.000001} markers />
      );

      assume(container.querySelectorAll('[aria-hidden="true"]').length).equals(0);
    });

    it('updates a state-based value label after interaction', async function stateValueLabel() {
      const user = userEvent.setup();
      await render(
        <PlaygroundExample
          label="Volume"
          defaultValue={50}
          step={10}
          valueLabel={function renderValue({ state }) {
            return `Selected: ${state.values[0]}`;
          }}
        />
      );
      const thumb = page.getByRole('slider', { name: 'Volume' });

      assume(page.getByText('Selected: 50').query()).is.not.equal(null);
      thumb.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(page.getByText('Selected: 60').query()).is.not.equal(null);
    });

    it('supports formatted, static, and state-based value labels', async function valueDisplay() {
      const user = userEvent.setup();
      await render(<ValueDisplayExample />);
      const budget = page.getByRole('slider', { name: 'Monthly budget' });
      const volume = page.getByRole('slider', { name: 'Volume' });

      assume(page.getByText('$50').query()).is.not.equal(null);
      assume(page.getByText('Recommended').query()).is.not.equal(null);
      assume(page.getByText('Current: 50%').query()).is.not.equal(null);

      budget.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(page.getByText('$51').query()).is.not.equal(null);

      volume.element().focus();
      await user.keyboard('{ArrowRight}');

      assume(page.getByText('Current: 51%').query()).is.not.equal(null);
    });

    it('calls onChangeEnd with all current values', async function changeEnd() {
      const user = userEvent.setup();
      const onChangeEnd = vi.fn<(value: number | number[]) => void>();
      await render(
        <PlaygroundExample
          label="Thresholds"
          defaultValue={[20, 80]}
          thumbLabels={['Minimum threshold', 'Maximum threshold']}
          step={10}
          onChangeEnd={onChangeEnd}
        />
      );

      page.getByRole('slider', { name: 'Minimum threshold' }).element().focus();
      await user.keyboard('{ArrowRight}');

      assume(onChangeEnd.mock.calls.length).is.above(0);
      assume(onChangeEnd.mock.lastCall?.[0]).deep.equals([30, 80]);
    });

    it('submits one value for each named thumb', async function formValues() {
      const { container } = await render(
        <form>
          <PlaygroundExample
            label="Thresholds"
            defaultValue={[20, 50, 80]}
            thumbLabels={['Low threshold', 'Target threshold', 'High threshold']}
            thumbNames={['low', 'target', 'high']}
          />
        </form>
      );
      const form = container.querySelector('form');
      const data = new FormData(form ?? undefined);

      assume(data.get('low')).equals('20');
      assume(data.get('target')).equals('50');
      assume(data.get('high')).equals('80');
    });
  });
});
