import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EmptyGalleryExample } from '../examples/empty';
import { ListGalleryExample } from '../examples/list';
import { GridGalleryExample } from '../examples/grid';

describe('@godaddy/antares', function packageTests() {
  describe('#Gallery', function galleryTests() {
    it('renders an empty gallery on the server', function emptyGallery() {
      expect(renderToString(<EmptyGalleryExample />)).toMatchSnapshot();
    });

    it('renders the populated list on the server', function listGallery() {
      expect(renderToString(<ListGalleryExample />)).toMatchSnapshot();
    });

    it('renders the populated grid on the server', function gridGallery() {
      expect(renderToString(<GridGalleryExample />)).toMatchSnapshot();
    });
  });
});
