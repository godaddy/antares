import { useState } from 'react';
import { Button, Chip, ChipGroup, ChipList, Flex, Text } from '@godaddy/antares';

const newsCategory = { id: 'news', name: 'News' };

/**
 * Give an empty collection useful guidance, then let the user add the first
 * value. Removable items continue to be owned by the collection.
 * @order 8
 */
export function EmptyStateExample() {
  const [categories, setCategories] = useState<Set<typeof newsCategory>>(new Set());

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ChipGroup
        aria-label="Categories"
        onRemove={function handleRemove(keys) {
          setCategories((current) => new Set([...current].filter((category) => !keys.has(category.id))));
        }}
      >
        <ChipList items={categories} renderEmptyState={() => 'No categories yet'}>
          {(category) => (
            <Chip id={category.id} textValue={category.name}>
              {category.name}
              <Button slot="remove" />
            </Chip>
          )}
        </ChipList>
        <Text slot="description">Add a category to get started.</Text>
      </ChipGroup>
      <Button
        onPress={function addCategory() {
          setCategories((current) => new Set(current).add(newsCategory));
        }}
      >
        Add category
      </Button>
    </Flex>
  );
}
