import { Flex } from '@godaddy/antares';

export function GapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xs</Flex>
        <Flex gap="xs">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: sm</Flex>
        <Flex gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: md</Flex>
        <Flex gap="md">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: lg</Flex>
        <Flex gap="lg">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xl</Flex>
        <Flex gap="xl">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">rowGap + columnGap (with wrap)</Flex>
        <Flex wrap="wrap" rowGap="lg" columnGap="xs" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
