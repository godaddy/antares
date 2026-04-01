import { Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: space-between</Flex>
        <Flex justifyContent="space-between">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Start
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Middle
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: center</Flex>
        <Flex justifyContent="center" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: end</Flex>
        <Flex justifyContent="end" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: center (with varying heights)</Flex>
        <Flex alignItems="center" gap="sm" style={{ height: '100px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Short
          </Flex>
          <Flex padding="lg" style={{ background: '#e0e0e0' }}>
            Tall
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Short
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: stretch (default)</Flex>
        <Flex alignItems="stretch" gap="sm" style={{ height: '100px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
