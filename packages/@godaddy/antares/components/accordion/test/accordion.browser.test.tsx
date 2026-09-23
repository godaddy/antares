import { createRef } from 'react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetPointer } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { MultipleExample } from '../examples/multiple.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { FormStepsExample } from '../examples/form-steps.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { CompositionExample } from '../examples/composition.tsx';

/** Resolves the real panel controlled by a trigger, failing clearly on broken ARIA wiring. */
function panelFor(trigger: Element): HTMLElement {
  const panelId = trigger.getAttribute('aria-controls');
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!(panel instanceof HTMLElement)) throw new Error('Accordion trigger has no associated panel');
  return panel;
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetPointer);
  beforeEach(async function resetViewport() {
    await page.viewport(900, 900);
  });

  describe('#Accordion', function accordionTests() {
    it('links each heading button to its named panel', async function ariaRelationships() {
      const { container } = await render(<DefaultExample />);

      const root = container.firstElementChild;
      if (!(root instanceof HTMLElement)) throw new Error('Missing accordion root');
      expect(root.tagName).toBe('DIV');
      expect(root.hasAttribute('role')).toBe(false);
      expect(root.hasAttribute('aria-label')).toBe(false);
      const first = page.getByRole('button', { name: 'Can I transfer my domain?' });
      const second = page.getByRole('button', { name: 'How does renewal work?' });
      const firstPanel = panelFor(first.element());
      const secondPanel = panelFor(second.element());
      expect(firstPanel.id).not.toBe(secondPanel.id);
      expect(firstPanel.getAttribute('aria-labelledby')).toBe(first.element().id);
      expect(secondPanel.getAttribute('aria-labelledby')).toBe(second.element().id);
      await expect.element(first).toHaveAttribute('aria-expanded', 'true');
      expect(first.element().closest('[data-collapsible]')?.hasAttribute('data-expanded')).toBe(true);
      await expect.element(second).toHaveAttribute('aria-expanded', 'false');
      await expect.element(page.getByRole('heading', { name: 'Can I transfer my domain?', level: 3 })).toBeVisible();
    });

    it('does not inject inline presentation into the trigger', async function noInlinePresentation() {
      await render(<DefaultExample />);

      const trigger = page.getByRole('button', { name: 'Can I transfer my domain?' }).element();
      expect(trigger.getAttribute('style')).toBeNull();
    });

    it('opens one item and allows all items to close', async function exclusiveExpansion() {
      await render(<DefaultExample />);
      const first = page.getByRole('button', { name: 'Can I transfer my domain?' });
      const second = page.getByRole('button', { name: 'How does renewal work?' });

      await userEvent.click(second);

      await expect.element(first).toHaveAttribute('aria-expanded', 'false');
      await expect.element(second).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(second);

      await expect.element(second).toHaveAttribute('aria-expanded', 'false');
      expect(panelFor(first.element()).getAttribute('aria-hidden')).toBe('true');
      expect(panelFor(second.element()).getAttribute('aria-hidden')).toBe('true');
    });

    it('keeps multiple sections open and closes each independently', async function multipleExpansion() {
      await render(<MultipleExample />);
      const shipping = page.getByRole('button', { name: 'Shipping' });
      const returns = page.getByRole('button', { name: 'Returns' });

      await expect.element(shipping).toHaveAttribute('aria-expanded', 'true');
      await expect.element(returns).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(shipping);

      await expect.element(shipping).toHaveAttribute('aria-expanded', 'false');
      await expect.element(returns).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(shipping);

      await expect.element(shipping).toHaveAttribute('aria-expanded', 'true');
      await expect.element(returns).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(shipping);
      await userEvent.click(returns);

      await expect.element(shipping).toHaveAttribute('aria-expanded', 'false');
      await expect.element(returns).toHaveAttribute('aria-expanded', 'false');
    });

    it('preserves every key in controlled multiple expansion', async function controlledMultiple() {
      const onChange = vi.fn();
      await render(<ControlledExample allowsMultipleExpanded onChange={onChange} />);
      const account = page.getByRole('button', { name: 'Account', exact: true });
      const billing = page.getByRole('button', { name: 'Billing' });

      await userEvent.click(billing);

      expect(onChange).toHaveBeenCalledExactlyOnceWith(new Set(['account', 'billing']));
      await expect.element(account).toHaveAttribute('aria-expanded', 'true');
      await expect.element(billing).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(account);

      expect(onChange).toHaveBeenLastCalledWith(new Set(['billing']));
      expect(onChange).toHaveBeenCalledTimes(2);
      await expect.element(account).toHaveAttribute('aria-expanded', 'false');
      await expect.element(billing).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(page.getByRole('button', { name: 'Close all sections' }));

      await expect.element(billing).toHaveAttribute('aria-expanded', 'false');
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('starts closed when no initial key is supplied', async function startsClosed() {
      await render(<DisabledExample />);

      await expect.element(page.getByRole('button', { name: 'Basic plan' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('uses Enter and Space without moving focus into the panel', async function keyboardActivation() {
      await render(<DefaultExample defaultExpandedKeys={[]} />);
      const first = page.getByRole('button', { name: 'Can I transfer my domain?' });

      first.element().focus();
      await userEvent.keyboard('{Enter}');

      await expect.element(first).toHaveAttribute('aria-expanded', 'true');
      await expect.element(first).toHaveFocus();

      await userEvent.keyboard(' ');

      await expect.element(first).toHaveAttribute('aria-expanded', 'false');
      await expect.element(first).toHaveFocus();
    });

    it('tabs between closed headers and back without exposing hidden controls', async function tabOrder() {
      await render(<FormStepsExample />);
      const contact = page.getByRole('button', { name: 'Contact details' });
      const payment = page.getByRole('button', { name: 'Payment details' });

      await userEvent.click(contact);
      await userEvent.tab();

      await expect.element(payment).toHaveFocus();

      await userEvent.tab({ shift: true });

      await expect.element(contact).toHaveFocus();
      await expect.element(page.getByRole('textbox', { name: 'Name' })).not.toBeInTheDocument();

      await userEvent.keyboard('{Enter}');
      await userEvent.tab();

      await expect.element(page.getByRole('textbox', { name: 'Name' })).toHaveFocus();
    });

    it('reports the React Aria Set per user activation', async function controlledChanges() {
      const onChange = vi.fn();
      await render(<ControlledExample onChange={onChange} />);
      const billing = page.getByRole('button', { name: 'Billing' });

      await userEvent.click(billing);

      expect(onChange).toHaveBeenCalledExactlyOnceWith(new Set(['billing']));
      await expect.element(page.getByText('Open panels: billing')).toBeVisible();

      await userEvent.click(billing);

      expect(onChange).toHaveBeenLastCalledWith(new Set());
      expect(onChange).toHaveBeenCalledTimes(2);

      await userEvent.click(page.getByRole('button', { name: 'Account', exact: true }));
      await userEvent.click(page.getByRole('button', { name: 'Close all sections' }));

      await expect.element(page.getByText('Open panels: none')).toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('keeps the last state during rapid alternation', async function rapidActivation() {
      await render(<DefaultExample />);
      const first = page.getByRole('button', { name: 'Can I transfer my domain?' });
      const second = page.getByRole('button', { name: 'How does renewal work?' });

      await userEvent.click(second);
      await userEvent.click(first);
      await userEvent.click(second);

      await expect.element(first).toHaveAttribute('aria-expanded', 'false');
      await expect.element(second).toHaveAttribute('aria-expanded', 'true');
    });

    it('disables unavailable items and excludes them from keyboard focus', async function disabledItem() {
      await render(<DisabledExample />);
      const basic = page.getByRole('button', { name: 'Basic plan' });
      const premium = page.getByRole('button', { name: 'Premium plan (Upgrade required)' });

      await expect.element(premium).toBeDisabled();

      (premium.element() as HTMLButtonElement).click();

      await expect.element(premium).toHaveAttribute('aria-expanded', 'false');

      basic.element().focus();
      await userEvent.tab();

      expect(document.activeElement).not.toBe(premium.element());
    });

    it('disables every trigger at group level', async function disabledGroup() {
      await render(<DisabledExample isGroupDisabled />);

      await expect.element(page.getByRole('button', { name: 'Basic plan' })).toBeDisabled();
      await expect.element(page.getByRole('button', { name: 'Premium plan (Upgrade required)' })).toBeDisabled();
    });

    it('keeps form values while changing steps and moves focus on Continue', async function persistentForm() {
      await render(<FormStepsExample />);

      await userEvent.fill(page.getByRole('textbox', { name: 'Name' }), 'Taylor');
      await userEvent.click(page.getByRole('button', { name: 'Continue to payment' }));

      await expect.element(page.getByRole('button', { name: 'Payment details' })).toHaveFocus();

      await userEvent.click(page.getByRole('button', { name: 'Contact details' }));

      await expect.element(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Taylor');
    });

    it('isolates nested groups and standalone disclosures from the outer group', async function nestedState() {
      await render(<NestedExample />);

      await userEvent.click(page.getByRole('button', { name: 'Independent detail' }));
      await userEvent.click(page.getByRole('button', { name: 'Inner question' }));

      await expect
        .element(page.getByRole('button', { name: 'Outer question' }))
        .toHaveAttribute('aria-expanded', 'true');

      await expect.element(page.getByText('Independent answer.')).toBeVisible();
      await expect.element(page.getByText('Inner answer.')).toBeVisible();
    });

    it('merges context defaults and forwards refs and consumer handlers', async function compositionContracts() {
      const groupRef = createRef<HTMLDivElement>();
      const itemRef = createRef<HTMLDivElement>();
      const triggerRef = createRef<HTMLButtonElement>();
      const panelRef = createRef<HTMLDivElement>();
      const onPress = vi.fn();
      await render(
        <CompositionExample
          groupRef={groupRef}
          itemRef={itemRef}
          triggerRef={triggerRef}
          panelRef={panelRef}
          onPress={onPress}
        />
      );
      const trigger = page.getByRole('button', { name: 'Composed heading' });

      expect(groupRef.current).toBe(page.getByRole('group', { name: 'Composition' }).element());
      expect(itemRef.current).toBe(trigger.element().closest('[data-collapsible]'));
      expect(triggerRef.current).toBe(trigger.element());
      expect(panelRef.current).toBe(panelFor(trigger.element()));
      await expect.element(trigger).not.toBeDisabled();
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(groupRef.current?.classList.contains('from-context')).toBe(true);
      expect(groupRef.current?.classList.contains('custom-group')).toBe(true);
      expect(itemRef.current?.classList.contains('custom-open')).toBe(true);
      expect(triggerRef.current?.style.textDecoration).toBe('underline');
      expect(triggerRef.current?.classList.contains('custom-trigger')).toBe(true);

      const panelHeading = page.getByRole('heading', { name: 'Panel heading', level: 4 }).element();

      expect(panelHeading.className).not.toBe(trigger.element().parentElement?.className);

      await userEvent.click(trigger);

      expect(onPress).toHaveBeenCalledTimes(1);
      expect(itemRef.current?.classList.contains('custom-closed')).toBe(true);
    });

    it('composes heading props and isolates heading and button defaults in the panel', async function headingBoundary() {
      await render(<CompositionExample />);

      const summary = page.getByRole('heading', { name: 'Composed heading', level: 2 }).element();
      const body = page.getByRole('heading', { name: 'Panel heading', level: 4 }).element();
      expect(summary.classList.contains('custom-heading')).toBe(true);
      expect(body.classList.contains('custom-heading')).toBe(false);
      expect(body.className).not.toBe(summary.className);
      const bodyButton = page.getByRole('button', { name: 'Panel action' }).element();
      expect(bodyButton.hasAttribute('aria-expanded')).toBe(false);
      expect(bodyButton.style.inlineSize).toBe('');
      const bodyIcon = bodyButton.closest('[role="region"]')?.querySelector('svg');
      if (!bodyIcon) throw new Error('Missing panel icon');
      // A named panel slot would throw if the summary's IconContext leaked here.
      expect(bodyIcon.getAttribute('data-icon')).toBe('checkmark');
      expect(bodyIcon.getAttribute('aria-hidden')).toBe('true');
    });

    it('preserves the default button slot without wiring it as a disclosure trigger', async function defaultSlot() {
      const onAuxiliaryPress = vi.fn();
      const onPress = vi.fn();
      await render(<CompositionExample onAuxiliaryPress={onAuxiliaryPress} onPress={onPress} />);
      const auxiliary = page.getByRole('button', { name: 'Independent action' });
      const trigger = page.getByRole('button', { name: 'Composed heading' });

      expect(auxiliary.element().hasAttribute('aria-controls')).toBe(false);
      expect(auxiliary.element().hasAttribute('aria-expanded')).toBe(false);
      expect(auxiliary.element().style.inlineSize).toBe('');

      await userEvent.click(auxiliary);

      expect(onAuxiliaryPress).toHaveBeenCalledTimes(1);
      expect(onPress).not.toHaveBeenCalled();
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('preserves consumer props, RAC states and ARIA with functional className and style', async function functionalPresentation() {
      const onPress = vi.fn();
      await render(
        <CompositionExample
          onPress={onPress}
          triggerProps={{
            className: function triggerClass({ isDisabled }) {
              return isDisabled ? 'custom-disabled' : 'custom-enabled';
            },
            style: function triggerStyle() {
              return { textDecoration: 'underline' };
            }
          }}
        />
      );
      const trigger = page.getByRole('button', { name: 'Composed heading' });
      const element = trigger.element();

      expect(element.classList.contains('custom-enabled')).toBe(true);
      expect(element.getAttribute('slot')).toBe('trigger');
      expect(element.parentElement).toBe(page.getByRole('heading', { name: 'Composed heading', level: 2 }).element());
      expect(element.style.textDecoration).toBe('underline');
      expect(element.style.inlineSize).toBe('');

      const indicator = element.querySelector<SVGSVGElement>('[data-icon="chevron-down"]');
      if (!indicator) throw new Error('Missing composed indicator');

      expect(indicator.getAttribute('aria-hidden')).toBe('true');
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');

      await trigger.hover();

      await expect.element(trigger).toHaveAttribute('data-hovered');

      await userEvent.click(trigger);

      expect(onPress).toHaveBeenCalledTimes(1);
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(panelFor(element).getAttribute('aria-labelledby')).toBe(element.id);
    });

    it('keeps local button disabled and style overrides while inheriting disclosure wiring', async function buttonOverrides() {
      const onPress = vi.fn();
      await render(
        <CompositionExample
          onPress={onPress}
          triggerProps={{
            variant: 'primary',
            size: 'sm',
            isDisabled: true,
            style: { textDecoration: 'underline' }
          }}
        />
      );
      const trigger = page.getByRole('button', { name: 'Composed heading' });

      await expect.element(trigger).toBeDisabled();
      expect(trigger.element().style.textDecoration).toBe('underline');
      expect(trigger.element().style.inlineSize).toBe('');

      (trigger.element() as HTMLButtonElement).click();

      expect(onPress).not.toHaveBeenCalled();
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('preserves naming, refs and interaction with a custom group renderer', async function customSurface() {
      const groupRef = createRef<HTMLDivElement>();
      await render(<CompositionExample customSurface groupRef={groupRef} />);
      const group = page.getByRole('group', { name: 'Composition' });
      expect(groupRef.current).toBe(group.element());
      await expect.element(group).toHaveAttribute('data-custom-surface');
      const trigger = page.getByRole('button', { name: 'Composed heading' });
      await userEvent.click(trigger);
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('forwards callback refs to the button', async function callbackRef() {
      let element: HTMLButtonElement | null = null;

      await render(
        <CompositionExample
          triggerRef={function setTriggerRef(node) {
            element = node;
          }}
        />
      );

      expect(element).toBe(page.getByRole('button', { name: 'Composed heading' }).element());
    });

    it('marks the panel hidden when collapsed', async function hiddenPanel() {
      await render(<DefaultExample />);
      const trigger = page.getByRole('button', { name: 'Can I transfer my domain?' });
      const panel = panelFor(trigger.element());

      await userEvent.click(trigger);

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect.poll(() => panel.getAttribute('hidden')).toBe('until-found');
    });

    it('can reveal content through the browser beforematch event', async function browserSearch() {
      await render(<DefaultExample defaultExpandedKeys={[]} />);
      const trigger = page.getByRole('button', { name: 'How does renewal work?' });

      panelFor(trigger.element()).dispatchEvent(new Event('beforematch'));

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');

      await expect.element(page.getByText('Enable automatic renewal in your account settings.')).toBeVisible();
    });
  });
});
