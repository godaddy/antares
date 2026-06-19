import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { FieldGroupBasic } from '../examples/basic';
import { FieldGroupIconAccessories } from '../examples/icon-accessories';
import { FieldGroupLeadingControl } from '../examples/leading-control';
import { FieldGroupTrailingControl } from '../examples/trailing-control';

async function wait(container: HTMLElement, selector: string) {
  return new Promise<void>(function waitPromise(resolve, reject) {
    // Check if selector element already exists
    if (container.querySelector(selector)) {
      resolve();
      return;
    }

    const timeout = setTimeout(function timeoutHandler() {
      observer.disconnect();
      reject(new Error(`${selector} rendering timeout after 5 seconds`));
    }, 5000);

    const observer = new MutationObserver(function observerHandler() {
      // Resolve when selector is present
      if (container.querySelector(selector)) {
        clearTimeout(timeout);
        observer.disconnect();
        resolve();
        return;
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true
    });
  });
}

describe('@godaddy/antares', function antares() {
  describe('#FieldGroup', function fieldGroupTests() {
    describe('#css-class', function cssClass() {
      it('applies group CSS class', async function appliesClass() {
        const { container } = await render(<FieldGroupBasic />);
        const element = container.querySelector('[role="group"]') as HTMLElement;
        assume(element).exists();
        assume(element.className).includes('group');
      });

      it('merges custom className with group class', async function mergesClassName() {
        const { container } = await render(<FieldGroupBasic className="custom-class" />);
        const element = container.querySelector('[role="group"]') as HTMLElement;
        assume(element.className).includes('group');
        assume(element.className).includes('custom-class');
      });
    });

    describe('#label', function label() {
      it('renders label when provided', async function rendersLabel() {
        const { container } = await render(<FieldGroupBasic label="Mock Label" />);

        const labelEl = container.querySelector('label') as HTMLLabelElement;
        assume(labelEl.textContent).includes('Mock Label');
      });

      it('does not render label when omitted', async function noLabel() {
        const { container } = await render(<FieldGroupBasic label={undefined} />);
        const labels = container.querySelectorAll('label');
        assume(labels.length).equals(0);
      });
    });

    describe('#description', function description() {
      it('renders description when provided', async function rendersDescription() {
        const { container, locator } = await render(<FieldGroupBasic description="Enter your name" />);
        const desc = locator.getByText('Enter your name');
        assume(desc.element()).exists();
        const slotEl = container.querySelector('[slot="description"]');
        assume(slotEl).exists();
      });

      it('does not render description when omitted', async function noDescription() {
        const { container } = await render(<FieldGroupBasic description={undefined} />);
        const descriptions = container.querySelectorAll('[slot="description"]');
        assume(descriptions.length).equals(0);
      });
    });

    describe('#required', function required() {
      it('renders required asterisk when isRequired', async function rendersRequired() {
        const { locator } = await render(<FieldGroupBasic label="Email" isRequired />);

        const labelEl = locator.getByText('Email').element();
        assume(labelEl.textContent).includes('*');
      });
    });

    describe('#leading-control', function leadingControl() {
      it('renders label, description, leading button, and input', async function childrenRendered() {
        const { locator } = await render(<FieldGroupLeadingControl isDisabled={false} />);
        const button = locator.getByRole('button').element();

        assume(button).exists();
        assume(locator.getByText('Enter your phone number')).exists();

        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);

        await userEvent.tab();
      });

      it('marks the group disabled when isDisabled', async function groupDisabled() {
        const { container } = await render(<FieldGroupLeadingControl isDisabled={true} />);
        const group = container.querySelector('[role="group"]') as HTMLElement;

        assume(group.hasAttribute('data-disabled')).equals(true);
      });
    });

    describe('#trailing-control', function trailingControl() {
      it('renders label, description, and trailing button', async function childrenRendered() {
        const { container, locator } = await render(<FieldGroupTrailingControl />);
        const group = container.querySelector('[role="group"]') as HTMLElement;
        const input = locator.getByRole('textbox').element();
        const button = locator.getByRole('button').element();
        const desc = locator.getByText('Search by keyword');

        assume(group).exists();
        assume(input).exists();
        assume(button).exists();
        assume(desc).exists();

        await userEvent.tab();
        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);
      });
    });

    describe('#icon-accessories', function iconAccessories() {
      it('renders label, description, icon, and button', async function childrenRendered() {
        const { container, locator } = await render(<FieldGroupIconAccessories />);
        await wait(container, 'svg');

        const icon = container.querySelector('svg');
        const button = locator.getByRole('button').element();

        assume(container.textContent).includes('Email');
        assume(container.textContent).includes('Enter your email address');
        assume(icon).exists();
        assume(button).exists();
      });
    });
  });
});
