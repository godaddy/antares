import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DateFieldBasicExample } from '../examples/basic.tsx';
import { DateFieldControlledExample } from '../examples/controlled.tsx';
import { DateFieldDisabledRequiredReadOnlyExample } from '../examples/disabled-required-readonly.tsx';
import { DateFieldMinMaxExample } from '../examples/min-max.tsx';
import { DateFieldWithDefaultValueExample } from '../examples/with-default-value.tsx';
import { DateFieldWithDescriptionExample } from '../examples/with-description.tsx';
import { DateFieldWithErrorExample } from '../examples/with-error.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DateField', function dateField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DateFieldBasicExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders with-default-value example', function withDefault() {
        const result = renderToString(<DateFieldWithDefaultValueExample />);
        expect(result).toContain('2024');
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<DateFieldControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders with-description example', function withDescription() {
        const result = renderToString(<DateFieldWithDescriptionExample />);
        expect(result).toContain('subscription begins');
      });

      it('renders with-error example', function withError() {
        const result = renderToString(<DateFieldWithErrorExample />);
        expect(result).toContain('data-invalid');
      });

      it('renders min-max example', function minMax() {
        const result = renderToString(<DateFieldMinMaxExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders disabled-required-readonly example', function dro() {
        const result = renderToString(<DateFieldDisabledRequiredReadOnlyExample />);
        expect(result).toContain('data-disabled');
        expect(result).toContain('data-readonly');
      });
    });
  });
});
