import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

/**
 * Buttons come in small, medium, and large sizes to fit different layout densities. Without
 * `size`, a button follows the surrounding size scope, and uses medium outside any scope. An
 * icon-only button is square and as tall as a text button of the same size.
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

      <Button variant="primary" size="sm">
        <Icon icon="star" />
        <Text>Small</Text>
      </Button>

      <LinkButton href="#" variant="primary" size="sm">
        <Icon icon="star" />
        <Text>Link Small</Text>
      </LinkButton>

      <Button variant="primary" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary">Medium</Button>

      <Button variant="primary">
        <Icon icon="star" />
        <Text>Medium</Text>
      </Button>

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

      <Button variant="primary" size="lg">
        <Icon icon="star" />
        <Text>Large</Text>
      </Button>

      <LinkButton href="#" variant="primary" size="lg">
        <Icon icon="star" />
        <Text>Link Large</Text>
      </LinkButton>
    </Flex>
  );
}
