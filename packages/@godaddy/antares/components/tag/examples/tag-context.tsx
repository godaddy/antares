import { DEFAULT_SLOT } from 'react-aria-components';
import { Flex, Tag, TagContext } from '@godaddy/antares';

/**
 * Fixture for `TagContext`: per-slot default, explicit prop wins, unslotted resolves
 * `DEFAULT_SLOT` instead of throwing.
 * @ignore
 */
export function TagContextExample() {
  return (
    <TagContext.Provider value={{ slots: { [DEFAULT_SLOT]: {}, eyebrow: { size: 'lg' } } }}>
      <Flex gap="sm">
        <Tag slot="eyebrow">From context</Tag>
        <Tag slot="eyebrow" size="sm">
          Explicit wins
        </Tag>
        <Tag>Unslotted</Tag>
      </Flex>
    </TagContext.Provider>
  );
}
