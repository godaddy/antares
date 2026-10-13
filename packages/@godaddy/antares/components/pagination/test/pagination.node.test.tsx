import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { MinimalExample } from '../examples/minimal.tsx';
import { PageCountKnownExample } from '../examples/page-count-known.tsx';
import { PageCountUnknownExample } from '../examples/page-count-unknown.tsx';
import { PaginationDotsExample } from '../examples/dots.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Pagination', function paginationTests() {
    it('renders the default example', function rendersDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the controlled example', function rendersControlled() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders the page count known example', function rendersPageCountKnown() {
      expect(renderToString(<PageCountKnownExample />)).toMatchSnapshot();
    });

    it('renders the page count unknown example', function rendersPageCountUnknown() {
      expect(renderToString(<PageCountUnknownExample />)).toMatchSnapshot();
    });

    it('renders the minimal example', function rendersMinimal() {
      expect(renderToString(<MinimalExample />)).toMatchSnapshot();
    });

    it('renders the PaginationDots example', function rendersPaginationDots() {
      expect(renderToString(<PaginationDotsExample />)).toMatchSnapshot();
    });
  });
});
