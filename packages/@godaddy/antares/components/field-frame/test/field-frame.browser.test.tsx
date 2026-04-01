import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { FieldFrameBasic } from '../examples/basic';
import { FieldFrameIconAccessories } from '../examples/icon-accessories';
import { FieldFrameLeadingControl } from '../examples/leading-control';
import { FieldFrameTrailingControl } from '../examples/trailing-control';
import { TextField } from 'react-aria-components';

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

describe('@godaddy/uxcore', function uxcore() {
  describe('#FieldFrame', function fieldFrameTests() {
    describe('#css-class', function cssClass() {
      it('applies frame CSS class', async function appliesClass() {
        const { locator } = await render(<FieldFrameBasic />);
        const element = locator.getByRole('group').element();
        assume(element.className).includes('frame');
      });

      it('merges custom className with frame class', async function mergesClassName() {
        const { locator } = await render(<FieldFrameBasic className="custom-class" />);
        const element = locator.getByRole('group').element();
        assume(element.className).includes('frame');
        assume(element.className).includes('custom-class');
      });
    });

    describe('#label', function label() {
      it('renders label when provided', async function rendersLabel() {
        const { container } = await render(<FieldFrameBasic label="Mock Label" />);

        const label = container.querySelector('label') as HTMLLabelElement;
        assume(label.textContent).includes('Mock Label');
      });

      it('does not render label when omitted', async function noLabel() {
        const { container } = await render(<FieldFrameBasic label={undefined} />);
        const labels = container.querySelectorAll('label');
        assume(labels.length).equals(0);
      });
    });

    describe('#description', function description() {
      it('renders description when provided', async function rendersDescription() {
        const { container, locator } = await render(<FieldFrameBasic description="Enter your name" />);
        const description = locator.getByText('Enter your name');
        assume(description.element()).exists();
        const slotEl = container.querySelector('[slot="description"]');
        assume(slotEl).exists();
        assume(slotEl?.tagName.toLowerCase()).equals('div');
      });

      it('does not render description when omitted', async function noDescription() {
        const { container } = await render(<FieldFrameBasic description={undefined} />);
        const descriptions = container.querySelectorAll('[slot="description"]');
        assume(descriptions.length).equals(0);
      });
    });

    describe('#required', function required() {
      it('renders required asterisk when isRequired', async function rendersRequired() {
        const { locator } = await render(<FieldFrameBasic label="Email" isRequired />);

        const label = locator.getByText('Email').element();
        assume(label.textContent).includes('*');
      });
    });

    describe('#errorMessage', function errorMessage() {
      it('renders FieldError when isInvalid and errorMessage are set', async function rendersError() {
        const { locator } = await render(
          <TextField isInvalid>
            <FieldFrameBasic errorMessage="Please enter a search term" />
          </TextField>
        );

        assume(locator.getByRole('presentation').element().getAttribute('data-invalid')).equals('true');
        assume(locator.getByText('Please enter a search term').element()).exists();
      });

      it('does not render error when isInvalid is false', async function noErrorWhenValid() {
        const { container, locator } = await render(<FieldFrameTrailingControl isInvalid={false} />);

        assume(locator.getByRole('group').element().getAttribute('data-invalid')).equals(null);
        assume(container.textContent?.includes('Please enter a search termr')).equals(false);
      });
    });

    describe('#leading-control', function leadingControl() {
      it('renders label, description, leading button, and input', async function childrenRendered() {
        const { locator } = await render(<FieldFrameLeadingControl isDisabled={false} />);
        const button = locator.getByRole('button').element();

        assume(button).exists();
        assume(locator.getByText('Enter your phone number')).exists();

        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);

        await userEvent.tab();
      });

      it('disables input when isDisabled', async function allDisabled() {
        const { locator } = await render(<FieldFrameLeadingControl isDisabled={true} />);
        const button = locator.getByRole('button').element();

        assume(button.hasAttribute('data-disabled')).equals(true);
      });
    });

    describe('#trailing-control', function trailingControl() {
      it('renders label, description, input, and trailing button', async function childrenRendered() {
        const { locator } = await render(<FieldFrameTrailingControl />);
        const group = locator.getByRole('group').element();
        const button = locator.getByRole('button').element();
        const description = locator.getByText('Search by keyword');

        assume(group).exists();
        assume(button).exists();
        assume(description).exists();

        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);
      });
    });

    describe('#icon-accessories', function iconAccessories() {
      it('renders label, description, and input', async function childrenRendered() {
        const { container, locator } = await render(<FieldFrameIconAccessories />);
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
