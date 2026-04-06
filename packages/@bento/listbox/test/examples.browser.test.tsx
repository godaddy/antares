import { BasicListBoxExample } from '../examples/basic-listbox';
import { DynamicCollectionExample } from '../examples/dynamic-collection';
import { SectionsExample } from '../examples/sections';
import { SectionsDynamicExample } from '../examples/sections-dynamic';
import { SlotsDynamicSectionsExample } from '../examples/slots-dynamic-sections';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/listbox examples', function bento() {
  const testItems = [
    { id: '1', name: 'Chicken Teriyaki' },
    { id: '2', name: 'Salmon Bento' },
    { id: '3', name: 'Beef Bowl' }
  ];

  const testCategories = [
    {
      id: 'main-dishes',
      name: 'Main Dishes',
      items: [
        { id: 'chicken-teriyaki', name: 'Chicken Teriyaki' },
        { id: 'salmon-bento', name: 'Salmon Bento' }
      ]
    },
    {
      id: 'side-dishes',
      name: 'Side Dishes',
      items: [
        { id: 'pickled-vegetables', name: 'Pickled Vegetables' },
        { id: 'edamame', name: 'Edamame' }
      ]
    }
  ];

  describe('Basic ListBox', function basicListBoxExample() {
    it('renders the basic listbox with configuration props', async function configurationProps() {
      const { container } = await render(
        <BasicListBoxExample
          aria-label="Basic listbox"
          disallowEmptySelection={true}
          shouldFocusWrap={true}
          selectionBehavior="replace"
        />
      );
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Chicken Teriyaki');
      assume(result).includes('Salmon Bento');
      assume(result).includes('Beef Bowl');
      assume(result).includes('data-selection-behavior="replace"');
      assume(result).includes('data-focus-wrap="true"');
    });

    it('supports single selection with vertical orientation', async function singleVertical() {
      const { container } = await render(
        <BasicListBoxExample aria-label="single selection test" selectionMode="single" orientation="vertical" />
      );
      const result = container.innerHTML;

      assume(result).includes('data-selection-mode="single"');
      assume(result).includes('data-orientation="vertical"');
      assume(result).includes('Chicken Teriyaki');
    });

    it('supports multiple selection with horizontal orientation', async function multipleHorizontal() {
      const { container } = await render(
        <BasicListBoxExample aria-label="multiple selection test" selectionMode="multiple" orientation="horizontal" />
      );
      const result = container.innerHTML;

      assume(result).includes('data-selection-mode="multiple"');
      assume(result).includes('data-orientation="horizontal"');
      assume(result).includes('Chicken Teriyaki');
    });
  });

  describe('Static Sections', function staticSections() {
    it('renders static sections with headers', async function sectionsWithHeaders() {
      const { container } = await render(<SectionsExample aria-label="Static sections" />);
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Main Dishes');
      assume(result).includes('Side Dishes');
      assume(result).includes('<section');
      assume(result).includes('<header');
    });
  });

  describe('Dynamic Collections', function dynamicCollections() {
    it('renders dynamic collections', async function dynamicCollection() {
      const { container } = await render(
        <DynamicCollectionExample items={testItems} aria-label="Dynamic collection" selectionMode="single" />
      );
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Chicken Teriyaki');
      assume(result).includes('Salmon Bento');
      assume(result).includes('Beef Bowl');
    });

    it('renders dynamic sections', async function dynamicSections() {
      const { container } = await render(
        <SectionsDynamicExample categories={testCategories} aria-label="Dynamic sections" />
      );
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Main Dishes');
      assume(result).includes('Side Dishes');
      assume(result).includes('Chicken Teriyaki');
      assume(result).includes('Pickled Vegetables');
    });
  });

  describe('Empty Collections', function emptyCollections() {
    it('handles empty collections correctly', async function emptyCollections() {
      const { container } = await render(
        <DynamicCollectionExample
          items={[]}
          aria-label="Empty collection"
          renderEmptyState={() => <div data-testid="empty">No items</div>}
        />
      );
      const result = container.innerHTML;

      assume(result).includes('data-testid="empty"');
      assume(result).includes('No items');
    });

    it('handles empty categories correctly', async function emptyCategories() {
      const { container } = await render(<SectionsDynamicExample categories={[]} aria-label="Empty categories" />);
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
    });
  });

  describe('Slots and Items Override', function slotsAndItemsOverride() {
    it('handles slots prop destructuring correctly', async function slotsDestructuring() {
      const customSlots = {
        'bento-list.test-slot': () => <div data-testid="custom-slot">Custom slot content</div>
      };

      const { container } = await render(
        <SlotsDynamicSectionsExample
          categories={testCategories}
          aria-label="Custom slots test"
          slots={customSlots}
          data-testid="with-slots"
          selectionMode="single"
        />
      );
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Main Dishes');
      assume(result).includes('Side Dishes');
      assume(result).includes('data-testid="with-slots"');
      assume(result).includes('Salmon Bento');
      assume(result).includes('Traditional');
    });

    it('handles default slots correctly', async function defaultSlots() {
      const { container } = await render(
        <SlotsDynamicSectionsExample
          categories={testCategories}
          aria-label="Default slots test"
          data-testid="without-slots"
          orientation="vertical"
        />
      );
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Main Dishes');
      assume(result).includes('Side Dishes');
      assume(result).includes('data-testid="without-slots"');
      assume(result).includes('Pickled Vegetables');
    });

    it('handles items override correctly', async function itemsOverride() {
      const overrideItems = [
        {
          id: 'override-section',
          name: 'Override Section',
          items: [{ id: 'override-item', name: 'Override Item' }]
        }
      ];

      const { container } = await render(
        <SlotsDynamicSectionsExample
          categories={testCategories}
          items={overrideItems}
          aria-label="Items override test"
          data-testid="items-override"
        />
      );
      const result = container.innerHTML;

      assume(result).includes('role="listbox"');
      assume(result).includes('Override Section');
      assume(result).includes('Override Item');
      assume(result).does.not.include('Chicken Teriyaki');
    });
  });
});
