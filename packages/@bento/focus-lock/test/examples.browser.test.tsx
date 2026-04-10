import { BasicExample } from '../examples/basic';
import { FormExample } from '../examples/form';
import { SelectExample } from '../examples/select';
import { NestedExample } from '../examples/nested';
import { OverlayExample } from '../examples/overlay';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import assume from 'assume';

describe('@bento/focus-lock examples', function bento() {
  describe('Basic', function basicExample() {
    it('renders the open button initially', async function test() {
      const { container } = await render(<BasicExample />);
      const result = container.innerHTML;

      assume(result).includes('data-testid="open-button"');
      assume(result).includes('Open Modal');
      assume(result).does.not.include('data-testid="basic-modal"');
    });

    it('opens modal when button is clicked', async function test() {
      const { container } = await render(<BasicExample />);
      const openButton = container.querySelector('[data-testid="open-button"]');

      await userEvent.click(openButton!);

      const result = container.innerHTML;
      assume(result).includes('data-testid="basic-modal"');
      assume(result).includes('Modal Title');
      assume(result).includes('Modal content with contained focus.');
      assume(result).includes('data-focus-contained="true"');
    });

    it('closes modal when close button is clicked', async function test() {
      const { container } = await render(<BasicExample />);
      const openButton = container.querySelector('[data-testid="open-button"]');

      await userEvent.click(openButton!);
      assume(container.innerHTML).includes('data-testid="basic-modal"');

      const closeButton = container.querySelector('[data-testid="close-button"]');
      await userEvent.click(closeButton!);

      assume(container.innerHTML).does.not.include('data-testid="basic-modal"');
    });

    it('restores focus to open button when modal closes', async function test() {
      const { container } = await render(<BasicExample />);
      const openButton = container.querySelector('[data-testid="open-button"]');

      await userEvent.click(openButton!);
      const closeButton = container.querySelector('[data-testid="close-button"]');
      await userEvent.click(closeButton!);

      expect(openButton).toHaveFocus();
    });
  });

  describe('Form', function formExample() {
    it('renders form wizard with all steps and navigation', async function test() {
      const { container } = await render(<FormExample />);
      const result = container.innerHTML;

      assume(result).includes('Account Type');
      assume(result).includes('Contact Preference');
      assume(result).includes('Review');
      assume(result).includes('data-testid="step-0"');
      assume(result).includes('data-focus-contained="true"');
      assume(result).includes('step active');

      let buttons = container.querySelectorAll('button:not([value])');
      await userEvent.click(buttons[0]!);

      assume(container.innerHTML).includes('data-testid="step-1"');
      assume(container.innerHTML).includes('How would you like to be contacted?');

      buttons = container.querySelectorAll('button:not([value])');
      await userEvent.click(buttons[0]!);
      assume(container.innerHTML).includes('data-testid="step-0"');

      buttons = container.querySelectorAll('button:not([value])');
      await userEvent.click(buttons[0]!);
      buttons = container.querySelectorAll('button:not([value])');
      await userEvent.click(buttons[1]!);
      assume(container.innerHTML).includes('data-testid="step-2"');
      assume(container.innerHTML).includes('Not selected');

      const previousButton = container.querySelector('button:not([type="submit"])');
      await userEvent.click(previousButton!);
      assume(container.innerHTML).includes('data-testid="step-1"');

      const emailRadio = container.querySelector('[value="email"]');
      await userEvent.click(emailRadio!);

      buttons = container.querySelectorAll('button:not([value])');
      await userEvent.click(buttons[1]!);
      assume(container.innerHTML).includes('Contact Method: email');
    });
  });

  describe('Select', function selectExample() {
    it('renders select button and opens popover', async function test() {
      const { container } = await render(<SelectExample />);
      const result = container.innerHTML;

      assume(result).includes('Select an option...');
      assume(result).does.not.include('data-testid="select-popover"');

      const button = container.querySelector('button');
      await userEvent.click(button!);

      assume(container.innerHTML).includes('data-testid="select-popover"');
      assume(container.innerHTML).includes('data-focus-contained="true"');
      assume(container.innerHTML).includes('Apple');
      assume(container.innerHTML).includes('Orange');
      assume(container.innerHTML).includes('Banana');
    });

    it('selects an item and closes popover', async function test() {
      const { container } = await render(<SelectExample />);
      const button = container.querySelector('button');

      await userEvent.click(button!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const appleOption = container.querySelector('[role="option"][data-key="apple"]') as HTMLElement;
      await userEvent.click(appleOption);
      await new Promise((resolve) => setTimeout(resolve, 100));

      assume(button?.textContent).includes('apple');
      assume(container.innerHTML).does.not.include('data-testid="select-popover"');

      // Open again to test closing without selection (covers empty branch)
      await userEvent.click(button!);
      await new Promise((resolve) => setTimeout(resolve, 50));
      await userEvent.click(button!);
      assume(container.innerHTML).does.not.include('data-testid="select-popover"');
    });
  });

  describe('Nested', function nestedExample() {
    it('renders and opens outer modal', async function test() {
      const { container } = await render(<NestedExample />);
      const result = container.innerHTML;

      assume(result).includes('data-testid="open-outer-button"');
      assume(result).does.not.include('data-testid="outer-modal"');

      const button = container.querySelector('[data-testid="open-outer-button"]');
      await userEvent.click(button!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      assume(container.innerHTML).includes('data-testid="outer-modal"');
      assume(container.innerHTML).includes('data-focus-contained="true"');
    });

    it('opens inner modal from outer modal', async function test() {
      const { container } = await render(<NestedExample />);

      const outerButton = container.querySelector('[data-testid="open-outer-button"]');
      await userEvent.click(outerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const innerButton = container.querySelector('[data-testid="open-inner-button"]');
      await userEvent.click(innerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      assume(container.innerHTML).includes('data-testid="inner-modal"');
      assume(container.innerHTML).includes('Focus is contained within this inner modal');
    });

    it('closes inner modal and restores focus to outer modal', async function test() {
      const { container } = await render(<NestedExample />);

      const outerButton = container.querySelector('[data-testid="open-outer-button"]');
      await userEvent.click(outerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const innerButton = container.querySelector('[data-testid="open-inner-button"]');
      await userEvent.click(innerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const closeInnerButton = container.querySelector('[data-testid="close-inner-button"]');
      await userEvent.click(closeInnerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      assume(container.innerHTML).does.not.include('data-testid="inner-modal"');
      assume(container.innerHTML).includes('data-testid="outer-modal"');
    });

    it('closes outer modal', async function test() {
      const { container } = await render(<NestedExample />);

      const outerButton = container.querySelector('[data-testid="open-outer-button"]');
      await userEvent.click(outerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const closeOuterButton = container.querySelector('[data-testid="close-outer-button"]');
      await userEvent.click(closeOuterButton!);

      assume(container.innerHTML).does.not.include('data-testid="outer-modal"');
    });
  });

  describe('Overlay', function overlayExample() {
    it('renders and opens overlay with focus contained', async function test() {
      const { container } = await render(<OverlayExample />);
      const result = container.innerHTML;

      assume(result).includes('data-testid="open-overlay-button"');
      assume(result).does.not.include('data-testid="overlay-content"');

      const button = container.querySelector('[data-testid="open-overlay-button"]');
      await userEvent.click(button!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const content = container.querySelector('[data-testid="overlay-content"]');
      assume(content).is.truthy();
      assume(content?.getAttribute('data-focus-contained')).equals('true');
      assume(container.innerHTML).includes('Overlay with Multiple Children');
    });

    it('closes overlay with close button', async function test() {
      const { container } = await render(<OverlayExample />);

      const openButton = container.querySelector('[data-testid="open-overlay-button"]');
      await userEvent.click(openButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const closeButton = container.querySelector('[data-testid="close-overlay-button"]');
      await userEvent.click(closeButton!);

      assume(container.innerHTML).does.not.include('data-testid="overlay-content"');
    });

    it('closes overlay when clicking backdrop', async function test() {
      const { container } = await render(<OverlayExample />);

      const openButton = container.querySelector('[data-testid="open-overlay-button"]');
      await userEvent.click(openButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const backdrop = container.querySelector('[data-testid="overlay-backdrop"]');
      await userEvent.click(backdrop!);

      assume(container.innerHTML).does.not.include('data-testid="overlay-content"');
    });
  });
});
