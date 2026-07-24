import assume from 'assume';
import type { RangeSliderRef } from '@godaddy/antares';
import { createRef } from 'react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RangeSliderControlledExample } from '../examples/controlled.tsx';
import { RangeSliderDefaultExample } from '../examples/default.tsx';
import { RangeSliderDisabledExample } from '../examples/disabled.tsx';
import { RangeSliderFormExample } from '../examples/form.tsx';
import { RangeSliderPlaygroundExample } from '../examples/range-slider-playground.tsx';

function getValue(element: Element) {
  return Number((element as HTMLInputElement).value);
}

describe('@godaddy/antares', function antares() {
  describe('#RangeSlider', function rangeSliderTests() {
    it('exposes its root element and focuses the first thumb', async function imperativeRef() {
      const rootRef = createRef<RangeSliderRef>();
      const { container } = await render(
        <RangeSliderPlaygroundExample thumbLabels={['Minimum price', 'Maximum price']} rootRef={rootRef} />
      );
      const firstThumb = page.getByRole('slider', { name: 'Minimum price' }).element();

      assume(rootRef.current?.container instanceof HTMLDivElement).equals(true);
      assume(container.contains(rootRef.current?.container ?? null)).equals(true);

      rootRef.current?.focus();
      assume(document.activeElement).equals(firstThumb);
    });

    it('renders exactly two independently labelled values', async function twoValues() {
      await render(<RangeSliderDefaultExample />);
      const thumbs = await page.getByRole('slider').all();

      assume(thumbs.length).equals(2);
      assume(getValue(page.getByRole('slider', { name: 'Minimum price' }).element())).equals(20);
      assume(getValue(page.getByRole('slider', { name: 'Maximum price' }).element())).equals(80);
    });

    it('updates the controlled tuple', async function controlledValue() {
      const user = userEvent.setup();
      await render(<RangeSliderControlledExample />);
      const minimum = page.getByRole('slider', { name: 'Minimum price' });
      const maximum = page.getByRole('slider', { name: 'Maximum price' });

      minimum.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(page.getByText('Current range: 21 – 80').query()).is.not.equal(null);

      maximum.element().focus();
      await user.keyboard('{ArrowLeft}');
      assume(page.getByText('Current range: 21 – 79').query()).is.not.equal(null);
    });

    it('moves focus from the start thumb to the end thumb', async function focusOrder() {
      const user = userEvent.setup();
      await render(<RangeSliderDefaultExample />);
      const minimum = page.getByRole('slider', { name: 'Minimum price' });
      const maximum = page.getByRole('slider', { name: 'Maximum price' });

      minimum.element().focus();
      await user.tab();
      assume(document.activeElement).equals(maximum.element());
    });

    it('supports negative ranges', async function negativeRange() {
      const user = userEvent.setup();
      await render(
        <RangeSliderPlaygroundExample
          label="Temperature range"
          defaultValue={[-60, 40]}
          minValue={-100}
          maxValue={100}
          step={20}
          thumbLabels={['Minimum temperature', 'Maximum temperature']}
        />
      );
      const minimum = page.getByRole('slider', { name: 'Minimum temperature' });

      minimum.element().focus();
      await user.keyboard('{ArrowRight}');
      assume(getValue(minimum.element())).equals(-40);
    });

    it('does not change either value when disabled', async function disabledRange() {
      const user = userEvent.setup();
      await render(<RangeSliderDisabledExample />);
      const minimum = page.getByRole('slider', { name: 'Minimum price' });
      const maximum = page.getByRole('slider', { name: 'Maximum price' });

      minimum.element().focus();
      await user.keyboard('{ArrowRight}');
      maximum.element().focus();
      await user.keyboard('{ArrowLeft}');

      assume(getValue(minimum.element())).equals(20);
      assume(getValue(maximum.element())).equals(80);
    });

    it('forwards the committed tuple', async function changeEnd() {
      const user = userEvent.setup();
      const onChangeEnd = vi.fn<(value: [number, number]) => void>();
      await render(
        <RangeSliderPlaygroundExample
          label="Price range"
          defaultValue={[20, 80]}
          step={10}
          thumbLabels={['Minimum price', 'Maximum price']}
          onChangeEnd={onChangeEnd}
        />
      );

      page.getByRole('slider', { name: 'Minimum price' }).element().focus();
      await user.keyboard('{ArrowRight}');

      assume(onChangeEnd.mock.calls.length).is.above(0);
      assume(onChangeEnd.mock.lastCall?.[0]).deep.equals([30, 80]);
    });

    it('submits both named values', async function formValues() {
      const { container } = await render(<RangeSliderFormExample />);
      const form = container.querySelector('form');
      const data = new FormData(form ?? undefined);

      assume(data.get('priceMin')).equals('20');
      assume(data.get('priceMax')).equals('80');
    });

    it('supports only a start form name', async function startName() {
      const { container } = await render(
        <form>
          <RangeSliderPlaygroundExample thumbLabels={['Minimum price', 'Maximum price']} startName="minimum" />
        </form>
      );
      const form = container.querySelector('form');
      const data = new FormData(form ?? undefined);

      assume(data.get('minimum')).equals('20');
      assume(Array.from(data.entries()).length).equals(1);
    });

    it('supports only an end form name', async function endName() {
      const { container } = await render(
        <form>
          <RangeSliderPlaygroundExample thumbLabels={['Minimum price', 'Maximum price']} endName="maximum" />
        </form>
      );
      const form = container.querySelector('form');
      const data = new FormData(form ?? undefined);

      assume(data.get('maximum')).equals('80');
      assume(Array.from(data.entries()).length).equals(1);
    });
  });
});
