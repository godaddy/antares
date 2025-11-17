import { BasicExample } from '../examples/basic.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { OverlayExample } from '../examples/overlay.tsx';
import { SelectExample } from '../examples/select.tsx';
import { FormExample } from '../examples/form.tsx';
import { FocusLock } from '@bento/focus-lock';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import React from 'react';

describe('@bento/focus-lock (browser)', function bentoBrowser() {
  describe('BasicExample', function basicTests() {
    it('renders and opens modal', async function rendersAndOpens() {
      render(<BasicExample />);

      const openButton = page.getByRole('button', { name: 'Open Modal' });
      await openButton.click();

      const modal = page.getByTestId('basic-modal');
      await expect.element(modal).toBeInTheDocument();
    });

    it('closes modal', async function closesModal() {
      render(<BasicExample />);

      const openButton = page.getByRole('button', { name: 'Open Modal' });
      await openButton.click();

      const closeButton = page.getByRole('button', { name: 'Close' });
      await closeButton.click();

      // Modal should be closed
      await expect.element(page.getByTestId('basic-modal')).not.toBeInTheDocument();
    });
  });

  describe('NestedExample', function nestedTests() {
    it('renders nested modals', async function rendersNested() {
      render(<NestedExample />);

      const openOuterButton = page.getByRole('button', { name: 'Open Outer Modal' });
      await openOuterButton.click();

      const outerModal = page.getByTestId('outer-modal');
      await expect.element(outerModal).toBeInTheDocument();

      const openInnerButton = page.getByRole('button', { name: 'Open Inner Modal' });
      await openInnerButton.click();

      const innerModal = page.getByTestId('inner-modal');
      await expect.element(innerModal).toBeInTheDocument();
    });

    it('closes inner modal', async function closesInner() {
      render(<NestedExample />);

      const openOuterButton = page.getByRole('button', { name: 'Open Outer Modal' });
      await openOuterButton.click();

      const openInnerButton = page.getByRole('button', { name: 'Open Inner Modal' });
      await openInnerButton.click();

      const innerModal = page.getByTestId('inner-modal');
      await expect.element(innerModal).toBeInTheDocument();

      // Close the inner modal
      const closeInnerButton = page.getByRole('button', { name: 'Close Inner' });
      await closeInnerButton.click();

      await expect.element(innerModal).not.toBeInTheDocument();
    });

    it('closes outer modal', async function closesOuter() {
      render(<NestedExample />);

      const openOuterButton = page.getByRole('button', { name: 'Open Outer Modal' });
      await openOuterButton.click();

      const outerModal = page.getByTestId('outer-modal');
      await expect.element(outerModal).toBeInTheDocument();

      // Close the outer modal
      const closeOuterButton = page.getByRole('button', { name: 'Close' });
      await closeOuterButton.click();

      await expect.element(outerModal).not.toBeInTheDocument();
    });
  });

  describe('OverlayExample', function overlayTests() {
    it('renders overlay with multiple children', async function rendersOverlay() {
      render(<OverlayExample />);

      const openButton = page.getByRole('button', { name: 'Open Overlay' });
      await openButton.click();

      const backdrop = page.getByTestId('overlay-backdrop');
      const content = page.getByTestId('overlay-content');

      await expect.element(backdrop).toBeInTheDocument();
      await expect.element(content).toBeInTheDocument();
    });

    it('applies data-focus-contained to multiple children', async function dataAttributesMultiple() {
      render(<OverlayExample />);

      const openButton = page.getByRole('button', { name: 'Open Overlay' });
      await openButton.click();

      const backdrop = page.getByTestId('overlay-backdrop');
      const content = page.getByTestId('overlay-content');

      await expect.element(backdrop).toHaveAttribute('data-focus-contained', 'true');
      await expect.element(content).toHaveAttribute('data-focus-contained', 'true');
    });

    it('closes overlay', async function closesOverlay() {
      render(<OverlayExample />);

      const openButton = page.getByRole('button', { name: 'Open Overlay' });
      await openButton.click();

      const closeButton = page.getByRole('button', { name: 'Close' });
      await closeButton.click();

      await expect.element(page.getByTestId('overlay-backdrop')).not.toBeInTheDocument();
    });

    it('closes overlay when backdrop is clicked', async function closesOnBackdropClick() {
      render(<OverlayExample />);

      const openButton = page.getByRole('button', { name: 'Open Overlay' });
      await openButton.click();

      const backdrop = page.getByTestId('overlay-backdrop');
      await expect.element(backdrop).toBeInTheDocument();

      // Click at a specific position on the backdrop (top-left corner, away from the modal content)
      await backdrop.click({ position: { x: 10, y: 10 } });

      await expect.element(page.getByTestId('overlay-backdrop')).not.toBeInTheDocument();
    });
  });

  describe('SelectExample', function selectTests() {
    it('renders select popover with single child', async function rendersSelect() {
      render(<SelectExample />);

      const trigger = page.getByRole('button', { name: 'Select an option...' });
      await trigger.click();

      const popover = page.getByTestId('select-popover');
      await expect.element(popover).toBeInTheDocument();
    });

    it('applies data-focus-contained to single child', async function dataAttributeSingle() {
      render(<SelectExample />);

      const trigger = page.getByRole('button', { name: 'Select an option...' });
      await trigger.click();

      const popover = page.getByTestId('select-popover');
      await expect.element(popover).toHaveAttribute('data-focus-contained', 'true');
    });

    it('selects apple option and closes', async function selectsApple() {
      render(<SelectExample />);

      const trigger = page.getByRole('button', { name: 'Select an option...' });
      await trigger.click();

      const appleOption = page.getByRole('option', { name: 'Apple' });
      await appleOption.click();

      await expect.element(page.getByRole('button', { name: 'Apple' })).toBeInTheDocument();
    });

    it('selects orange option and closes', async function selectsOrange() {
      render(<SelectExample />);

      const trigger = page.getByRole('button', { name: 'Select an option...' });
      await trigger.click();

      const orangeOption = page.getByRole('option', { name: 'Orange' });
      await orangeOption.click();

      await expect.element(page.getByRole('button', { name: 'Orange' })).toBeInTheDocument();
    });

    it('selects banana option and closes', async function selectsBanana() {
      render(<SelectExample />);

      const trigger = page.getByRole('button', { name: 'Select an option...' });
      await trigger.click();

      const bananaOption = page.getByRole('option', { name: 'Banana' });
      await bananaOption.click();

      await expect.element(page.getByRole('button', { name: 'Banana' })).toBeInTheDocument();
    });
  });

  describe('FormExample', function formTests() {
    it('navigates between form steps', async function navigatesSteps() {
      render(<FormExample />);

      await expect.element(page.getByTestId('step-0')).toBeInTheDocument();

      const nextButton = page.getByRole('button', { name: 'Next' });
      await nextButton.click();

      await expect.element(page.getByTestId('step-1')).toBeInTheDocument();
    });

    it('navigates to final step', async function navigatesToFinal() {
      render(<FormExample />);

      // Go to step 1
      let nextButton = page.getByRole('button', { name: 'Next' });
      await nextButton.click();

      await expect.element(page.getByTestId('step-1')).toBeInTheDocument();

      // Go to step 2
      nextButton = page.getByRole('button', { name: 'Next' });
      await nextButton.click();

      await expect.element(page.getByTestId('step-2')).toBeInTheDocument();
    });

    it('navigates backward from final step', async function navigatesBackward() {
      render(<FormExample />);

      // Go to step 1
      let nextButton = page.getByRole('button', { name: 'Next' });
      await nextButton.click();

      // Go to step 2
      nextButton = page.getByRole('button', { name: 'Next' });
      await nextButton.click();

      await expect.element(page.getByTestId('step-2')).toBeInTheDocument();

      // Go back to step 1
      const prevButton = page.getByRole('button', { name: 'Previous' });
      await prevButton.click();

      await expect.element(page.getByTestId('step-1')).toBeInTheDocument();
    });

    it('navigates backward to initial step', async function navigatesToInitial() {
      render(<FormExample />);

      // Go to step 1
      const nextButton = page.getByRole('button', { name: 'Next' });
      await nextButton.click();

      await expect.element(page.getByTestId('step-1')).toBeInTheDocument();

      // Go back to step 0
      const prevButton = page.getByRole('button', { name: 'Previous' });
      await prevButton.click();

      await expect.element(page.getByTestId('step-0')).toBeInTheDocument();
    });
  });

  describe('Data attributes', function dataAttributesTests() {
    it('includes data-focus-contained attribute when contain is true', async function focusContained() {
      render(<BasicExample />);

      const openButton = page.getByRole('button', { name: 'Open Modal' });
      await openButton.click();

      const modal = page.getByTestId('basic-modal');
      await expect.element(modal).toHaveAttribute('data-focus-contained', 'true');
    });

    it('does not include data-focus-contained when contain is false', async function noFocusContained() {
      const TestComponent = function TestComponent() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(true)}>
              Open
            </button>
            {isOpen && (
              <FocusLock contain={false}>
                <div data-testid="not-contained">Content</div>
              </FocusLock>
            )}
          </>
        );
      };

      render(<TestComponent />);

      const openButton = page.getByRole('button', { name: 'Open' });
      await openButton.click();

      const content = page.getByTestId('not-contained');
      await expect.element(content).not.toHaveAttribute('data-focus-contained', 'true');
    });

    it('handles text nodes as children', async function textNodes() {
      const TestComponent = function TestComponent() {
        return <FocusLock contain>Plain text</FocusLock>;
      };

      const { container } = render(<TestComponent />);
      expect(container.innerHTML).toContain('Plain text');
    });

    it('handles fragments with mixed content', async function fragmentContent() {
      const TestComponent = function TestComponent() {
        return (
          <FocusLock contain>
            <div data-testid="first">First</div>
            Text
            <span data-testid="second">Second</span>
          </FocusLock>
        );
      };

      render(<TestComponent />);
      await expect.element(page.getByTestId('first')).toBeInTheDocument();
      await expect.element(page.getByTestId('second')).toBeInTheDocument();
    });

    it('renders null when children is undefined', async function noChildren() {
      const TestComponent = function TestComponent() {
        return <FocusLock contain />;
      };

      const { container } = render(<TestComponent />);
      // Should render nothing
      expect(container.textContent).toBe('');
    });
  });

  describe('Focus callbacks', function focusCallbackTests() {
    it('triggers onFocusEnter and onFocusLeave callbacks', async function triggersCallbacks() {
      const handleFocusEnter = vi.fn();
      const handleFocusLeave = vi.fn();

      const TestComponent = function TestComponent() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <button type="button" onClick={() => setIsOpen(true)} data-testid="open-button">
              Open
            </button>
            {isOpen && (
              <>
                <FocusLock contain={false} onFocusEnter={handleFocusEnter} onFocusLeave={handleFocusLeave}>
                  <div>
                    <button type="button" data-testid="inside-button">
                      Inside
                    </button>
                  </div>
                </FocusLock>
                <button type="button" data-testid="outside-button">
                  Outside
                </button>
              </>
            )}
          </>
        );
      };

      render(<TestComponent />);

      // Open the component
      const openButton = page.getByTestId('open-button');
      await openButton.click();

      // Click inside button to trigger onFocusEnter
      const insideButton = page.getByTestId('inside-button');
      await insideButton.click();

      // Verify onFocusEnter was called
      expect(handleFocusEnter).toHaveBeenCalled();

      // Click outside button to trigger onFocusLeave
      const outsideButton = page.getByTestId('outside-button');
      await outsideButton.click();

      // Verify onFocusLeave was called
      expect(handleFocusLeave).toHaveBeenCalled();
    });

    it('updates data-has-focus attribute when focus state changes', async function updatesHasFocusAttribute() {
      const TestComponent = function TestComponent() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <button type="button" onClick={() => setIsOpen(true)} data-testid="open-button">
              Open
            </button>
            {isOpen && (
              <>
                <FocusLock contain={false}>
                  <div data-testid="focus-container">
                    <button type="button" data-testid="inside-button">
                      Inside
                    </button>
                  </div>
                </FocusLock>
                <button type="button" data-testid="outside-button">
                  Outside
                </button>
              </>
            )}
          </>
        );
      };

      render(<TestComponent />);

      // Open the component
      const openButton = page.getByTestId('open-button');
      await openButton.click();

      const container = page.getByTestId('focus-container');
      const insideButton = page.getByTestId('inside-button');
      const outsideButton = page.getByTestId('outside-button');

      // Click inside to ensure focus
      await insideButton.click();
      await expect.element(container).toHaveAttribute('data-has-focus', 'true');

      // Click outside to move focus away
      await outsideButton.click();
      // Verify focus is no longer within - attribute should not be 'true'
      await expect.element(container).not.toHaveAttribute('data-has-focus', 'true');
    });
  });
});
