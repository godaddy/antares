import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '../src';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the `ListBox` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `ListBox` component.
 * @returns {string} The rendered string representation of the `ListBox` component.
 * @private
 */
function renderToStringListBox(args = {}) {
  return renderToString(<ListBox {...args} />);
}

describe('@bento/listbox', function bento() {
  it('renders basic listbox functionality with sections and data attributes', function consolidatedBasicTest() {
    const emptyResult = renderToStringListBox({
      'aria-label': 'Empty listbox'
    });

    assume(emptyResult).includes('role="listbox"');
    assume(emptyResult).includes('aria-label="Empty listbox"');
    assume(emptyResult).includes('data-empty="true"');
    assume(emptyResult).includes('data-layout="stack"');
    assume(emptyResult).includes('data-orientation="vertical"');

    const complexResult = renderToString(
      <ListBox aria-label="Complex listbox" selectionMode="multiple" orientation="horizontal">
        <ListBoxSection title="Fruits">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
        </ListBoxSection>
        <ListBoxSection title="Vegetables">
          <Header>Vegetables Header</Header>
          <ListBoxItem id="carrot" textValue="Carrot">
            Carrot
          </ListBoxItem>
        </ListBoxSection>
      </ListBox>
    );

    assume(complexResult).includes('role="listbox"');
    assume(complexResult).includes('aria-label="Complex listbox"');
    assume(complexResult).includes('aria-multiselectable="true"');
    assume(complexResult).includes('data-selection-mode="multiple"');
    assume(complexResult).includes('data-orientation="horizontal"');

    assume(complexResult).includes('role="group"');
    assume(complexResult).includes('role="presentation"');
    assume(complexResult).includes('role="option"');
    assume(complexResult).includes('Fruits');
    assume(complexResult).includes('Vegetables');
    assume(complexResult).includes('Apple');
    assume(complexResult).includes('Banana');
    assume(complexResult).includes('Carrot');

    assume(complexResult).includes('Vegetables Header');
    assume(complexResult).includes('<header');
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
    it('handles complex nested collections and empty state during SSR', function consolidatedSSRTest() {
      const complexResult = renderToString(
        React.createElement(
          ListBox,
          {
            'aria-label': 'Complex SSR List',
            selectionMode: 'multiple',
            orientation: 'horizontal',
            layout: 'stack',
            selectionBehavior: 'replace',
            disallowEmptySelection: true
          },
          React.createElement(
            ListBoxSection,
            { title: 'Fruits' },
            React.createElement(ListBoxItem, { textValue: 'Apple' }, 'Apple'),
            React.createElement(ListBoxItem, { textValue: 'Banana' }, 'Banana')
          ),
          React.createElement(
            ListBoxSection,
            { title: 'Vegetables' },
            React.createElement(ListBoxItem, { textValue: 'Carrot' }, 'Carrot')
          ),
          React.createElement(
            ListBoxItem,
            {
              textValue: 'Link Item',
              href: 'https://example.com',
              target: '_blank',
              download: 'file.pdf'
            },
            'Link Item'
          )
        )
      );

      assume(complexResult).exists();
      assume(complexResult).includes('aria-multiselectable="true"');
      assume(complexResult).includes('data-orientation="horizontal"');
      assume(complexResult).includes('data-layout="stack"');
      assume(complexResult).includes('data-selection-behavior="replace"');

      assume(complexResult).includes('Fruits');
      assume(complexResult).includes('Vegetables');
      assume(complexResult).includes('Apple');
      assume(complexResult).includes('Banana');
      assume(complexResult).includes('Carrot');
      assume(complexResult).includes('role="group"');
      assume(complexResult).includes('role="option"');

      assume(complexResult).includes('href="https://example.com"');
      assume(complexResult).includes('target="_blank"');
      assume(complexResult).includes('download="file.pdf"');
    });

    it('renders empty state during SSR and validates textValue requirement', function emptyStateSSRTest() {
      const mockRenderEmptyState = () =>
        React.createElement('div', { 'data-testid': 'ssr-empty-state' }, 'SSR Empty State');

      const emptyResult = renderToString(
        React.createElement(ListBox, {
          'aria-label': 'SSR Empty Test',
          renderEmptyState: mockRenderEmptyState
          // No children - should trigger empty state rendering
        })
      );

      assume(emptyResult).exists();
      assume(emptyResult).includes('data-testid="ssr-empty-state"');
      assume(emptyResult).includes('SSR Empty State');
      assume(emptyResult).includes('data-empty="true"');

      // Test that listbox with valid items renders correctly
      const validResult = renderToString(
        React.createElement(
          ListBox,
          { 'aria-label': 'Valid List' },
          React.createElement(ListBoxItem, { key: 'test', textValue: 'Valid item' }, 'Valid item')
        )
      );

      assume(validResult).exists();
      assume(validResult).includes('Valid item');
    });
  });

  it('handles nested ListBox components with context state', function test() {
    // By nesting ListBox components, the inner one receives context from the outer one
    const result = renderToString(
      React.createElement(
        ListBox,
        { 'aria-label': 'Outer listbox' },
        React.createElement(
          ListBox,
          { 'aria-label': 'Inner listbox' },
          React.createElement(ListBoxItem, { textValue: 'Item' }, 'Item')
        )
      )
    );

    assume(result).exists();
    assume(result).includes('Inner listbox');
    assume(result).includes('Item');
  });

  it('renders different content based on empty state and render children', function test() {
    // Test the case where hasRenderChildren is false and we have both empty + renderEmptyState
    const emptyResult = renderToString(
      React.createElement(ListBox, {
        'aria-label': 'Empty with render',
        renderEmptyState: () => React.createElement('div', { 'data-testid': 'empty-branch' }, 'Empty content')
      })
    );

    assume(emptyResult).exists();
    assume(emptyResult).includes('data-testid="empty-branch"');

    // Test the case where hasRenderChildren is false, no renderEmptyState, should use renderCollectionItems
    const normalResult = renderToString(
      React.createElement(
        ListBox,
        { 'aria-label': 'Normal collection' },
        React.createElement(ListBoxItem, { textValue: 'Test' }, 'Test')
      )
    );

    assume(normalResult).exists();
    assume(normalResult).includes('Test');
  });

  it('handles standalone ListBox without context state', function test() {
    // This happens when a ListBox is used standalone, not nested
    const result = renderToString(
      React.createElement(
        ListBox,
        { 'aria-label': 'Standalone listbox' },
        React.createElement(ListBoxItem, { textValue: 'Item' }, 'Item')
      )
    );

    assume(result).exists();
    assume(result).includes('Item');
    assume(result).includes('role="listbox"');
  });

  it('renders function children and handles various content scenarios', function test() {
    // Test hasRenderChildren false branch: children is function BUT items is truthy
    const withItemsResult = renderToString(
      React.createElement(ListBox, {
        'aria-label': 'Function children with items',
        items: [{ id: '1', name: 'Item 1' }],
        children: (item: any) => React.createElement(ListBoxItem, { key: item.id, textValue: item.name }, item.name)
      })
    );

    assume(withItemsResult).exists();
    assume(withItemsResult).includes('Item 1');

    // Test isEmpty false branch: not empty, with renderEmptyState (should not render empty state)
    const notEmptyWithRenderResult = renderToString(
      React.createElement(
        ListBox,
        {
          'aria-label': 'Not empty with render',
          renderEmptyState: () => React.createElement('div', {}, 'Should not show')
        },
        React.createElement(ListBoxItem, { textValue: 'Actual item' }, 'Actual item')
      )
    );

    assume(notEmptyWithRenderResult).exists();
    assume(notEmptyWithRenderResult).includes('Actual item');
    assume(notEmptyWithRenderResult).does.not.include('Should not show');

    // Test children is NOT a function (string children)
    const stringChildrenResult = renderToString(
      React.createElement(ListBox, { 'aria-label': 'String children' }, 'String content directly')
    );

    assume(stringChildrenResult).exists();

    // Test children is NOT a function (JSX element children)
    const elementChildrenResult = renderToString(
      React.createElement(
        ListBox,
        { 'aria-label': 'Element children' },
        React.createElement(ListBoxItem, { textValue: 'Element' }, 'Element')
      )
    );

    assume(elementChildrenResult).exists();
    assume(elementChildrenResult).includes('Element');
  });

  it('renders ListBoxSection with children content', function test() {
    const result = renderToString(
      <ListBox aria-label="Fallback test">
        <ListBoxSection title="Test Section">
          <ListBoxItem textValue="Item">Item</ListBoxItem>
        </ListBoxSection>
      </ListBox>
    );

    assume(result).includes('Test Section');
    assume(result).includes('Item');
  });
});
