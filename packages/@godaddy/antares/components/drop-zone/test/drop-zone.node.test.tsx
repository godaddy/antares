import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { CustomContentExample } from '../examples/custom-content.tsx';
import { PlaygroundExample } from '../examples/drop-zone-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DropZone', function dropZoneTests() {
    it('renders the default drop zone', function rendersDefault() {
      const result = renderToString(<DefaultExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the disabled drop zone', function rendersDisabled() {
      const result = renderToString(<DisabledExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the drop zone with custom content', function rendersCustomContent() {
      const result = renderToString(<CustomContentExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the playground drop zone', function rendersPlayground() {
      const result = renderToString(<PlaygroundExample />);

      expect(result).toMatchSnapshot();
    });
  });
});
