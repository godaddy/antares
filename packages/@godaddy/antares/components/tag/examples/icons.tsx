import { Flex, Icon, Tag } from '@godaddy/antares';

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
