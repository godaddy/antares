import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Gallery } from '../index';
import { sampleImages } from '../data/sample-images';

describe('@godaddy/antares', function packageTests() {
  describe('#Gallery', function galleryTests() {
    it('renders an empty gallery on the server', function emptyGallery() {
      expect(renderToString(<Gallery />)).toMatchSnapshot();
    });

    it('renders the populated list on the server', function listGallery() {
      expect(renderToString(<Gallery initialImages={sampleImages} defaultView="list" />)).toMatchSnapshot();
    });

    it('renders the populated grid on the server', function gridGallery() {
      expect(renderToString(<Gallery initialImages={sampleImages} defaultView="grid" />)).toMatchSnapshot();
    });
  });
});
