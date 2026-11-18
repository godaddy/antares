import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/toast-playground.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { PersistentExample } from '../examples/persistent.tsx';
import { AriaLabelsExample } from '../examples/aria-labels.tsx';
import { MultipleRegionsExample } from '../examples/multiple-regions.tsx';

// Regions render nothing on the server, so these snapshots lock in the triggers only.
describe('@godaddy/antares', function antares() {
  describe('#Toast', function toastTests() {
    it('renders the default example', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the playground defaults', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders the emphases example', function emphasesExample() {
      expect(renderToString(<EmphasesExample />)).toMatchSnapshot();
    });

    it('renders the persistent example', function persistentExample() {
      expect(renderToString(<PersistentExample />)).toMatchSnapshot();
    });

    it('renders the translated labels example', function ariaLabelsExample() {
      expect(renderToString(<AriaLabelsExample />)).toMatchSnapshot();
    });

    it('renders the multiple regions example', function multipleRegionsExample() {
      expect(renderToString(<MultipleRegionsExample />)).toMatchSnapshot();
    });
  });
});
