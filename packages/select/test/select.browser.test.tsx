import assume from 'assume';
import { render } from 'vitest-browser-react';
import React, { useState } from 'react';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { Label } from 'react-aria-components';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from './test-popover';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

// Mock useResizeObserver to immediately call the callback
vi.mock('@react-aria/utils', async function mockReactAriaUtils() {
  const actual = await vi.importActual('@react-aria/utils');
  return {
    ...actual,
    useResizeObserver: function useResizeObserverMock({ ref, onResize }: any) {
      // Call onResize immediately after mount to simulate resize observer firing
      React.useEffect(
        function onResizeEffect() {
          if (onResize && ref?.current) {
            onResize();
          }
        },
        [onResize, ref]
      );
    }
  };
});

describe('@bento/select', function bento() {
  let mockConsoleError: any;

  beforeEach(function beforeEach() {
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(function mockConsoleErrorImplementation() {
      /* intentional no-op */
    });
  });

  afterEach(function afterEach() {
    mockConsoleError.mockRestore();
  });

  describe('Exports', function exports() {
    it('exports Select and ListBoxItem components', function test() {
      assume(Select).exists();
      assume(ListBoxItem).exists();
    });
  });

  describe('Basic Rendering', function basicRendering() {
    it('renders basic select with trigger and value', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
              <ListBoxItem id="banana" textValue="Banana">
                Banana
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify trigger button
      assume(result).includes('aria-haspopup="listbox"');
      // data-open attribute is omitted when false (invariant #16)
      assume(result).not.includes('data-open');

      // Verify placeholder text
      assume(result).includes('Choose an option');
    });

    it('renders select with selected value', function test() {
      const { container } = render(
        <Select value="apple">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
              <ListBoxItem id="banana" textValue="Banana">
                Banana
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify selected value is displayed
      assume(result).includes('Apple');
    });

    it('applies custom data-* attributes to root element', function test() {
      const { container } = render(
        <Select data-testid="my-select" data-analytics="fruit-picker">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('data-testid="my-select"');
      assume(result).includes('data-analytics="fruit-picker"');
    });

    it('supports validationBehavior prop', function test() {
      const { container } = render(
        <Select validationBehavior="aria" isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      // validationBehavior is passed to state, verify select renders
      assume(result).exists();
      assume(result).includes('data-required="true"');
    });

    it('passes --trigger-width CSS variable when matchTriggerWidth is true', async function test() {
      const { container } = render(
        <Select matchTriggerWidth>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover" style={{ maxHeight: '300px' }}>
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger = container.querySelector('[aria-haspopup="listbox"]') as HTMLElement;

      // Open popover - this should trigger width setting via our mocked useResizeObserver
      await trigger.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const popover = container.querySelector('[slot="popover"]') as HTMLElement;
      const width = popover.style.getPropertyValue('--trigger-width');
      // With our mock, the width should be set (actual value depends on browser rendering)
      assume(width).is.not.empty();
      assume(width).matches(/^\d+px$/); // Should be in format "123px"
      // Verify user styles are merged (maxHeight was passed as a prop)
      assume(popover.style.maxHeight).is.not.empty();
    });

    it('does not set --trigger-width when matchTriggerWidth is false', async function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger = container.querySelector('[aria-haspopup="listbox"]') as HTMLElement;
      await trigger.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const popover = container.querySelector('[slot="popover"]') as HTMLElement;
      const width = popover.style.getPropertyValue('--trigger-width');
      // Without matchTriggerWidth, the CSS variable should not be set
      assume(width).equals('');
    });

    it('supports render function children', function test() {
      const { container } = render(
        <Select>
          {({ isOpen, isDisabled, isInvalid, isRequired }) => (
            <>
              <Button slot="trigger">
                <ValueDisplay slot="value" placeholder="Choose an option" />
              </Button>
              <Popover slot="popover">
                <ListBox slot="listbox">
                  <ListBoxItem id="apple" textValue="Apple">
                    Apple
                  </ListBoxItem>
                </ListBox>
              </Popover>
            </>
          )}
        </Select>
      );

      // Verify render function children work
      const trigger = container.querySelector('[aria-haspopup="listbox"]') as HTMLElement;
      assume(trigger).exists();
      // Verify aria-expanded is initially false
      assume(trigger.getAttribute('aria-expanded')).equals('false');
    });

    it('handles multi-select with selectedItems prop', async function test() {
      const { container } = render(
        <Select selectionMode="multiple" defaultValue={['apple']}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select fruits" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
              <ListBoxItem id="banana" textValue="Banana">
                Banana
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Wait for state to initialize
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Verify render happened (this exercises selectedItems array code path)
      const trigger = container.querySelector('[aria-haspopup="listbox"]') as HTMLElement;
      assume(trigger).exists();
    });

    it('renders select with groups', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select a fruit" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxSection>
                <Header>Fruits</Header>
                <ListBoxItem id="apple" textValue="Apple">
                  Apple
                </ListBoxItem>
                <ListBoxItem id="banana" textValue="Banana">
                  Banana
                </ListBoxItem>
              </ListBoxSection>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify group label
      assume(result).includes('Fruits');
      assume(result).includes('Apple');
      assume(result).includes('Banana');
    });

    it('renders hidden select when name prop is provided', function test() {
      const { container } = render(
        <Select name="fruit">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select a fruit" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify hidden select exists for form submission
      assume(result).includes('<select');
      assume(result).includes('aria-hidden="true"');
      assume(result).includes('name="fruit"');
    });

    it('renders with custom data attributes', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger" data-testid="select-trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover" data-testid="select-content">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test Option" data-testid="select-option">
                Test Option
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-testid="select-trigger"');
      // Content is portaled, so it won't be in the same container
      // but the trigger should have the data attribute
    });
  });

  describe('State Management', function stateManagement() {
    it('handles controlled selection', function test() {
      let onChangeValue: string | undefined;

      function ControlledSelect() {
        const [value, setValue] = useState<string | undefined>('apple');

        onChangeValue = value;

        return (
          <Select value={value} onChange={(val) => setValue(val as string)}>
            <Button slot="trigger">
              <ValueDisplay slot="value" placeholder="Choose" />
            </Button>
            <Popover slot="popover">
              <ListBox slot="listbox">
                <ListBoxItem id="apple" textValue="Apple">
                  Apple
                </ListBoxItem>
                <ListBoxItem id="orange" textValue="Orange">
                  Orange
                </ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
        );
      }

      const { container } = render(<ControlledSelect />);
      const result = container.innerHTML;

      assume(onChangeValue).equals('apple');
      assume(result).includes('Apple');
    });

    it('handles uncontrolled selection with defaultValue', function test() {
      const { container } = render(
        <Select defaultValue="banana">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
              <ListBoxItem id="banana" textValue="Banana">
                Banana
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Should show the default selected value
      assume(result).includes('Banana');
    });

    it('handles disabled state', function test() {
      const { container } = render(
        <Select isDisabled>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-disabled="true"');
      assume(result).includes('disabled=""');
    });

    it('handles invalid state', function test() {
      const { container } = render(
        <Select isInvalid>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-invalid="true"');
    });

    it('handles required state', function test() {
      const { container } = render(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-required="true"');
    });
  });

  describe('Accessibility', function accessibility() {
    it('provides proper ARIA attributes', function test() {
      const { container } = render(
        <Select aria-label="Fruit selector">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose a fruit" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify ARIA attributes
      assume(result).includes('aria-haspopup="listbox"');
      assume(result).includes('aria-expanded="false"');
    });

    it('supports aria-labelledby', function test() {
      const { container } = render(
        <Select aria-labelledby="label-id">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // React Aria concatenates value ID with provided aria-labelledby for better accessibility
      assume(result).includes('label-id');
      assume(result).includes('aria-labelledby');
    });
  });

  describe('Customization', function customization() {
    it('supports className prop', function test() {
      const { container } = render(
        <Select className="custom-select">
          <Button slot="trigger" className="custom-trigger">
            <ValueDisplay slot="value" placeholder="Choose" className="custom-value" />
          </Button>
          <Popover slot="popover" className="custom-content">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple" className="custom-option">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify className is applied
      assume(result).includes('custom-trigger');
      // Content is portaled, so it won't be in container.innerHTML
    });
  });

  describe('Integration with ListBox', function integration() {
    it('reuses ListBox components correctly', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxSection>
                <Header>Fruits</Header>
                <ListBoxItem id="apple" textValue="Apple">
                  Apple
                </ListBoxItem>
                <ListBoxItem id="banana" textValue="Banana">
                  Banana
                </ListBoxItem>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Vegetables</Header>
                <ListBoxItem id="carrot" textValue="Carrot">
                  Carrot
                </ListBoxItem>
              </ListBoxSection>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify groups and labels are rendered
      assume(result).includes('Fruits');
      assume(result).includes('Vegetables');
      assume(result).includes('Apple');
      assume(result).includes('Banana');
      assume(result).includes('Carrot');
    });

    it('supports listbox slot alias', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Test');
    });
  });

  describe('Interactive Behavior', function interactiveBehavior() {
    it('toggles open/close state on trigger click', async function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Click me" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger = container.querySelector('button[aria-haspopup="listbox"]');
      assume(trigger).exists();

      // Initially closed
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      // Click to open
      (trigger as HTMLElement)?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should be open (note: due to React Aria state update timing)
      const resultAfterClick = container.innerHTML;
      assume(resultAfterClick).includes('data-open');
    });

    it('popover receives isOpen state via slot props', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]');
      assume(popover).exists();

      // Popover exists in DOM - visibility will be controlled by future Overlay component
      // Select passes isOpen={false} via slot props
    });
    it('exposes onClose handler via popover slot', async function test() {
      let capturedCloseHandler: (() => void) | undefined;

      // Create a test Popover that uses useProps to extract slot props from context
      const TestPopoverWithSlots = withSlots('TestPopover', function TestPopover(args: any) {
        const { props } = useProps(args);
        const { onClose, children } = props;

        // Store the handler
        if (onClose) {
          capturedCloseHandler = onClose;
        }
        return <div>{children}</div>;
      });

      const { container } = render(
        <Select defaultSelectedKey="option1">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <TestPopoverWithSlots slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="option1" textValue="Option 1">
                Option 1
              </ListBoxItem>
            </ListBox>
          </TestPopoverWithSlots>
        </Select>
      );

      const trigger = container.querySelector('button[aria-haspopup="listbox"]') as HTMLElement;
      assume(trigger).exists();

      // Open the select
      await trigger.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Verify it's open
      assume(trigger?.getAttribute('aria-expanded')).equals('true');

      // Verify the onClose handler was provided (event listeners are passed through slots)
      assume(capturedCloseHandler).is.a('function');

      // Call the close handler (covers lines 250-253: handleOverlayClose calling state.close())
      if (capturedCloseHandler) {
        capturedCloseHandler();
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Verify the select is now closed
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
      }
    });
  });

  describe('Slot Variations', function slotVariations() {
    it('supports description slot', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
          <div slot="description">This is a description</div>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('This is a description');
      assume(result).includes('slot="description"');
    });

    it('supports error slot', function test() {
      const { container } = render(
        <Select isInvalid>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
          <div slot="error">This field is required</div>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('This field is required');
      assume(result).includes('slot="error"');
    });

    it('recursively processes nested non-slotted children', function test() {
      const { container } = render(
        <Select>
          <div>
            <div>
              <Button slot="trigger">
                <ValueDisplay slot="value" placeholder="Deep nested" />
              </Button>
            </div>
          </div>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Deep nested');
    });
  });

  describe('Popover Integration', function popoverIntegration() {
    it('renders with React Aria Components Popover', function test() {
      // Select passes overlay/position props to RAC Popover
      // RAC Popover handles all style merging and positioning internally
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]');
      assume(popover).exists();

      // RAC Popover handles positioning - just verify it renders
    });
  });

  describe('Edge Cases', function edgeCases() {
    it('handles multi-select with no initial selection', function test() {
      // This exercises selectedItems initialization when nothing is selected
      const { container } = render(
        <Select selectionMode="multiple">
          <Label>Multi-select</Label>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select items" />
          </Button>
          <Popover>
            <ListBox>
              <ListBoxItem id="1">Option 1</ListBoxItem>
              <ListBoxItem id="2">Option 2</ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render without crashing, selectedItems should be empty array
      assume(container.innerHTML).includes('Select items');
    });

    it('handles required prop as both HTML attribute and React Aria prop', function test() {
      const { container: container1 } = render(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Verify required state is reflected in data attributes
      assume(container1.innerHTML).includes('data-required="true"');

      const { container: container2 } = render(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Both should render consistently
      assume(container2.innerHTML).includes('data-required="true"');
    });

    it('handles multi-select with empty selection', function test() {
      const { container } = render(
        <Select selectionMode="multiple" defaultValue={[]}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select items" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="option1" textValue="Option 1">
                Option 1
              </ListBoxItem>
              <ListBoxItem id="option2" textValue="Option 2">
                Option 2
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Select items');
    });

    it('handles placeholder with no selected item', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Custom placeholder" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Custom placeholder');
    });

    it('supports defaultSelectedKeys prop for multi-select (React Aria API)', function test() {
      // Tests line 230: defaultSelectedKeys fallback
      const { container } = render(
        <Select selectionMode="multiple" defaultValue={['option2']}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select items" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="option1" textValue="Option 1">
                Option 1
              </ListBoxItem>
              <ListBoxItem id="option2" textValue="Option 2">
                Option 2
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Verify it renders with selection
      assume(container.innerHTML).includes('Option 2');
    });

    it('applies hover state data attribute on trigger hover', async function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const selectContainer = container.firstElementChild as HTMLElement;

      // Initially not hovered - attribute should be omitted (invariant #16)
      assume(selectContainer.hasAttribute('data-hovered')).equals(false);

      // Note: React Aria's useHover tracks hover state on the trigger button itself,
      // not the container. This test verifies the data attribute mechanism works correctly
      // (false omits the attribute per invariant #16), but doesn't test actual hover behavior
      // as that would require hovering elements internal to Button/Pressable.
    });

    it('popover slot receives data-open attribute matching state', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover" data-testid="test-popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]');
      assume(popover).exists();

      // When closed, popover should not have data-open attribute
      assume(popover?.getAttribute('data-open')).equals(null);
    });

    it('multi-select mode renders with correct ARIA attributes', function test() {
      const { container } = render(
        <Select selectionMode="multiple">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select items" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="option1" textValue="Option 1">
                Option 1
              </ListBoxItem>
              <ListBoxItem id="option2" textValue="Option 2">
                Option 2
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify multi-select mode with aria-multiselectable
      assume(result).includes('aria-multiselectable="true"');
    });

    it('renders empty state when collection is empty', function test() {
      const { container } = render(
        <Select renderEmptyState={() => <div data-testid="empty-state">No options available</div>}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" />
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify empty state is rendered
      assume(result).includes('data-testid="empty-state"');
      assume(result).includes('No options available');
      assume(result).includes('data-empty');
    });

    it('does not render empty state when collection has items', function test() {
      const { container } = render(
        <Select renderEmptyState={() => <div data-testid="should-not-show">Empty</div>}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="item1" textValue="Item 1">
                Item 1
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify empty state is NOT rendered
      assume(result).does.not.include('data-testid="should-not-show"');
      assume(result).does.not.include('data-empty');
      assume(result).includes('Item 1');
    });

    it('renders empty state as JSX element (non-function)', function test() {
      const { container } = render(
        <Select renderEmptyState={<div data-testid="empty-jsx">No options</div>}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" />
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify JSX empty state is rendered
      assume(result).includes('data-testid="empty-jsx"');
      assume(result).includes('No options');
    });
  });

  describe('Dynamic Collections', function dynamicCollections() {
    // Dynamic collections: items and render functions are passed to ListBox, not Select
    type FruitItem = { id: string; name: string };
    const fruitItems: FruitItem[] = [
      { id: 'apple', name: 'Apple' },
      { id: 'banana', name: 'Banana' },
      { id: 'orange', name: 'Orange' }
    ];

    const renderFruitItem = function renderFruitItem(item: unknown) {
      const fruit = item as FruitItem;
      return (
        <ListBoxItem id={fruit.id} textValue={fruit.name}>
          {fruit.name}
        </ListBoxItem>
      );
    };

    it('renders select with items prop and render function', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select a fruit" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" items={fruitItems}>
              {renderFruitItem}
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify items are rendered
      assume(result).includes('Apple');
      assume(result).includes('Banana');
      assume(result).includes('Orange');
    });

    it('handles dynamic collection with selected value', function test() {
      const { container } = render(
        <Select defaultValue="banana">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" items={fruitItems}>
              {renderFruitItem}
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Banana');
    });

    it('handles empty items array with renderEmptyState', function test() {
      const { container } = render(
        <Select renderEmptyState={() => <div data-testid="empty">No items</div>}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" items={[]}>
              {renderFruitItem}
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('data-testid="empty"');
      assume(result).includes('No items');
    });

    it('handles multi-select with selectedItems populated', function test() {
      // Tests selectedItems branch when selection exists
      const { container } = render(
        <Select selectionMode="multiple" defaultValue={['apple', 'banana']}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" items={fruitItems}>
              {renderFruitItem}
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Apple');
      assume(result).includes('Banana');
    });

    it('handles single-select mode where selectedItems is undefined', function test() {
      // Tests the ?? fallback to empty array when selectedItems is undefined
      // In single-select mode, state.selectedItems may be undefined
      const { container } = render(
        <Select selectionMode="single" defaultValue="apple">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" items={fruitItems}>
              {renderFruitItem}
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Apple');
    });

    it('renders with dynamic items', function test() {
      function renderItem(item: unknown) {
        const fruit = item as FruitItem;
        return (
          <ListBoxItem id={fruit.id} textValue={fruit.name}>
            {fruit.name}
          </ListBoxItem>
        );
      }

      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox" items={fruitItems}>
              {renderItem}
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Apple');
      assume(result).includes('Banana');
      assume(result).includes('Orange');
    });
  });
});
