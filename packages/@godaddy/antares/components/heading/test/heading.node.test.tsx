import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { HeadingContextExample } from '../examples/heading-context.tsx';
import { HeadingWeightExample } from '../examples/heading-weight.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Heading', function headingTests() {
    it('renders the default example', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the level resolution fixture', function rendersHeadingContext() {
      expect(renderToString(<HeadingContextExample />)).toMatchSnapshot();
    });

    it('renders the themed weight fixture', function rendersHeadingWeight() {
      expect(renderToString(<HeadingWeightExample />)).toMatchSnapshot();
    });
  });
});
