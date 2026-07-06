import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { DropZone, Text } from '@godaddy/antares';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#DropZone', function dropZoneVisualTests() {
    it('resting state', async function restingRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('resting');
    });

    it('disabled state', async function disabledRender() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('keyboard focus state', async function focusRender() {
      const { container } = await render(<DefaultExample />);
      await userEvent.keyboard('{Tab}');
      await expect(container).toMatchScreenshot('focus');
    });

    it('drop target state', async function dropTargetRender() {
      const { container } = await render(<DefaultExample />);
      const dropZone = container.querySelector('[data-rac]') as HTMLElement;
      dropZone.setAttribute('data-drop-target', 'true');
      await expect(container).toMatchScreenshot('drop-target');
    });

    it('drop target label - active state', async function dropTargetLabelActiveRender() {
      const { container } = await render(
        <DropZone
          aria-label="Drop files to upload"
          onDrop={function noop() {
            /* noop */
          }}
        >
          <Text as="strong">Drop files to upload.</Text>
        </DropZone>
      );
      const dropZone = container.querySelector('[data-rac]') as HTMLElement;
      dropZone.setAttribute('data-drop-target', 'true');
      await expect(container).toMatchScreenshot('drop-target-label');
    });

    it('filled tile - replace label active state', async function filledReplaceActiveRender() {
      const { container } = await render(
        <div style={{ width: 200 }}>
          <DropZone
            aria-label="Replace uploaded file"
            onDrop={function noop() {
              /* noop */
            }}
            style={{ minHeight: 200 }}
          >
            <Text as="strong">Drop to replace</Text>
          </DropZone>
        </div>
      );
      const dropZone = container.querySelector('[data-rac]') as HTMLElement;
      dropZone.setAttribute('data-drop-target', 'true');
      await expect(container).toMatchScreenshot('filled-replace-label');
    });
  });
});
