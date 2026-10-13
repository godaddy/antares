import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Heading', function headingTests() {
    it('renders the default example', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the sizes example', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });
  });
});
