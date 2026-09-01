import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { ControlledSelectionExample } from '../examples/controlled-selection.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { EmptyStateExample } from '../examples/empty-state.tsx';
import { MenuFilterTriggerExample } from '../examples/menu-chips.tsx';
import { RemovableChipsExample } from '../examples/removable-chips.tsx';
import { RtlExample } from '../examples/rtl.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { ToggleChipsExample } from '../examples/toggle-chips.tsx';
import { TruncationExample } from '../examples/truncation.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Chip', function chipVisualTests() {
    it('default', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('toggle chips', async function toggleRender() {
      const { container } = await render(<ToggleChipsExample />);
      await expect(container).toMatchScreenshot('toggle-chips');
    });

    it('removable chips', async function removableRender() {
      const { container } = await render(<RemovableChipsExample />);
      await expect(container).toMatchScreenshot('removable-chips');
    });

    it('controlled selection', async function controlledSelectionRender() {
      const { container } = await render(<ControlledSelectionExample />);
      await expect(container).toMatchScreenshot('controlled-selection');
    });

    it('sizes', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('disabled', async function disabledRender() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('truncation', async function truncationRender() {
      const { container } = await render(<TruncationExample />);
      await expect(container).toMatchScreenshot('truncation');
    });

    it('empty state', async function emptyStateRender() {
      const { container } = await render(<EmptyStateExample />);
      await expect(container).toMatchScreenshot('empty-state');
    });

    it('menu filter trigger', async function menuFilterTriggerRender() {
      const { container } = await render(<MenuFilterTriggerExample />);
      await expect(container).toMatchScreenshot('menu-filter-trigger');
    });

    it('rtl direction', async function rtlRender() {
      const { container } = await render(<RtlExample />);
      await expect(container).toMatchScreenshot('rtl-direction');
    });
  });
});
