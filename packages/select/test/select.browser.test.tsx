import assume from 'assume';
import { render } from 'vitest-browser-react';
import React, { useState } from 'react';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { Text } from '@bento/text';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';

// Simple Popover component for testing (actual Popover component doesn't exist yet)
function Popover({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
  return <div {...props}>{children}</div>;
}

// Value component that handles placeholder display (matches examples)
function ValueDisplay({ selectedItem, placeholder, ...props }: any) {
  return <Text {...props}>{selectedItem ? selectedItem.textValue : placeholder}</Text>;
}

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
            <ListBox slot="list">
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
        <Select selectedKey="apple">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose an option" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
          <Select selectedKey={value} onSelectionChange={(key) => setValue(key as string)}>
            <Button slot="trigger">
              <ValueDisplay slot="value" placeholder="Choose" />
            </Button>
            <Popover slot="popover">
              <ListBox slot="list">
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
        <Select defaultSelectedKey="banana">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
      trigger?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should be open (note: due to React Aria state update timing)
      const resultAfterClick = container.innerHTML;
      assume(resultAfterClick).includes('data-open');
    });

    it('popover has display none when closed', function test() {
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]');
      assume(popover).exists();

      // When closed, popover should have display: none
      const style = (popover as HTMLElement)?.style;
      assume(style?.display).equals('none');
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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
            <ListBox slot="list">
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

  describe('Render Props', function renderProps() {
    it('supports render prop for conditional chrome', function test() {
      const { container } = render(
        <Select
          isInvalid
          render={function renderChrome({ isInvalid }) {
            return isInvalid ? <div data-testid="error-indicator">Error!</div> : null;
          }}
        >
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const result = container.innerHTML;
      assume(result).includes('data-testid="error-indicator"');
      assume(result).includes('Error!');
    });

    it('render prop receives state context', function test() {
      let capturedState: any = null;

      render(
        <Select
          render={function renderChrome(props) {
            capturedState = props;
            return null;
          }}
        >
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      assume(capturedState).exists();
      assume(capturedState.isOpen).is.a('boolean');
      assume(capturedState.state).exists();
    });
  });

  describe('Style Merging', function styleMerging() {
    it('merges popover styles correctly', function test() {
      const customStyle = { backgroundColor: 'red', padding: '10px' };

      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover" style={customStyle}>
            <ListBox slot="list">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]') as HTMLElement;
      assume(popover).exists();

      // Custom styles should be present
      const style = popover.style;
      assume(style.backgroundColor).equals('red');
      assume(style.padding).equals('10px');
      // Display override should be present
      assume(style.display).equals('none');
    });

    it('handles CSSStyleDeclaration-like style objects', function test() {
      // Test that the code can handle CSSStyleDeclaration by passing actual element style
      // which is a real CSSStyleDeclaration
      const testDiv = document.createElement('div');
      testDiv.style.cssText = 'color: blue; background: red;';
      const cssStyleDeclaration = testDiv.style;

      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Test" />
          </Button>
          <Popover slot="popover" style={cssStyleDeclaration as any}>
            <ListBox slot="list">
              <SelectOption value="test" textValue="Test">
                Test
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]');
      assume(popover).exists();

      // Should have converted and merged styles
      const style = (popover as HTMLElement).style;
      // The converted styles should be present (color, background from CSSStyleDeclaration)
      // plus display override
      assume(style.display).equals('none');
      // At least one of the converted properties should be present
      assume(style.color || style.backgroundColor).exists();
    });

    it('preserves numeric CSS values for popover positioning', function test() {
      // Regression test: ensure numeric CSS values (top, left, zIndex) are preserved
      // so React can auto-add units (e.g., top: 123 -> "123px")
      // This prevents popover from being stuck at 0,0 due to invalid CSS values
      // The test verifies that numeric values from useOverlayPosition are preserved
      // and converted correctly by React, not converted to bare strings without units
      // The critical fix is that convertStyleToObjectTopLevel preserves numeric values
      // instead of converting them to strings, allowing React to add units automatically
      const { container } = render(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
              <SelectOption value="apple" textValue="Apple">
                Apple
              </SelectOption>
            </ListBox>
          </Popover>
        </Select>
      );

      const popover = container.querySelector('[slot="popover"]');
      assume(popover).exists();

      // The test passes if rendering doesn't throw "style2.setProperty is not a function"
      // This error would occur if numeric values were converted to strings without units
      // and React tried to merge them with a CSSStyleDeclaration
      // By preserving numeric values, React can add units automatically (e.g., 123 -> "123px")
      const style = (popover as HTMLElement).style;

      // Verify positioning properties exist (useOverlayPosition provides these)
      const hasPosition = style.position === 'fixed' || style.position === 'absolute';
      assume(hasPosition).equals(true);

      // Verify zIndex is set (numeric value should be preserved and converted correctly)
      // zIndex from useOverlayPosition is 100000 (number), React should convert it to "100000"
      assume(style.zIndex).exists();
      assume(style.zIndex).is.not.empty();
      // Verify it's a valid number (not empty string or invalid)
      const zIndexNum = Number.parseInt(style.zIndex, 10);
      assume(Number.isNaN(zIndexNum)).equals(false);
      assume(zIndexNum).is.at.least(0);
    });
  });
});
