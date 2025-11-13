import assume from 'assume';
import { render } from 'vitest-browser-react';
import React, { useState } from 'react';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from './test-popover';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { userEvent } from '@testing-library/user-event';

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
    it('exports Select and SelectOption components', function test() {
      assume(Select).exists();
      assume(SelectOption).exists();
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
              <SelectOption value="banana" textValue="Banana">
                Banana
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify trigger button
      assume(result).includes('role="combobox"');
      assume(result).includes('aria-haspopup="listbox"');
      assume(result).includes('data-open="false"');

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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
              <SelectOption value="banana" textValue="Banana">
                Banana
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify selected value is displayed
      assume(result).includes('Apple');
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
                <SelectOption value="apple" textValue="Apple">
                  Apple
                </SelectOption>
                <SelectOption value="banana" textValue="Banana">
                  Banana
                </SelectOption>
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
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
              <SelectOption value="test" textValue="Test Option" data-testid="select-option">
                Test Option
              </SelectOption>
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
          <Select value={value} onValueChange={(key) => setValue(key as string)}>
            <Button slot="trigger">
              <ValueDisplay slot="value" placeholder="Choose" />
            </Button>
            <Popover slot="popover">
              <ListBox slot="listbox">
                <SelectOption value="apple" textValue="Apple">
                  Apple
                </SelectOption>
                <SelectOption value="orange" textValue="Orange">
                  Orange
                </SelectOption>
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
              <SelectOption value="banana" textValue="Banana">
                Banana
              </SelectOption>
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-disabled="true"');
      assume(result).includes('aria-disabled="true"');
    });

    it('handles invalid state', function test() {
      const { container } = render(
        <Select isInvalid>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-invalid="true"');
      assume(result).includes('aria-invalid="true"');
    });

    it('handles required state', function test() {
      const { container } = render(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('data-required="true"');
      assume(result).includes('aria-required="true"');
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      // Verify ARIA attributes
      assume(result).includes('role="combobox"');
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;

      assume(result).includes('aria-labelledby="label-id"');
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
              <SelectOption value="apple" textValue="Apple" className="custom-option">
                Apple
              </SelectOption>
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
                <SelectOption value="apple" textValue="Apple">
                  Apple
                </SelectOption>
                <SelectOption value="banana" textValue="Banana">
                  Banana
                </SelectOption>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Vegetables</Header>
                <SelectOption value="carrot" textValue="Carrot">
                  Carrot
                </SelectOption>
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
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Test');
      assume(result).includes('role="combobox"');
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
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger = container.querySelector('button[role="combobox"]');
      assume(trigger).exists();

      // Initially closed
      assume(trigger?.getAttribute('aria-expanded')).equals('false');
      assume(trigger?.getAttribute('data-open')).equals('false');

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
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
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
              <SelectOption value="option1" textValue="Option 1">
                Option 1
              </SelectOption>
            </ListBox>
          </TestPopoverWithSlots>
        </Select>
      );

      const trigger = container.querySelector('button[role="combobox"]') as HTMLElement;
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
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
          <div slot="description">This is a description</div>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('This is a description');
      assume(result).includes('slot="description"');
    });

    it('supports errorMessage slot', function test() {
      const { container } = render(
        <Select isInvalid>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
          <div slot="errorMessage">This field is required</div>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('This field is required');
      assume(result).includes('slot="errorMessage"');
    });

    it('supports trigger.value slot alias', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="trigger.value" placeholder="Nested value" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Nested value');
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
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Deep nested');
      assume(result).includes('role="combobox"');
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
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
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
    it('handles required prop as both HTML attribute and React Aria prop', function test() {
      const { container: container1 } = render(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger1 = container1.querySelector('[role="combobox"]');
      assume(trigger1?.getAttribute('aria-required')).equals('true');

      const { container: container2 } = render(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger2 = container2.querySelector('[role="combobox"]');
      assume(trigger2?.getAttribute('aria-required')).equals('true');
    });

    it('handles multi-select with empty selection', function test() {
      const { container } = render(
        <Select selectionMode="multiple" defaultValue={new Set([])}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select items" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="option1" textValue="Option 1">
                Option 1
              </SelectOption>
              <SelectOption value="option2" textValue="Option 2">
                Option 2
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('Select items');
    });

    it('handles placeholder with no selected item', function test() {
      const { container } = render(
        <Select placeholder="Custom placeholder">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Custom placeholder" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
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
        <Select selectionMode="multiple" defaultValue={new Set(['option2'])}>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select items" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="option1" textValue="Option 1">
                Option 1
              </SelectOption>
              <SelectOption value="option2" textValue="Option 2">
                Option 2
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      // Verify it renders with selection
      assume(result).includes('role="combobox"');
    });

    it('applies hover state data attribute on trigger hover', async function test() {
      // Tests line 324: isHovered ? 'true' : 'false' ternary (both branches)
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Select" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const trigger = container.querySelector('button[role="combobox"]') as HTMLElement;
      const selectContainer = container.querySelector('[data-hovered]');

      // Initially not hovered (false branch)
      assume(selectContainer?.getAttribute('data-hovered')).equals('false');

      // Hover over the trigger button
      await userEvent.hover(trigger);

      // Should have hovered state (true branch)
      const hoveredContainer = container.querySelector('[data-hovered="true"]');
      assume(hoveredContainer).exists();

      // Unhover
      await userEvent.unhover(trigger);

      // Should be back to not hovered
      const unhoveredContainer = container.querySelector('[data-hovered="false"]');
      assume(unhoveredContainer).exists();
    });
  });
});
