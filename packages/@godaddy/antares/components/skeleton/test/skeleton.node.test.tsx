import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AspectRatioExample } from '../examples/aspect-ratio.tsx';
import { CustomSizeExample } from '../examples/custom-size.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { LoadingRegionExample } from '../examples/loading-region.tsx';
import { MediaCardExample } from '../examples/media-card.tsx';
import { RoundingsExample } from '../examples/roundings.tsx';
import { RowExample } from '../examples/row.tsx';
import { ShapesExample } from '../examples/shapes.tsx';
import { PlaygroundExample } from '../examples/skeleton-playground.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { TextBlockExample } from '../examples/text-block.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Skeleton', function skeletonTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders RoundingsExample', function roundingsExample() {
      expect(renderToString(<RoundingsExample />)).toMatchSnapshot();
    });

    it('renders CustomSizeExample', function customSizeExample() {
      expect(renderToString(<CustomSizeExample />)).toMatchSnapshot();
    });

    it('renders AspectRatioExample', function aspectRatioExample() {
      expect(renderToString(<AspectRatioExample />)).toMatchSnapshot();
    });

    it('renders ShapesExample', function shapesExample() {
      expect(renderToString(<ShapesExample />)).toMatchSnapshot();
    });

    it('renders TextBlockExample', function textBlockExample() {
      expect(renderToString(<TextBlockExample />)).toMatchSnapshot();
    });

    it('renders MediaCardExample', function mediaCardExample() {
      expect(renderToString(<MediaCardExample />)).toMatchSnapshot();
    });

    it('renders RowExample', function rowExample() {
      expect(renderToString(<RowExample />)).toMatchSnapshot();
    });

    it('renders LoadingRegionExample', function loadingRegionExample() {
      expect(renderToString(<LoadingRegionExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});
