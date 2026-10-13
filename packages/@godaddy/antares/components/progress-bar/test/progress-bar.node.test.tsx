import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ProgressBar', function progressBarTests() {
    it('renders indeterminate progress', function rendersIndeterminate() {
      expect(renderToString(<IndeterminateExample />)).toMatchSnapshot();
    });

    it('renders indeterminate progress with a supplied value', function rendersIndeterminateWithValue() {
      expect(renderToString(<IndeterminateExample value={60} aria-valuetext="60 files" />)).toMatchSnapshot();
    });

    it('renders the default progress bar', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders progress bars in different sizes', function rendersSizes() {
      const result = renderToString(<SizesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders progress bars with different statuses', function rendersStatuses() {
      const result = renderToString(<StatusesExample />);
      expect(result).toMatchSnapshot();
    });
  });
});
