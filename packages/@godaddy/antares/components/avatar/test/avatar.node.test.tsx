import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlaygroundExample } from '../examples/avatar-playground.tsx';
import { ButtonExample } from '../examples/button.tsx';
import { ButtonDisabledExample } from '../examples/button-disabled.tsx';
import { ButtonMenuExample } from '../examples/button-menu.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';
import { ImageFallbackExample } from '../examples/image-fallback.tsx';
import { ImageExample } from '../examples/image.tsx';
import { ShapesExample } from '../examples/shapes.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Avatar', function avatarTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders ImageExample', function imageExample() {
      expect(renderToString(<ImageExample />)).toMatchSnapshot();
    });

    it('renders ImageFallbackExample', function imageFallbackExample() {
      expect(renderToString(<ImageFallbackExample />)).toMatchSnapshot();
    });

    it('renders ShapesExample', function shapesExample() {
      expect(renderToString(<ShapesExample />)).toMatchSnapshot();
    });

    it('renders EmphasisExample', function emphasisExample() {
      expect(renderToString(<EmphasisExample />)).toMatchSnapshot();
    });

    it('renders ButtonExample', function buttonExample() {
      expect(renderToString(<ButtonExample />)).toMatchSnapshot();
    });

    it('renders ButtonMenuExample', function buttonMenuExample() {
      expect(renderToString(<ButtonMenuExample />)).toMatchSnapshot();
    });

    it('renders ButtonDisabledExample', function buttonDisabledExample() {
      expect(renderToString(<ButtonDisabledExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});
