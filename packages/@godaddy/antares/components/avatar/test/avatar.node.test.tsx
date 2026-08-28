import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AccountMenuExample } from '../examples/account-menu.tsx';
import { PlaygroundExample } from '../examples/avatar-playground.tsx';
import { AvatarButtonExample } from '../examples/avatar-button.tsx';
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

    it('renders AvatarButtonExample', function avatarButtonExample() {
      expect(renderToString(<AvatarButtonExample />)).toMatchSnapshot();
    });

    it('renders AccountMenuExample', function accountMenuExample() {
      expect(renderToString(<AccountMenuExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});
