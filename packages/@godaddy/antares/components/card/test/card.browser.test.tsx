import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { ActionsExample } from '../examples/actions.tsx';
import { CustomizationExample } from '../examples/customization.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { FrameExample } from '../examples/frame.tsx';
import { InteractionsExample } from '../examples/interactions.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { LinkExample } from '../examples/link.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';

function bounds(element: Element) {
  return element.getBoundingClientRect();
}

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);

  describe('#Card', function cardTests() {
    beforeEach(resetHover);

    afterEach(function resetInteractions() {
      window.getSelection()?.removeAllRanges();
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    });

    describe('standalone', function standaloneTests() {
      it('renders the Card itself as the native link', async function nativeLink() {
        const { getByRole, getByText } = await render(<LinkExample />);
        const link = getByRole('link', { name: 'Link card' });
        await expect.element(link).toHaveAttribute('href', '/');
        expect(link.element()).toHaveAttribute('data-card', 'interactive');
        await expect.element(getByRole('link', { name: /Find your domain/ })).toHaveAttribute('href', '#domains');
        await userEvent.click(getByText('Layered content'));
        expect(location.hash).toBe('#hosting');
      });

      it('rings a focused link Card', async function linkFocusRing() {
        const { getByRole } = await render(<LinkExample />);
        const link = getByRole('link', { name: 'Link card' });
        await userEvent.click(getByRole('link', { name: /Find your domain/ }));
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect.element(link).toHaveFocus();
        expect(getComputedStyle(link.element()).outlineStyle).toBe('solid');
      });

      it('disables a link Card', async function disabledLink() {
        const { getByRole } = await render(<DisabledExample />);
        const link = getByRole('link', { name: /Disabled link/ });
        await expect.element(link).toHaveAttribute('aria-disabled', 'true');
        await userEvent.click(link, { force: true });
        expect(location.hash).toBe('');
      });

      it('names and describes a static Card surface', async function staticSurfaceName() {
        const { getByRole } = await render(<CustomizationExample />);
        const region = getByRole('region', { name: 'Card without group' });
        await expect.element(region).toHaveAccessibleDescription('Static surface description');
        expect(region.element()).toHaveAttribute('data-card', 'static');
      });

      it('renders an indicator on a Card outside a group as unselected decoration', async function staticIndicator() {
        const { getByTestId } = await render(<CustomizationExample />);
        const indicator = getByTestId('props-static-indicator');
        await expect.element(indicator).toHaveAttribute('aria-hidden', 'true');
        await expect.element(indicator).not.toHaveAttribute('data-selected');
      });

      it('sets the element id on link and static Cards', async function standaloneIds() {
        const { getByRole } = await render(<CustomizationExample />);
        await expect.element(getByRole('link', { name: 'Linked content ref' })).toHaveAttribute('id', 'props-link');
        await expect.element(getByRole('region', { name: 'Card without group' })).toHaveAttribute('id', 'props-static');
      });

      it('forwards refs for rows, links, and static Cards', async function refs() {
        const { getByRole, getByTestId } = await render(<CustomizationExample />);
        await userEvent.click(getByRole('button', { name: 'Check refs' }));
        await expect.element(getByTestId('props-ref-status')).toHaveTextContent('Refs ready');
      });
    });

    describe('selection', function selectionTests() {
      it('toggles each Card in a multiple selection group', async function multiple() {
        const { getByRole, getByTestId } = await render(<MultipleSelectionExample />);
        const privacy = getByRole('row', { name: 'Domain privacy' });
        const email = getByRole('row', { name: 'Professional email' });

        await expect.element(privacy).toHaveAttribute('aria-selected', 'true');
        await expect.element(getByTestId('privacy-indicator')).toHaveAttribute('data-selected', 'true');
        await expect.element(getByTestId('email-indicator')).toHaveTextContent('Add');

        await userEvent.click(email);
        await expect.element(email).toHaveAttribute('aria-selected', 'true');
        await expect.element(getByTestId('email-indicator')).toHaveTextContent('Added');
        await expect.element(privacy).toHaveAttribute('aria-selected', 'true');

        await userEvent.click(privacy);
        await expect.element(privacy).toHaveAttribute('aria-selected', 'false');
        expect(getComputedStyle(email.element()).borderColor).not.toBe(getComputedStyle(privacy.element()).borderColor);
      });

      it('keeps one Card selected in a single selection group', async function single() {
        const { getByRole, getByTestId } = await render(<SingleSelectionExample />);
        await userEvent.click(getByRole('row', { name: 'Pro plan' }));
        await expect.element(getByRole('row', { name: 'Pro plan' })).toHaveAttribute('aria-selected', 'true');
        await expect.element(getByRole('row', { name: 'Starter plan' })).toHaveAttribute('aria-selected', 'false');
        await expect.element(getByTestId('starter-indicator')).not.toHaveAttribute('data-selected');
      });

      it('moves between Cards with arrow keys and selects with Space', async function keyboard() {
        const { getByRole } = await render(<SingleSelectionExample />);
        await userEvent.tab();
        await expect.element(getByRole('row', { name: 'Starter plan' })).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getByRole('row', { name: 'Pro plan' })).toHaveFocus();
        await userEvent.keyboard(' ');
        await expect.element(getByRole('row', { name: 'Pro plan' })).toHaveAttribute('aria-selected', 'true');
      });

      it('names and type-selects a Card by its plain-text children', async function plainTextRow() {
        const { getByRole } = await render(<CustomizationExample />);
        await userEvent.click(getByRole('row', { name: 'Row props card' }));
        await userEvent.keyboard('p');
        await expect.element(getByRole('row', { name: 'Plain text card' })).toHaveFocus();
      });

      it('shares row hover and focus with the indicator', async function indicatorState() {
        const { getByRole, getByTestId } = await render(<InteractionsExample />);
        const row = getByRole('row', { name: 'Option one' });
        await userEvent.hover(row.element().querySelector('p, span')!);
        await expect.element(row).toHaveAttribute('data-hovered', 'true');
        await expect.element(getByTestId('indicator-One')).toHaveAttribute('data-hovered', 'true');

        await userEvent.unhover(row);
        await userEvent.tab();
        await expect.element(row).toHaveFocus();
        await expect.element(getByTestId('indicator-One')).toHaveAttribute('data-focus-visible', 'true');
        expect(getComputedStyle(row.element()).outlineStyle).toBe('solid');
      });

      it('selects from the indicator itself', async function indicatorPress() {
        const { getByRole, getByTestId } = await render(<InteractionsExample />);
        await userEvent.click(getByTestId('indicator-One'));
        await expect.element(getByRole('row', { name: 'Option one' })).toHaveAttribute('aria-selected', 'true');
      });

      it('reports controlled selection changes once', async function controlled() {
        const { getByRole, getByText, getByTestId } = await render(<CustomizationExample />);
        await userEvent.click(getByRole('row', { name: 'Row props card' }));
        await expect.element(getByText('Selection changes: 1')).toBeInTheDocument();
        await expect.element(getByTestId('props-row-indicator')).toHaveAttribute('data-selected', 'true');
      });

      it.each([
        'Disabled with isDisabled',
        'Disabled with disabledKeys'
      ])('does not select a Card %s', async function disabled(name) {
        const { getByRole } = await render(<DisabledExample />);
        const row = getByRole('row', { name: name === 'Disabled with isDisabled' ? 'Backup' : 'SSL' });
        await expect.element(row).toHaveAttribute('aria-disabled', 'true');
        await expect.element(row).toHaveAttribute('data-disabled', 'true');
        await userEvent.click(row, { force: true });
        await expect.element(row).not.toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('row actions', function rowActionTests() {
      it('runs a row action from a press or Enter', async function rowAction() {
        const { getByRole, getByText } = await render(<InteractionsExample selectionMode="none" withAction />);
        await userEvent.click(getByText('One: copy this text.'));
        await expect.element(getByText('Row actions: one')).toBeInTheDocument();

        await userEvent.keyboard('{ArrowDown}');
        await expect.element(getByRole('row', { name: 'Option two' })).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getByText('Row actions: one,two')).toBeInTheDocument();
      });

      it('opens a subscribe Card inside a modal but not from a nested button', async function subscribeModal() {
        const { getByRole } = await render(<ActionsExample />);
        await userEvent.click(getByRole('button', { name: 'Save' }).first());
        await expect.element(getByRole('button', { name: 'Saved' })).toBeInTheDocument();
        await expect.element(getByRole('dialog')).not.toBeInTheDocument();

        await userEvent.click(getByRole('row', { name: 'Join our mailing list' }));
        await expect.element(getByRole('dialog', { name: 'Join our mailing list' })).toBeInTheDocument();
      });
    });

    describe('nested controls', function nestedControlTests() {
      it('keeps React Aria controls independent of the row', async function racControls() {
        const { getByRole, getByText } = await render(<InteractionsExample withAction />);
        const row = getByRole('row', { name: 'Option one' });

        await userEvent.click(getByRole('button', { name: 'Independent One' }));
        await userEvent.click(getByRole('link', { name: 'Independent link One' }));
        await userEvent.click(getByRole('button', { name: 'Menu One' }));
        await userEvent.click(getByRole('menuitem', { name: 'Menu action One' }));

        await expect.element(getByText('Independent activations: 3')).toBeInTheDocument();
        await expect.element(getByText('Row actions: none')).toBeInTheDocument();
        await expect.element(row).toHaveAttribute('aria-selected', 'false');
      });

      it('lets a native checkbox toggle without selecting the row', async function nativeCheckbox() {
        const { getByRole, getByTestId, getByText } = await render(<InteractionsExample />);
        await userEvent.click(getByTestId('native-One'));
        await expect.element(getByTestId('native-One')).toBeChecked();
        await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
        await expect.element(getByRole('row', { name: 'Option one' })).toHaveAttribute('aria-selected', 'false');

        await userEvent.click(getByRole('row', { name: 'Option one' }).getByText('Remember One'));
        await expect.element(getByTestId('native-One')).not.toBeChecked();
        await expect.element(getByRole('row', { name: 'Option one' })).toHaveAttribute('aria-selected', 'false');
      });

      it('keeps editable text out of row selection', async function editable() {
        const { getByRole, getByTestId } = await render(<InteractionsExample />);
        await userEvent.click(getByTestId('editor-One'));
        await expect.element(getByTestId('editor-One')).toHaveFocus();
        await expect.element(getByRole('row', { name: 'Option one' })).toHaveAttribute('aria-selected', 'false');
      });

      it('drags a nested slider without selecting the row', async function slider() {
        const { getByRole } = await render(<InteractionsExample slider />);
        const row = getByRole('row', { name: 'Option one' });
        const track = row.element().querySelector<HTMLElement>('[class*="track"]')!;
        const box = bounds(track);
        await userEvent.dragAndDrop(track, track, {
          sourcePosition: { x: box.width * 0.1, y: box.height / 2 },
          targetPosition: { x: box.width * 0.8, y: box.height / 2 }
        });
        expect(row.element().querySelector<HTMLInputElement>('input[type="range"]')!.value).toBe('80');
        await expect.element(row).toHaveAttribute('aria-selected', 'false');
      });

      it.each(['audio', 'video'] as const)('keeps native %s controls out of row selection', async function media(kind) {
        const { getByRole } = await render(<InteractionsExample media={kind} />);
        const player = getByRole('row', { name: 'Option one' }).element().querySelector(kind)!;
        await userEvent.click(player, { force: true });
        await expect.element(getByRole('row', { name: 'Option one' })).toHaveAttribute('aria-selected', 'false');
      });
    });

    describe('composition', function compositionTests() {
      it('renders a Card nested in a row as a static Card', async function nested() {
        const { getByRole, getByTestId } = await render(<NestedExample />);
        const outer = getByRole('row', { name: 'Outer card' }).element();
        expect(outer.querySelectorAll('[role="row"]')).toHaveLength(0);
        expect(outer.querySelector('[aria-label="Inner card"]')).toHaveAttribute('data-card', 'static');
        await expect.element(getByTestId('outer-indicator')).toHaveAttribute('data-selected', 'true');
        await expect.element(getByTestId('inner-indicator')).not.toHaveAttribute('data-selected');
      });

      it('runs actions and selection inside an iframe', async function framed() {
        const { getByTitle, getByText } = await render(<FrameExample />);
        const frame = getByTitle('Card frame').element() as HTMLIFrameElement;
        await expect.poll(() => frame.contentDocument?.querySelectorAll('[role="row"]').length).toBe(2);
        const frameDocument = frame.contentDocument!;
        const [action, selection] = frameDocument.querySelectorAll<HTMLElement>('[role="row"]');

        action.click();
        await expect.element(getByText('Framed activations: 1')).toBeInTheDocument();
        selection.click();
        await expect.poll(() => selection.getAttribute('aria-selected')).toBe('true');
      });
    });

    describe('layout', function layoutTests() {
      it('stacks media in narrow containers and places it beside content in wide ones', async function containerQuery() {
        const { getByTestId } = await render(<LayoutExample />);
        const media = () => bounds(getByTestId('container-query-media').element());
        const content = () => bounds(getByTestId('container-query-content').element());
        expect(media().bottom).toBeLessThanOrEqual(content().top);

        await page.viewport(800, 800);
        await expect.poll(() => media().right <= content().left).toBe(true);
      });
    });
  });
});
