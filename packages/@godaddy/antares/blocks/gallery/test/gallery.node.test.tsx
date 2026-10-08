import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Gallery } from '../index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Gallery', function galleryTests() {
    it('renders the accessible gallery composition', function rendersGallery() {
      expect(renderToString(<Gallery initialImages={[]} />)).toMatchSnapshot();
    });
  });
});
