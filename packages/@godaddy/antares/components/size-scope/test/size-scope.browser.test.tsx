import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { OverlaysExample } from '../examples/overlays.tsx';
import { ScenariosExample } from '../examples/scenarios.tsx';

function style(element: Element) {
  return getComputedStyle(element);
}

const smControl = '14.2222px';

function box(element: Element) {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}

describe('@godaddy/antares', function antares() {
  describe('#SizeScope', function sizeScopeTests() {
    it('sizes controls from the nearest scope, with md outside any scope', async function controls() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('unscoped').element()).fontSize).toEqual('16px');
      expect(style(getByTestId('unscoped').element()).paddingBlockStart).toEqual('8px');
      expect(style(getByTestId('sm').element()).fontSize).toEqual(smControl);
      expect(style(getByTestId('sm').element()).paddingBlockStart).toEqual('4px');
      expect(style(getByTestId('lg').element()).fontSize).toEqual('18px');
      expect(style(getByTestId('lg').element()).paddingBlockStart).toEqual('12px');
    });

    it("gives a scoped Button the Button's own size for that tier", async function buttonTier() {
      const { getByTestId } = await render(<ScenariosExample />);
      const padding = (id: string) => style(getByTestId(id).element()).padding;

      expect(padding('token-md')).toEqual(padding('token-unscoped'));
      expect(padding('token-sm')).toEqual(padding('token-explicit-sm'));
      expect(padding('token-sm')).toEqual('6px 10px');
    });

    it('replaces the size in a nested scope rather than compounding it', async function nested() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('sm-in-sm').element()).fontSize).toEqual(smControl);
    });

    it('lets an explicit size win for that component only', async function explicit() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('explicit-md').element()).fontSize).toEqual('16px');
      expect(style(getByTestId('sm').element()).fontSize).toEqual(smControl);
    });

    it('sizes every part of a field from its explicit size inside a scope', async function explicitField() {
      const { getByRole, getByText } = await render(<ScenariosExample />);
      const input = getByRole('textbox', { name: 'Seats' }).element();
      const stepper = getByRole('button', { name: 'Increase Seats' }).element();
      const trigger = getByRole('button', { name: /Start date/ });

      expect(style(input).fontSize).toEqual('16px');
      expect(style(stepper).fontSize).toEqual('16px');
      expect(style(stepper).paddingBlockStart).toEqual(style(input).paddingBlockStart);
      expect(style(trigger.element()).fontSize).toEqual('16px');
      expect(style(getByText('Start date', { exact: true }).element()).fontSize).toEqual('14px');

      await userEvent.click(trigger);
      await expect.element(getByRole('dialog')).toBeVisible();
      expect(style(getByRole('dialog').element()).fontSize).toEqual('16px');
    });

    it("sizes a field's control and trigger buttons from the field, not the scope", async function fieldButtons() {
      const { getByRole } = await render(<ScenariosExample />);
      const input = style(getByRole('textbox', { name: 'Phone number' }).element());

      for (const button of [getByRole('button', { name: 'Verify' }), getByRole('button', { name: /Country/ })]) {
        expect(style(button.element()).fontSize).toEqual('16px');
        expect(style(button.element()).paddingBlockStart).toEqual(input.paddingBlockStart);
      }
    });

    it('sizes Text but leaves plain HTML at the page typography', async function plainHtml() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('text').element()).fontSize).toEqual('14px');
      expect(style(getByTestId('bare').element()).fontSize).toEqual(style(document.body).fontSize);
    });

    it('sizes the labels of checkboxes and radios', async function choiceLabels() {
      const { getByText } = await render(<ScenariosExample />);

      expect(style(getByText('Accept terms').element()).fontSize).toEqual('14px');
      expect(style(getByText('Basic plan').element()).fontSize).toEqual('14px');
    });

    it('applies each role at the scope tier', async function roles() {
      const { getByTestId, getByRole } = await render(<ScenariosExample />);

      expect(style(getByTestId('detail').element()).fontSize).toEqual('12px');
      expect(style(getByTestId('label').element()).fontSize).toEqual('12px');
      expect(style(getByTestId('label').element()).fontWeight).toEqual('500');
      expect(style(getByRole('heading', { name: 'Level two' }).element()).fontSize).toEqual('18px');
    });

    it('keeps semantic emphasis over the role weight', async function strong() {
      const { getByTestId } = await render(<ScenariosExample />);
      const weight = (id: string) => Number(style(getByTestId(id).element()).fontWeight);

      expect(weight('strong-detail')).toBeGreaterThan(weight('detail'));
      expect(weight('strong-description')).toBeGreaterThan(weight('description'));
    });

    it('sizes an unscoped field like md under a token theme', async function unscopedTokens() {
      const { getByRole } = await render(<ScenariosExample />);

      expect(style(getByRole('textbox', { name: 'Rooms' }).element()).fontSize).toEqual('20px');
      expect(style(getByRole('button', { name: 'Increase Rooms' }).element()).fontSize).toEqual('20px');
    });

    it('follows a legacy font size in the scope as an explicit size does', async function legacyFont() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('legacy-scoped').element()).fontSize).toEqual('22.5px');
      expect(style(getByTestId('legacy-explicit').element()).fontSize).toEqual('22.5px');
    });

    it('keeps a composed Text identical to a bare button label', async function composed() {
      const { getByTestId } = await render(<ScenariosExample />);
      const plain = getByTestId('sm').element();
      const composedButton = getByTestId('composed').element();
      const label = composedButton.querySelector('span') as Element;

      expect(box(composedButton)).toEqual(box(plain));
      for (const property of ['fontSize', 'fontFamily', 'fontWeight', 'lineHeight'] as const) {
        expect(style(label)[property]).toEqual(style(plain)[property]);
      }
    });

    it('changes only color and truncation for emphasis and maxLines in a control', async function emphasis() {
      const { getByTestId } = await render(<ScenariosExample />);
      const button = getByTestId('emphasis').element();
      const label = button.querySelector('span') as Element;

      expect(style(label).fontSize).toEqual(style(button).fontSize);
      expect(style(label).fontWeight).toEqual(style(button).fontWeight);
      expect(style(label).color).not.toEqual(style(button).color);
    });

    it('never ties the heading size to its level', async function level() {
      const { getByRole } = await render(<ScenariosExample />);
      const two = getByRole('heading', { name: 'Level two', level: 2 }).element();
      const four = getByRole('heading', { name: 'Level four', level: 4 }).element();

      expect(style(two).fontSize).toEqual(style(four).fontSize);
    });

    it('keeps an explicit size on its own element', async function noLeak() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('sized-text').element()).fontSize).toEqual('20px');
      expect(style(getByTestId('nested-detail').element()).fontSize).toEqual('12px');
    });

    it('lets an explicit prop on a named part win over the owner', async function namedPart() {
      const { getByTestId } = await render(<ScenariosExample />);

      expect(style(getByTestId('description').element()).fontSize).toEqual('12px');
      expect(style(getByTestId('explicit-description').element()).fontSize).toEqual('18px');
    });

    it('renders a named part the same whichever text component fills it', async function partTreatment() {
      const { getByTestId } = await render(<ScenariosExample />);
      const pairs = [
        ['description', 'detail-description'],
        ['explicit-description', 'explicit-detail-description'],
        ['lockup-body', 'lockup-detail-body']
      ];

      for (const [text, detail] of pairs) {
        const textStyle = style(getByTestId(text).element());
        const detailStyle = style(getByTestId(detail).element());
        for (const property of ['fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'color'] as const) {
          expect(detailStyle[property]).toEqual(textStyle[property]);
        }
      }
    });

    it('sizes the text of a lockup but not the controls inside it', async function lockup() {
      const { getByTestId, getByRole } = await render(<ScenariosExample />);

      expect(style(getByRole('heading', { name: 'Lockup title' }).element()).fontSize).toEqual('30px');
      expect(style(getByTestId('lockup-button').element()).fontSize).toEqual(smControl);
    });

    it('opens a modal at the size of the scope around its trigger', async function modal() {
      const { getByRole } = await render(<OverlaysExample />);
      await userEvent.click(getByRole('button', { name: 'Edit plan' }));

      const dialog = getByRole('dialog', { name: 'Edit plan' });
      await expect.element(dialog).toBeVisible();
      expect(style(dialog.getByRole('button', { name: 'Save' }).element()).fontSize).toEqual(smControl);
      expect(style(dialog.getByRole('heading', { name: 'Edit plan' }).element()).fontSize).toEqual('20px');
    });

    it('opens a select list at the declared size, where an explicit size wins', async function select() {
      const { getByRole } = await render(<OverlaysExample />);

      await userEvent.click(getByRole('button', { name: /Plan/ }));
      await expect.element(getByRole('option', { name: 'Basic' })).toBeVisible();
      expect(style(getByRole('option', { name: 'Basic' }).element()).fontSize).toEqual('14px');
      await userEvent.keyboard('{Escape}');

      await userEvent.click(getByRole('button', { name: /Region/ }));
      await expect.element(getByRole('option', { name: 'Europe' })).toBeVisible();
      expect(style(getByRole('option', { name: 'Europe' }).element()).fontSize).toEqual('18px');
    });

    it('opens a tooltip at the size of the scope around its trigger', async function tooltip() {
      const { getByRole } = await render(<OverlaysExample />);
      await userEvent.hover(getByRole('button', { name: 'Help' }));

      const tooltip = getByRole('tooltip');
      await expect.element(tooltip).toBeVisible();
      expect(style(tooltip.element()).fontSize).toEqual('14px');
    });
  });
});
