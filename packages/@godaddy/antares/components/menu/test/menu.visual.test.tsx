import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import type { ReactElement } from 'react';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { TitleAndGroupsExample } from '../examples/sections.tsx';
import { AccountMenuExample } from '../examples/avatar.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { LinksExample } from '../examples/links.tsx';
import { OpenFromDialogExample } from '../examples/open-from-dialog.tsx';
import { ComplexExample } from '../examples/complex.tsx';

async function shot(example: ReactElement, name: string, keys: string[] = []) {
  const user = userEvent.setup();
  const screen = await render(example);
  await user.tab();
  await user.keyboard('{Enter}');
  await vi.waitFor(async function menuOpen() {
    await expect.element(screen.getByRole('menu')).toBeVisible();
  });
  for (const key of keys) {
    await vi.waitFor(function itemFocused() {
      const role = document.activeElement?.getAttribute('role');
      if (role !== 'menuitem' && role !== 'menuitemradio' && role !== 'menuitemcheckbox') {
        throw new Error('waiting for the first item');
      }
    });
    const menus = document.querySelectorAll('[role="menu"]').length;
    await user.keyboard(key);
    if (key === '{ArrowRight}') {
      await vi.waitFor(function submenuOpen() {
        if (document.querySelectorAll('[role="menu"]').length <= menus) throw new Error('waiting for the submenu');
      });
    }
  }
  await Promise.all(
    [...document.images].map(function decodeImage(image) {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve();
      return image.decode().catch(function unloaded() {
        return undefined;
      });
    })
  );
  await new Promise(function settle(resolve) {
    setTimeout(resolve, 200);
  });
  await expect(document.body).toMatchScreenshot(name);
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(async function viewport() {
    await page.viewport(800, 700);
  });
  afterEach(async function restoreViewport() {
    await page.viewport(1280, 720);
  });

  describe('#Menu', function menuTests() {
    it('default', async function actionMenu() {
      await shot(<DefaultExample />, 'default');
    });

    it('submenu', async function submenu() {
      await shot(<SubmenuExample />, 'submenu', ['{ArrowDown}', '{ArrowDown}', '{ArrowRight}']);
    });

    it('single selection', async function singleSelection() {
      await shot(<SingleSelectionExample />, 'single-selection', ['{ArrowDown}', '{ArrowRight}']);
    });

    it('multiple selection', async function multipleSelection() {
      await shot(<MultipleSelectionExample />, 'multiple-selection', [
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowRight}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowRight}'
      ]);
    });

    it('sections', async function sections() {
      await shot(<TitleAndGroupsExample />, 'sections');
    });

    it('avatar', async function avatar() {
      await shot(<AccountMenuExample />, 'avatar');
    });

    it('bottom sheet', async function bottomSheet() {
      await page.viewport(420, 760);
      await shot(<BottomSheetExample />, 'bottom-sheet');
    });

    it('links', async function links() {
      await shot(<LinksExample />, 'links');
    });

    it('open from dialog', async function openFromDialog() {
      const user = userEvent.setup();
      const screen = await render(<OpenFromDialogExample />);
      await user.tab();
      await user.keyboard('{Enter}');
      await vi.waitFor(async function dialogOpen() {
        await expect.element(screen.getByRole('dialog', { name: 'Edit file' })).toBeVisible();
      });
      await user.keyboard('{Tab}{Tab}{Enter}');
      await vi.waitFor(async function menuOpen() {
        await expect.element(screen.getByRole('menu')).toBeVisible();
      });
      await new Promise(function settle(resolve) {
        setTimeout(resolve, 200);
      });
      await expect(document.body).toMatchScreenshot('open-from-dialog');
    });

    it('complex', async function complex() {
      await shot(<ComplexExample />, 'complex', [
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowDown}',
        '{ArrowRight}'
      ]);
    });
  });
});
