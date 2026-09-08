import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button } from '#components/button';
import { Input } from '#components/input';
import { Label } from '#components/label';
import { Group } from '#components/structure';
import { TextField } from '#components/text-field';
import { AdornmentsExample } from '../examples/adornments';
import { ControlsExample } from '../examples/controls';
import { DefaultExample } from '../examples/default';
import { DisabledExample } from '../examples/disabled';
import { InvalidExample } from '../examples/invalid';
import { MultilineExample } from '../examples/multiline';
import { SizesExample } from '../examples/sizes';
import { TelephoneFieldExample } from '../examples/telephone-field';

describe('@godaddy/antares', function antares() {
  describe('#TextField', function textField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
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

      it('renders adornments example', function adornments() {
        const result = renderToString(<AdornmentsExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders multiline example', function multiline() {
        const result = renderToString(<MultilineExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<SizesExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controls example', function controls() {
        expect(renderToString(<ControlsExample />)).toMatchSnapshot();
      });

      it('renders telephone field example', function telephoneField() {
        expect(renderToString(<TelephoneFieldExample />)).toMatchSnapshot();
      });
    });

    describe('#interior', function interior() {
      it('styles the label and a composed Group', function parts() {
        const html = renderToString(
          <TextField>
            <Label>Email</Label>
            <Group>
              <Input />
            </Group>
          </TextField>
        );

        expect(html).toContain('<label class="label"');
        expect(html).toMatch(/class="box flex group"/);
      });

      it('gives a composed Button the control chrome', function controlButton() {
        const html = renderToString(
          <TextField>
            <Label>Image</Label>
            <Group>
              <Button slot="control">Browse</Button>
              <Input />
            </Group>
          </TextField>
        );

        expect(html).toMatch(/<button class="control button control md"/);
      });

      it('disables the group and a control button with the field', function disabled() {
        const html = renderToString(
          <TextField isDisabled>
            <Label>Image</Label>
            <Group>
              <Button slot="control">Browse</Button>
              <Input />
            </Group>
          </TextField>
        );

        expect(html).toMatch(/class="box flex group"[^>]*data-disabled="true"/);
        expect(html).toMatch(/<button class="control button control md"[^>]*disabled=""/);
      });
    });
  });
});
