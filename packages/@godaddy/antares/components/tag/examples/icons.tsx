import { Flex, Icon, Tag } from '@godaddy/antares';

/**
 * Icons reinforce the tag's meaning at a glance. Add an `Icon` as a child - it inherits the tag's color and scales with its size.
 * @title With Icon
 * @order 6
 */
export function IconsExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag emphasis="critical">
        <Icon icon="alert" aria-hidden="true" />
        Critical
      </Tag>
      <Tag emphasis="success">
        <Icon icon="checkmark" aria-hidden="true" />
        Success
      </Tag>
      <Tag emphasis="warning">
        <Icon icon="alert" aria-hidden="true" />
        Warning
      </Tag>
      <Tag emphasis="info">
        <Icon icon="information" aria-hidden="true" />
        Info
      </Tag>
      <Tag emphasis="highlight">
        <Icon icon="star" aria-hidden="true" />
        Highlight
      </Tag>
      <Tag emphasis="premium">
        <Icon icon="diamond" aria-hidden="true" />
        Premium
      </Tag>
    </Flex>
  );
}
