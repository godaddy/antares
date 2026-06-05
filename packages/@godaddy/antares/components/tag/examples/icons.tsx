import { Flex, Tag } from '@godaddy/antares';

export function IconsExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag emphasis="critical" icon="alert">
        Critical
      </Tag>
      <Tag emphasis="success" icon="checkmark">
        Success
      </Tag>
      <Tag emphasis="warning" icon="alert">
        Warning
      </Tag>
      <Tag emphasis="info" icon="information">
        Info
      </Tag>
      <Tag emphasis="highlight" icon="star">
        Highlight
      </Tag>
      <Tag emphasis="premium" icon="diamond">
        Premium
      </Tag>
    </Flex>
  );
}
