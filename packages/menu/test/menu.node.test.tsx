import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Menu, MenuItem, MenuSection } from '../src';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the Menu component to a string with the provided props.
 * @private
 */
function renderToStringMenu(args = {}) {
  return renderToString(<Menu {...args} />);
}

describe('@bento/menu', function bento() {
  it('renders basic menu functionality with sections and data attributes', function consolidatedBasicTest() {
    const emptyResult = renderToStringMenu({
      'aria-label': 'Empty menu'
    });

    assume(emptyResult).includes('role="menu"');
    assume(emptyResult).includes('aria-label="Empty menu"');
    assume(emptyResult).includes('data-empty="true"');
    assume(emptyResult).includes('data-orientation="vertical"');

    const complexResult = renderToString(
      <Menu aria-label="Complex menu" selectionMode="single" orientation="horizontal">
        <MenuSection title="File">
          <MenuItem id="new" textValue="New">
            New
          </MenuItem>
          <MenuItem id="open" textValue="Open">
            Open
          </MenuItem>
        </MenuSection>
        <MenuSection title="Edit">
          <MenuItem id="cut" textValue="Cut">
            Cut
          </MenuItem>
        </MenuSection>
      </Menu>
    );

    assume(complexResult).includes('role="menu"');
    assume(complexResult).includes('aria-label="Complex menu"');
    assume(complexResult).includes('data-selection-mode="single"');
    assume(complexResult).includes('data-orientation="horizontal"');

    assume(complexResult).includes('role="group"');
    assume(complexResult).includes('role="menuitemradio"');
    assume(complexResult).includes('File');
    assume(complexResult).includes('Edit');
    assume(complexResult).includes('New');
    assume(complexResult).includes('Open');
    assume(complexResult).includes('Cut');
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
    it('handles complex nested collections during SSR', function consolidatedSSRTest() {
      const complexResult = renderToString(
        React.createElement(
          Menu,
          {
            'aria-label': 'Complex SSR Menu',
            selectionMode: 'multiple',
            orientation: 'vertical'
          },
          React.createElement(
            MenuSection,
            { title: 'Actions' },
            React.createElement(MenuItem, { textValue: 'Save' }, 'Save'),
            React.createElement(MenuItem, { textValue: 'Save As' }, 'Save As')
          ),
          React.createElement(
            MenuSection,
            { title: 'Tools' },
            React.createElement(MenuItem, { textValue: 'Settings' }, 'Settings')
          ),
          React.createElement(
            MenuItem,
            {
              textValue: 'Link Item',
              href: 'https://example.com',
              target: '_blank'
            },
            'Link Item'
          )
        )
      );

      assume(complexResult).exists();
      assume(complexResult).includes('data-orientation="vertical"');
      assume(complexResult).includes('data-selection-mode="multiple"');

      assume(complexResult).includes('Actions');
      assume(complexResult).includes('Tools');
      assume(complexResult).includes('Save');
      assume(complexResult).includes('Save As');
      assume(complexResult).includes('Settings');
      assume(complexResult).includes('role="group"');
      assume(complexResult).includes('role="menuitemcheckbox"');

      // Link item should render as anchor
      assume(complexResult).includes('<a');
      assume(complexResult).includes('href="https://example.com"');
      assume(complexResult).includes('Link Item');
    });

    it('renders empty state when renderEmptyState is provided', function emptyStateTest() {
      const emptyResult = renderToString(<Menu aria-label="Empty menu" renderEmptyState={() => <div>No items</div>} />);

      assume(emptyResult).includes('No items');
      assume(emptyResult).includes('data-empty="true"');
    });

    it('handles action menu without selection mode', function actionMenuTest() {
      const actionResult = renderToString(
        <Menu aria-label="Action menu" selectionMode="none">
          <MenuItem textValue="Copy">Copy</MenuItem>
          <MenuItem textValue="Paste">Paste</MenuItem>
        </Menu>
      );

      assume(actionResult).includes('Copy');
      assume(actionResult).includes('Paste');
      assume(actionResult).includes('role="menuitem"');
    });
  });
});
