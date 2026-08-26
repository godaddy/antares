import { DEFAULT_SLOT } from 'react-aria-components';
import { Flex, Tag, TagContext } from '@godaddy/antares';

/**
 * Fixture for `TagContext`. A parent supplies `size` per slot; an explicit prop wins over
 * it, and an unslotted `Tag` resolves `DEFAULT_SLOT` rather than throwing. The rendered
 * `data-size` attribute is the assertion.
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
