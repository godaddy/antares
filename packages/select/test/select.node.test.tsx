import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import React from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from './test-popover';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';

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
        <ListBox slot="listbox">
          <ListBoxItem id="test" textValue="Test">
            Test
          </ListBoxItem>
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
    // data-open attribute is omitted when false (invariant #16)
    assume(emptyResult).not.includes('data-open');

    // Verify placeholder
    assume(emptyResult).includes('Choose');

    const complexResult = renderToString(
      <Select name="fruit" isRequired isDisabled={false}>
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
        <Select defaultValue="apple">
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

      // Should show default selected value
      assume(result).includes('Apple');
    });

    it('renders select with form integration', function test() {
      const result = renderToString(
        <Select name="fruit" value="apple">
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

      // Verify hidden select exists with correct value
      assume(result).includes('<select');
      assume(result).includes('name="fruit"');
      assume(result).includes('value="apple"');
    });

    it('renders hidden select with label prop', function test() {
      const result = renderToString(
        <Select name="fruit" label="Choose a fruit" value="apple">
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

      // Verify hidden select exists with correct attributes
      assume(result).includes('<select');
      assume(result).includes('name="fruit"');
      assume(result).includes('value="apple"');
    });

    it('does not render hidden select without name prop', function test() {
      const result = renderToString(
        <Select value="apple">
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
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
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
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
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
            <ListBox slot="listbox">
              <ListBoxItem id="test" textValue="Test">
                Test
              </ListBoxItem>
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
            <ListBox slot="listbox">
              <ListBoxSection>
                <Header>Category 1</Header>
                <ListBoxItem id="option1" textValue="Option 1">
                  Option 1
                </ListBoxItem>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Category 2</Header>
                <ListBoxItem id="option2" textValue="Option 2">
                  Option 2
                </ListBoxItem>
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
  });

  describe('SSR Edge Cases', function ssrEdgeCases() {
    it('handles empty state collection with fallback to original collection', function test() {
      // This tests the fallback logic when state.collection is empty
      const result = renderToString(
        <Select name="fallback" defaultSelectedKey="option1">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
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

      // Should render hidden select with options
      assume(result).includes('<select');
      assume(result).includes('name="fallback"');
      assume(result).includes('value="option1"');
      assume(result).includes('Option 1');
    });

    it('handles SSR with no selected key and renders all options', function test() {
      // This tests the collection iteration fallback when no selectedKey
      const result = renderToString(
        <Select name="all-options">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="a" textValue="A">
                A
              </ListBoxItem>
              <ListBoxItem id="b" textValue="B">
                B
              </ListBoxItem>
              <ListBoxItem id="c" textValue="C">
                C
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render all options in hidden select
      assume(result).includes('value="a"');
      assume(result).includes('value="b"');
      assume(result).includes('value="c"');
    });

    it('handles SSR with groups and sections', function test() {
      // This tests collection iteration with sections (non-item types)
      // When there's a selected key in SSR, only that option is rendered (optimization)
      const result = renderToString(
        <Select name="grouped" defaultSelectedKey="fruit1">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxSection>
                <Header>Fruits</Header>
                <ListBoxItem id="fruit1" textValue="Apple">
                  Apple
                </ListBoxItem>
                <ListBoxItem id="fruit2" textValue="Banana">
                  Banana
                </ListBoxItem>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Vegetables</Header>
                <ListBoxItem id="veg1" textValue="Carrot">
                  Carrot
                </ListBoxItem>
              </ListBoxSection>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render the selected option
      assume(result).includes('value="fruit1"');
      assume(result).includes('Apple');
      // Headers should not be in select options
      assume(result).not.includes('<option>Fruits</option>');
      assume(result).not.includes('<option>Vegetables</option>');
    });

    it('handles SSR with selected key and empty collection', function test() {
      // This tests the selectedKey fallback rendering when collection is problematic
      const result = renderToString(
        <Select name="minimal" defaultSelectedKey="selected">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="selected" textValue="Selected Item">
                Selected Item
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render at least the selected value
      assume(result).includes('value="selected"');
    });

    it('handles SSR without name prop (no hidden select)', function test() {
      // This tests that hidden select is not rendered when name is not provided
      const result = renderToString(
        <Select defaultSelectedKey="test">
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

      // Should NOT render hidden select
      assume(result).not.includes('<select');
    });

    it('handles multi-select mode in SSR', function test() {
      // This tests multi-select specific logic
      const result = renderToString(
        <Select selectionMode="multiple" defaultValue={['option1', 'option2']} name="multi">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="option1" textValue="Option 1">
                Option 1
              </ListBoxItem>
              <ListBoxItem id="option2" textValue="Option 2">
                Option 2
              </ListBoxItem>
              <ListBoxItem id="option3" textValue="Option 3">
                Option 3
              </ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render hidden select with name
      assume(result).includes('name="multi"');
      assume(result).includes('<select');
    });

    it('handles SSR with items missing textValue', function test() {
      // This tests items with missing textValue (fallback to empty string)
      const result = renderToString(
        <Select name="no-text-value">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="notext">No Text Value</ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should still render the option
      assume(result).includes('value="notext"');
    });

    it('handles SSR with complex collection structure', function test() {
      // This tests the full collection iteration paths
      const result = renderToString(
        <Select name="complex">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxSection>
                <Header>Section 1</Header>
                <ListBoxItem id="item1" textValue="Item 1">
                  Item 1
                </ListBoxItem>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Section 2</Header>
                <ListBoxItem id="item2" textValue="Item 2">
                  Item 2
                </ListBoxItem>
                <ListBoxItem id="item3" textValue="Item 3">
                  Item 3
                </ListBoxItem>
              </ListBoxSection>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render all item options
      assume(result).includes('value="item1"');
      assume(result).includes('value="item2"');
      assume(result).includes('value="item3"');
    });

    it('handles SSR with deeply nested sections', function test() {
      // This tests the direct iteration fallback path
      const result = renderToString(
        <Select name="nested">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxSection>
                <Header>Nested Section</Header>
                <ListBoxItem id="nested1" textValue="Nested 1">
                  Nested 1
                </ListBoxItem>
                <ListBoxItem id="nested2" textValue="Nested 2">
                  Nested 2
                </ListBoxItem>
              </ListBoxSection>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should render nested options
      assume(result).includes('value="nested1"');
      assume(result).includes('value="nested2"');
    });

    it('handles SSR with empty textValue in collection items', function test() {
      // This tests the textValue || '' fallback
      const result = renderToString(
        <Select name="empty-text">
          <Button slot="trigger">
            <ValueDisplay slot="value" placeholder="Choose" />
          </Button>
          <Popover slot="popover">
            <ListBox slot="listbox">
              <ListBoxItem id="test1" textValue="">
                Empty Text
              </ListBoxItem>
              <ListBoxItem id="test2">No TextValue</ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      );

      // Should still render options even with empty/missing textValue
      assume(result).includes('value="test1"');
      assume(result).includes('value="test2"');
    });
  });
});
