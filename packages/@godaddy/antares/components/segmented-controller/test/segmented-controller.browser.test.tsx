import { BasicExample } from '../examples/basic.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { IconOnlyExample } from '../examples/icon-only.tsx';
import { OverflowExample } from '../examples/overflow.tsx';
import { RTLExample } from '../examples/rtl.tsx';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#SegmentedController', function segmentedControllerTests() {
    it('renders BasicExample as a radiogroup with radio items', async function basicRenders() {
      await render(<BasicExample />);

      assume(page.getByRole('radiogroup').query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Day' }).query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Week' }).query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Month' }).query()).is.not.equal(null);
    });

    it('selects an item on click and deselects the previous in BasicExample', async function basicClickSelection() {
      const user = userEvent.setup();
      await render(<BasicExample />);

      const day = page.getByRole('radio', { name: 'Day' });
      const week = page.getByRole('radio', { name: 'Week' });
      const month = page.getByRole('radio', { name: 'Month' });

      await user.click(day);
      assume(day.element().getAttribute('aria-checked')).equals('true');
      assume(day.element().getAttribute('data-selected')).equals('true');

      // Clicking another item deselects the first (single-select)
      await user.click(week);
      assume(week.element().getAttribute('aria-checked')).equals('true');
      assume(day.element().getAttribute('aria-checked')).equals('false');

      await user.click(month);
      assume(month.element().getAttribute('aria-checked')).equals('true');
      assume(week.element().getAttribute('aria-checked')).equals('false');
      assume(day.element().getAttribute('aria-checked')).equals('false');
    });

    it('prevents empty selection in BasicExample', async function basicNoEmptySelection() {
      const user = userEvent.setup();
      await render(<BasicExample />);

      const day = page.getByRole('radio', { name: 'Day' });

      await user.click(day);
      assume(day.element().getAttribute('aria-checked')).equals('true');

      // Re-clicking the selected item should keep it selected
      await user.click(day);
      assume(day.element().getAttribute('aria-checked')).equals('true');
    });

    it('navigates with ArrowRight and ArrowLeft in BasicExample', async function basicKeyboardNavigation() {
      const user = userEvent.setup();
      await render(<BasicExample />);

      const day = page.getByRole('radio', { name: 'Day' });
      const week = page.getByRole('radio', { name: 'Week' });
      const month = page.getByRole('radio', { name: 'Month' });

      await user.click(day);
      assume(document.activeElement).equals(day.element());

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(week.element());

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(month.element());

      await user.keyboard('{ArrowLeft}');
      assume(document.activeElement).equals(week.element());

      await user.keyboard('{ArrowLeft}');
      assume(document.activeElement).equals(day.element());
    });

    it('returns tab focus to the selected item in BasicExample', async function basicTabFocus() {
      const user = userEvent.setup();
      await render(<BasicExample />);

      const week = page.getByRole('radio', { name: 'Week' });

      await user.click(week);
      assume(week.element().getAttribute('aria-checked')).equals('true');

      // Blur by clicking outside
      await user.click(document.body);

      // Tab should return focus to the selected item
      await user.tab();
      assume(document.activeElement).equals(week.element());
    });

    it('updates the displayed selection on click in ControlledExample', async function controlledSelection() {
      const user = userEvent.setup();
      await render(<ControlledExample />);

      // Initial controlled state: week is selected
      const paragraph = document.querySelector('p');
      assume(paragraph?.textContent).includes('week');

      const week = page.getByRole('radio', { name: 'Week' });
      assume(week.element().getAttribute('aria-checked')).equals('true');

      // Click Day — state updates and paragraph reflects the change
      const day = page.getByRole('radio', { name: 'Day' });
      await user.click(day);

      assume(day.element().getAttribute('aria-checked')).equals('true');
      assume(week.element().getAttribute('aria-checked')).equals('false');
      assume(paragraph?.textContent).includes('day');
    });

    it('marks the disabled item as disabled in DisabledExample', async function disabledItemState() {
      const user = userEvent.setup();
      await render(<DisabledExample />);

      // The second group has an individually disabled Week item
      const radiogroups = document.querySelectorAll('[role="radiogroup"]');
      const secondGroup = radiogroups[1];
      const radios = secondGroup.querySelectorAll('[role="radio"]');

      const day = radios[0];
      const week = radios[1]; // disabled
      const month = radios[2];

      // Week should be disabled
      assume(week.hasAttribute('disabled')).equals(true);

      // Day and Month should NOT be disabled
      assume(day.hasAttribute('disabled')).equals(false);
      assume(month.hasAttribute('disabled')).equals(false);

      // Non-disabled items in the same group still work
      await user.click(day);
      assume(day.getAttribute('aria-checked')).equals('true');

      // Keyboard skips the disabled item
      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(month);
    });

    it('renders IconOnlyExample with accessible labels on icon items', async function iconOnlyAccessibleLabels() {
      await render(<IconOnlyExample />);

      const listItem = page.getByRole('radio', { name: 'List view' });
      const gridItem = page.getByRole('radio', { name: 'Grid view' });

      assume(await listItem.query()).is.not.equal(null);
      assume(await gridItem.query()).is.not.equal(null);
    });

    it('allows selecting icon-only items by click in IconOnlyExample', async function iconOnlyClickSelection() {
      const user = userEvent.setup();
      await render(<IconOnlyExample />);

      const listItem = page.getByRole('radio', { name: 'List view' });
      const gridItem = page.getByRole('radio', { name: 'Grid view' });

      await user.click(listItem);
      assume(listItem.element().getAttribute('aria-checked')).equals('true');

      await user.click(gridItem);
      assume(gridItem.element().getAttribute('aria-checked')).equals('true');
      assume(listItem.element().getAttribute('aria-checked')).equals('false');
    });

    it('shows scroll buttons when items overflow in OverflowExample', async function overflowScrollButtons() {
      await render(<OverflowExample />);

      const scrollPrevious = page.getByLabelText('Scroll previous');
      const scrollNext = page.getByLabelText('Scroll next');

      assume(scrollPrevious.query()).is.not.equal(null);
      assume(scrollNext.query()).is.not.equal(null);
    });

    it('hides scroll buttons when content fits in OverflowExample', async function overflowNoButtons() {
      await render(<OverflowExample maxWidth="1000px" />);

      assume(page.getByLabelText('Scroll previous').query()).equals(null);
      assume(page.getByLabelText('Scroll next').query()).equals(null);
    });

    it('disables Scroll previous at start and enables after scrolling next in OverflowExample', async function overflowScrollButtonStates() {
      const user = userEvent.setup();
      await render(<OverflowExample />);

      const prev = page.getByLabelText('Scroll previous');
      const next = page.getByLabelText('Scroll next');

      assume(prev.element().hasAttribute('disabled')).equals(true);
      assume(next.element().hasAttribute('disabled')).equals(false);

      await user.click(next);
      await expect.element(prev).not.toHaveAttribute('disabled');
    });

    it('disables Scroll next after reaching the end in OverflowExample', async function overflowScrollToEnd() {
      await render(<OverflowExample />);

      const prev = page.getByLabelText('Scroll previous');
      const next = page.getByLabelText('Scroll next');
      const scrollArea = page.getByRole('radiogroup').element().firstElementChild;

      if (!scrollArea) throw new Error('Scroll area not found');

      scrollArea.scrollLeft = scrollArea.scrollWidth;

      await expect.element(next).toHaveAttribute('disabled');
      await expect.element(prev).not.toHaveAttribute('disabled');
    });

    it('shows scroll buttons after resizing container smaller in OverflowExample', async function overflowResizeSmaller() {
      await render(<OverflowExample maxWidth="1000px" />);

      assume(page.getByLabelText('Scroll next').query()).equals(null);

      const container = page.getByRole('radiogroup').element();
      container.style.maxWidth = '300px';

      await expect.element(page.getByLabelText('Scroll next')).toBeVisible();
      await expect.element(page.getByLabelText('Scroll previous')).toBeVisible();
    });

    it('hides scroll buttons after resizing container larger in OverflowExample', async function overflowResizeLarger() {
      await render(<OverflowExample />);

      await expect.element(page.getByLabelText('Scroll next')).toBeVisible();

      const container = page.getByRole('radiogroup').element();
      container.style.maxWidth = '1000px';

      await expect.element(page.getByLabelText('Scroll next')).not.toBeInTheDocument();
      await expect.element(page.getByLabelText('Scroll previous')).not.toBeInTheDocument();
    });

    it('applies dir="rtl" attribute to the container in RTLExample', async function rtlDirAttribute() {
      await render(<RTLExample />);

      const radiogroup = page.getByRole('radiogroup').element();
      assume(radiogroup.getAttribute('dir')).equals('rtl');
    });

    it('disables Scroll previous at start in RTLExample', async function rtlScrollButtonInitialStates() {
      await render(<RTLExample />);

      const prev = page.getByLabelText('Scroll previous');
      const next = page.getByLabelText('Scroll next');

      assume(prev.element().hasAttribute('disabled')).equals(true);
      assume(next.element().hasAttribute('disabled')).equals(false);
    });

    it('scrolls in the RTL direction when clicking Scroll next in RTLExample', async function rtlScrollDirection() {
      const user = userEvent.setup();
      await render(<RTLExample />);

      const scrollArea = page.getByRole('radiogroup').element().firstElementChild;
      if (!scrollArea) throw new Error('Scroll area not found');

      const initialScrollLeft = scrollArea.scrollLeft;

      await user.click(page.getByLabelText('Scroll next'));
      await expect.element(page.getByLabelText('Scroll previous')).not.toHaveAttribute('disabled');

      assume(scrollArea.scrollLeft).is.below(initialScrollLeft);
    });

    it('navigates with ArrowRight and ArrowLeft in RTLExample', async function rtlKeyboardNavigation() {
      const user = userEvent.setup();
      await render(<RTLExample />);

      // first item is Electronics, second item is Clothing
      const electronics = page.getByRole('radio', { name: 'Electronics' });
      const clothing = page.getByRole('radio', { name: 'Clothing' });

      await user.click(electronics);
      assume(document.activeElement).equals(electronics.element());

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(clothing.element());

      await user.keyboard('{ArrowLeft}');
      assume(document.activeElement).equals(electronics.element());
    });

    it('flips scroll button icons via CSS transform in RTLExample', async function rtlIconTransform() {
      await render(<RTLExample />);

      const prevBtn = page.getByLabelText('Scroll previous').element();
      const nextBtn = page.getByLabelText('Scroll next').element();

      const prevTransform = getComputedStyle(prevBtn).transform;
      const nextTransform = getComputedStyle(nextBtn).transform;

      // scaleX(-1) is represented as matrix(-1, 0, 0, 1, 0, 0) in computed styles
      assume(prevTransform).includes('-1');
      assume(nextTransform).includes('-1');
    });
  });
});
