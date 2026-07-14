import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { AcceptedTypesExample } from '../examples/accepted-types.tsx';
import { PlaygroundExample } from '../examples/file-trigger-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#FileTrigger', function fileTriggerTests() {
    it('renders the default file trigger', function rendersDefault() {
      const result = renderToString(<DefaultExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the file trigger with accepted types', function rendersAcceptedTypes() {
      const result = renderToString(<AcceptedTypesExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the playground file trigger', function rendersPlayground() {
      const result = renderToString(<PlaygroundExample />);

      expect(result).toMatchSnapshot();
    });
  });
});
