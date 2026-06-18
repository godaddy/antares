/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';

const SELECT_ALL = 'select-all';

export function CheckboxGroupIndeterminateExample() {
  const items = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ];
  const allItemIds = items.map(function getItemId(item) {
    return item.id;
  });

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const itemsSelectedCount = checkedItems.filter(function isItem(value) {
    return value !== SELECT_ALL;
  }).length;
  const isIndeterminate = itemsSelectedCount > 0 && itemsSelectedCount < allItemIds.length;

  function handleGroupChange(nextValues: string[]) {
    const prevHadSelectAll = checkedItems.includes(SELECT_ALL);
    const nextHasSelectAll = nextValues.includes(SELECT_ALL);

    // Select All was just toggled on → select every item, with select-all last.
    if (!prevHadSelectAll && nextHasSelectAll) {
      setCheckedItems([...allItemIds, SELECT_ALL]);
      return;
    }

    // Select All was just toggled off → clear everything.
    if (prevHadSelectAll && !nextHasSelectAll) {
      setCheckedItems([]);
      return;
    }

    // An individual item toggled. Strip select-all so its membership is purely derived.
    const itemsOnly = nextValues.filter(function notSelectAll(value) {
      return value !== SELECT_ALL;
    });
    const allItemsNowSelected = allItemIds.every(function isInItems(id) {
      return itemsOnly.includes(id);
    });
    if (allItemsNowSelected) {
      setCheckedItems([...itemsOnly, SELECT_ALL]);
    } else {
      setCheckedItems(itemsOnly);
    }
  }

  return (
    <CheckboxGroup value={checkedItems} onChange={handleGroupChange} data-value={checkedItems}>
      <Text slot="label">Select Items</Text>
      <Checkbox name={SELECT_ALL} value={SELECT_ALL} isIndeterminate={isIndeterminate}>
        Select All
      </Checkbox>

      {items.map(function renderItem(item) {
        return (
          <Checkbox key={item.id} name={item.id} value={item.id}>
            {item.label}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
}
