import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default';
import { ListBoxControlledExample } from '../examples/controlled';
import { ListBoxMultipleExample } from '../examples/multiple';

describe('@godaddy/antares', function antares() {
  describe('#ListBox', function listBox() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<ListBoxControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders multiple example', function multiple() {
        const result = renderToString(<ListBoxMultipleExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
