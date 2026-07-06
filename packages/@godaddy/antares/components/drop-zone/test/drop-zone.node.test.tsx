import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { DropTargetLabelExample } from '../examples/drop-target-label.tsx';
import { FileUploadExample } from '../examples/file-upload.tsx';
import { ReplaceFileExample } from '../examples/replace-file.tsx';
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

    it('renders the drop target label drop zone', function rendersDropTargetLabel() {
      const result = renderToString(<DropTargetLabelExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the file upload drop zone', function rendersFileUpload() {
      const result = renderToString(<FileUploadExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the replace file drop zone', function rendersReplaceFile() {
      const result = renderToString(<ReplaceFileExample />);

      expect(result).toMatchSnapshot();
    });

    it('renders the playground drop zone', function rendersPlayground() {
      const result = renderToString(<PlaygroundExample />);

      expect(result).toMatchSnapshot();
    });
  });
});
