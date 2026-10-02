import { Button, CornerActions, Flex, Text } from '@godaddy/antares';

/**
 * CornerActions is an always-visible structural region. Compose any actions inside it and use
 * layout props to reserve room beside the surrounding content.
 */
export function CornerActionsExample() {
  return (
    <Flex direction="row" alignItems="center" justifyContent="space-between" gap="md">
      <Text>Card content</Text>
      <CornerActions>
        <Button variant="secondary">More actions</Button>
        <Button variant="secondary">Share</Button>
      </CornerActions>
    </Flex>
  );
}
