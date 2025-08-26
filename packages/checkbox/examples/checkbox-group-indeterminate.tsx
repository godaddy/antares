/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';

export function CheckboxGroupIndeterminateExample() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const items = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ];

  const allItemIds = items.map(function getItemId(item) {
    return item.id;
  });
  const isAllSelected = checkedItems.size === items.length;
  const isIndeterminate = checkedItems.size > 0 && checkedItems.size < items.length;

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setCheckedItems(new Set([...allItemIds, 'select-all']));
    } else {
      setCheckedItems(new Set());
    }
  }

  function handleItemChange(itemId: string, checked: boolean) {
    setCheckedItems(function updateCheckedItems(prev) {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(itemId);
        if (
          allItemIds.every(function checkItemInSet(id) {
            return newSet.has(id);
          })
        ) {
          newSet.add('select-all');
        }
      } else {
        newSet.delete(itemId);
        newSet.delete('select-all');
      }
      return newSet;
    });
  }

  return (
    <CheckboxGroup label="Select Items" value={Array.from(checkedItems)}>
      <Checkbox
        name="select-all"
        value="select-all"
        isSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onChange={handleSelectAll}
      >
        Select All
      </Checkbox>

      {items.map((item) => (
        <Checkbox
          key={item.id}
          name={item.id}
          value={item.id}
          isSelected={checkedItems.has(item.id)}
          onChange={function handleItemChangeForItem(checked) {
            return handleItemChange(item.id, checked);
          }}
        >
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
