import assume from 'assume';
import type { SliderRef } from '@godaddy/antares';
import { createRef } from 'react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { SliderControlledExample } from '../examples/controlled.tsx';
import { SliderDefaultExample } from '../examples/default.tsx';
import { SliderDisabledExample } from '../examples/disabled.tsx';
import { SliderPlaygroundExample } from '../examples/slider-playground.tsx';

function getValue(element: Element) {
  return Number((element as HTMLInputElement).value);
}

describe('@godaddy/antares', function antares() {
  describe('#Slider', function sliderTests() {
    it('exposes its root element and focuses its thumb', async function imperativeRef() {
      const rootRef = createRef<SliderRef>();
      const { container } = await render(<SliderPlaygroundExample rootRef={rootRef} />);
      const thumb = page.getByRole('slider', { name: 'Volume' }).element();

      assume(rootRef.current?.container instanceof HTMLDivElement).equals(true);
      assume(container.contains(rootRef.current?.container ?? null)).equals(true);

      rootRef.current?.focus();
      assume(document.activeElement).equals(thumb);
    });

    it('renders exactly one adjustable value', async function oneValue() {
      await render(<SliderDefaultExample />);
      const thumbs = await page.getByRole('slider').all();

      assume(thumbs.length).equals(1);
      assume(getValue(thumbs[0].element())).equals(50);
    });

    it('updates its uncontrolled scalar value', async function uncontrolledValue() {
      const user = userEvent.setup();
      await render(<SliderDefaultExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(getValue(thumb.element())).equals(51);
    });

    it('uses the minimum as a scalar default and callback value', async function minimumDefault() {
      const user = userEvent.setup();
      const onChange = vi.fn<(value: number) => void>();
      const onChangeEnd = vi.fn<(value: number) => void>();
      await render(
        <SliderDefaultExample
          defaultValue={undefined}
          minValue={10}
          maxValue={20}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
        />
      );
      const thumb = page.getByRole('slider', { name: 'Volume' });

      assume(getValue(thumb.element())).equals(10);
      thumb.element().focus();
      await user.keyboard('{ArrowRight}');

      assume(onChange.mock.lastCall?.[0]).equals(11);
      assume(onChangeEnd.mock.lastCall?.[0]).equals(11);
    });

    it('updates its controlled scalar value', async function controlledValue() {
      const user = userEvent.setup();
      await render(<SliderControlledExample />);
      const thumb = page.getByRole('slider', { name: 'Opacity' });

      thumb.element().focus();
      await user.keyboard('{ArrowRight}');

      assume(page.getByText('Current value: 31').query()).is.not.equal(null);
      assume(getValue(thumb.element())).equals(31);
    });

    it('supports negative scalar values', async function negativeValue() {
      const user = userEvent.setup();
      await render(
        <SliderPlaygroundExample label="Temperature" defaultValue={-20} minValue={-100} maxValue={100} step={20} />
      );
      const thumb = page.getByRole('slider', { name: 'Temperature' });

      thumb.element().focus();
      await user.keyboard('{ArrowLeft}');
      assume(getValue(thumb.element())).equals(-40);
    });

    it('stacks and right-aligns the value label when the header content does not fit', async function wrappingHeader() {
      const { container } = await render(
        <div style={{ width: 180 }}>
          <SliderPlaygroundExample label="Storage allocation" defaultValue={50} valueLabel="100 GB remaining" />
        </div>
      );
      const label = container.querySelector('label');
      const valueLabel = container.querySelector('output');
      const header = label?.parentElement;

      assume(label).is.not.equal(null);
      assume(valueLabel).is.not.equal(null);
      assume(header).is.not.equal(null);

      const labelBounds = label?.getBoundingClientRect();
      const valueLabelBounds = valueLabel?.getBoundingClientRect();
      const headerBounds = header?.getBoundingClientRect();

      assume(Math.round((valueLabelBounds?.top ?? 0) - (labelBounds?.bottom ?? 0))).equals(4);
      assume(Math.round((headerBounds?.right ?? 0) - (valueLabelBounds?.right ?? 0))).equals(0);
    });

    it('does not change when disabled', async function disabledValue() {
      const user = userEvent.setup();
      await render(<SliderDisabledExample />);
      const thumb = page.getByRole('slider', { name: 'Volume' });

      thumb.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(getValue(thumb.element())).equals(40);
    });

    it('forwards the committed scalar value', async function changeEnd() {
      const user = userEvent.setup();
      const onChangeEnd = vi.fn<(value: number) => void>();
      await render(<SliderPlaygroundExample label="Volume" defaultValue={50} step={10} onChangeEnd={onChangeEnd} />);

      page.getByRole('slider', { name: 'Volume' }).element().focus();
      await user.keyboard('{ArrowRight}');

      assume(onChangeEnd.mock.calls.length).is.above(0);
      assume(onChangeEnd.mock.lastCall?.[0]).equals(60);
    });
  });
});
