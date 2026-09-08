import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button } from '#components/button';
import { Input } from '#components/input';
import { Label } from '#components/label';
import { NumberField } from '#components/number-field';
import { Group } from '#components/structure';
import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { DisabledExample } from '../examples/disabled';
import { FormatOptionsExample } from '../examples/format-options';
import { HideStepperExample } from '../examples/hide-stepper';
import { InvalidExample } from '../examples/invalid';
import { SizesExample } from '../examples/sizes';
import { ValueScaleExample } from '../examples/value-scale';
import { TextSteppersExample } from '../examples/text-steppers';

describe('@godaddy/antares', function antares() {
  describe('#NumberField', function numberField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<ControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<InvalidExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<DisabledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders hideStepper example', function hideStepper() {
        const result = renderToString(<HideStepperExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders valueScale example', function valueScale() {
        const result = renderToString(<ValueScaleExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders formatOptions example', function formatOptions() {
        const result = renderToString(<FormatOptionsExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<SizesExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders text steppers example', function textSteppers() {
        expect(renderToString(<TextSteppersExample />)).toMatchSnapshot();
      });
    });

    describe('#interior', function interior() {
      /** A stepper composed with empty buttons, so the field fills their faces. */
      function stepper(props: { size?: 'sm' | 'md'; maxValue?: number } = {}) {
        return renderToString(
          <NumberField defaultValue={0} {...props}>
            <Label>Quantity</Label>
            <Group>
              <Button slot="decrement" />
              <Input />
              <Button slot="increment" />
            </Group>
          </NumberField>
        );
      }

      it('fills the stepper faces under the field chrome', function faces() {
        const html = stepper({ size: 'sm' });

        expect(html).toContain('data-icon="minus"');
        expect(html).toContain('data-icon="plus"');
        expect(html).toMatch(/<button[^>]*class="control button control sm"/);
      });

      it('keeps the stepper wiring React Aria published', function wiring() {
        const html = stepper({ maxValue: 0 });

        expect(html).toContain('aria-label="Decrease"');
        expect(html).toMatch(/slot="increment" data-disabled="true"/);
      });

      it('lets a local prop beat the field default', function localWins() {
        const html = renderToString(
          <NumberField>
            <Group>
              <Button slot="decrement" variant="primary">
                less
              </Button>
              <Input />
            </Group>
          </NumberField>
        );

        expect(html).toContain('less');
        expect(html).not.toContain('data-icon="minus"');
      });

      it('keeps an unslotted Button working', function defaultSlot() {
        const html = renderToString(
          <NumberField size="sm">
            <Input />
            <Button>Go</Button>
          </NumberField>
        );

        expect(html).toMatch(/class="button tertiary sm"/);
      });
    });
  });
});
