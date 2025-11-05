import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Select, SelectOption, useSelectContext } from '../src';
import { Button } from '@bento/button';
import { Text } from '@bento/text';
import { ListBox, ListBoxSection, Header } from '@bento/listbox';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

// Simple Popover component for testing (actual Popover component doesn't exist yet)
function Popover({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
  return <div {...props}>{children}</div>;
}

// Value component that handles placeholder display (matches examples)
function ValueDisplay({ selectedItem, placeholder, ...props }: any) {
  return <Text {...props}>{selectedItem ? selectedItem.textValue : placeholder}</Text>;
}

/**
 * Renders the `Select` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Select` component.
 * @returns {string} The rendered string representation of the `Select` component.
 * @private
 */
function renderToStringSelect(args = {}) {
  return renderToString(
    <Select {...args}>
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Choose" />
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
}

describe('@bento/select', function bento() {
  it('renders basic select functionality with server-side rendering', function consolidatedBasicTest() {
    const emptyResult = renderToStringSelect({
      'aria-label': 'Select an option'
    });

    // Verify basic structure
    assume(emptyResult).includes('role="combobox"');
    assume(emptyResult).includes('aria-haspopup="listbox"');
    assume(emptyResult).includes('aria-expanded="false"');
    assume(emptyResult).includes('data-open="false"');

    // Verify placeholder
    assume(emptyResult).includes('Choose');

    const complexResult = renderToString(
      <Select name="fruit" isRequired isDisabled={false}>
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

    // Verify hidden select for form submission
    assume(complexResult).includes('<select');
    assume(complexResult).includes('name="fruit"');
    assume(complexResult).includes('aria-hidden="true"');

    // Verify ARIA attributes
    assume(complexResult).includes('role="combobox"');
    assume(complexResult).includes('aria-required="true"');
    assume(complexResult).includes('data-required="true"');

    // Verify content structure
    assume(complexResult).includes('Fruits');
    assume(complexResult).includes('Vegetables');
    assume(complexResult).includes('Apple');
    assume(complexResult).includes('Banana');
    assume(complexResult).includes('Carrot');
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });

  describe('Server-Side Rendering', function serverSideRendering() {
    it('renders select with default selected value', function test() {
      const result = renderToString(
        <Select defaultSelectedKey="apple">
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

      // Should show default selected value
      assume(result).includes('Apple');
    });

    it('renders select with form integration', function test() {
      const result = renderToString(
        <Select name="fruit" selectedKey="apple">
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

      // Verify hidden select exists with correct value
      assume(result).includes('<select');
      assume(result).includes('name="fruit"');
      assume(result).includes('value="apple"');
    });

    it('does not render hidden select without name prop', function test() {
      const result = renderToString(
        <Select selectedKey="apple">
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

      // Without name prop, no hidden select should be rendered
      // Check that if there is a select, it doesn't have the hidden attributes
      const hasHiddenSelect = result.includes('<select') && result.includes('aria-hidden="true"');
      assume(hasHiddenSelect).equals(false);
    });

    it('renders select with validation states', function test() {
      const invalidResult = renderToString(
        <Select isInvalid>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
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

      assume(invalidResult).includes('data-invalid="true"');
      assume(invalidResult).includes('aria-invalid="true"');

      const requiredResult = renderToString(
        <Select isRequired>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
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

      assume(requiredResult).includes('data-required="true"');
      assume(requiredResult).includes('aria-required="true"');

      const disabledResult = renderToString(
        <Select isDisabled>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
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

      assume(disabledResult).includes('data-disabled="true"');
      assume(disabledResult).includes('aria-disabled="true"');
    });

    it('renders select with groups and labels', function test() {
      const result = renderToString(
        <Select>
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="list">
              <ListBoxSection>
                <Header>Category 1</Header>
                <SelectOption value="option1" textValue="Option 1">
                  Option 1
                </SelectOption>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Category 2</Header>
                <SelectOption value="option2" textValue="Option 2">
                  Option 2
                </SelectOption>
              </ListBoxSection>
            </ListBox>
          </Popover>
        </Select>
      );

      // Verify groups are rendered
      assume(result).includes('Category 1');
      assume(result).includes('Category 2');
      assume(result).includes('Option 1');
      assume(result).includes('Option 2');
    });

    it('renders with render prop output', function test() {
      const result = renderToString(
        <Select
          isInvalid
          render={function renderChrome({ isInvalid }) {
            return isInvalid ? <div data-testid="render-output">Error!</div> : null;
          }}
        >
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
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

      // Verify render prop output
      assume(result).includes('data-testid="render-output"');
      assume(result).includes('Error!');
    });
  });

  describe('Context API', function contextAPI() {
    it('useSelectContext throws error when used outside Select', function test() {
      function ComponentUsingContext() {
        useSelectContext();
        return <div>Test</div>;
      }

      let errorThrown = false;
      let errorMessage = '';

      try {
        renderToString(<ComponentUsingContext />);
      } catch (error) {
        errorThrown = true;
        errorMessage = (error as Error).message;
      }

      assume(errorThrown).equals(true);
      assume(errorMessage).includes('Select components must be used within a Select root component');
    });
  });
});
