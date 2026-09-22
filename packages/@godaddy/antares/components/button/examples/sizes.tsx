import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

/**
 * Buttons come in small, medium, and large sizes to fit different layout densities. Without
 * `size`, a button follows the surrounding size scope, and uses medium outside any scope.
 */
export function SizesExample() {
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap">
      <Button variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary" size="sm">
        Small
      </Button>

      <LinkButton href="#" variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
        <Text>Link Small</Text>
      </LinkButton>

      <Button variant="primary" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary">Medium</Button>

      <LinkButton href="#" variant="primary">
        <Icon icon="star" />
        <Text>Link Medium</Text>
      </LinkButton>

      <Button variant="primary" size="lg" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary" size="lg">
        Large
      </Button>

      <LinkButton href="#" variant="primary" size="lg">
        <Icon icon="star" />
        <Text>Link Large</Text>
      </LinkButton>
    </Flex>
  );
}
