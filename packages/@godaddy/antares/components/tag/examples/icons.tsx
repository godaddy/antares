import { Flex, Icon, Tag } from '@godaddy/antares';

export function IconsExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag emphasis="critical">
        <Icon icon="alert" />
        Critical
      </Tag>
      <Tag emphasis="success">
        <Icon icon="checkmark" />
        Success
      </Tag>
      <Tag emphasis="warning">
        <Icon icon="alert" />
        Warning
      </Tag>
      <Tag emphasis="info">
        <Icon icon="information" />
        Info
      </Tag>
      <Tag emphasis="highlight">
        <Icon icon="star" />
        Highlight
      </Tag>
      <Tag emphasis="premium">
        <Icon icon="diamond" />
        Premium
      </Tag>
    </Flex>
  );
}
