import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ActionsExample } from '../examples/actions.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { CollectionExample } from '../examples/collection.tsx';
import { ContainerQueryExample } from '../examples/container-query.tsx';
import { MediaExample } from '../examples/media.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card', function cardTests() {
    it('renders the default composition', function renderDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders independent primary and child actions', function renderActions() {
      expect(renderToString(<ActionsExample />)).toMatchSnapshot();
    });

    it('renders standalone and grouped selection with optional navigation', function renderSelection() {
      expect(renderToString(<SelectionExample />)).toMatchSnapshot();
    });

    it('renders inset, full bleed, standalone and custom media', function renderMedia() {
      expect(renderToString(<MediaExample />)).toMatchSnapshot();
    });

    it('renders a responsive composition', function renderResponsive() {
      expect(renderToString(<ContainerQueryExample />)).toMatchSnapshot();
    });

    it('renders collections with bottom actions and corner spacing', function renderCollection() {
      expect(renderToString(<CollectionExample />)).toMatchSnapshot();
    });
  });
});
