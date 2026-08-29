import { DEFAULT_SLOT, TextContext } from 'react-aria-components';
import { Button, Flex, LinkButton, Text } from '@godaddy/antares';

/**
 * Fixture proving `Button` and `LinkButton` both shadow an ancestor's `TextContext`, for string
 * and composed labels alike. The `Text` outside them is the control, so the assertions cannot
 * pass vacuously.
 * @ignore
 */
export function IsolatedLabelExample() {
  return (
    <TextContext.Provider value={{ slots: { [DEFAULT_SLOT]: { style: { fontSize: '40px' } } } }}>
      <Flex direction="column" gap="sm">
        <Button size="sm">String label</Button>
        <Button size="sm">
          <Text>Composed label</Text>
        </Button>
        <LinkButton size="sm" href="#">
          String link label
        </LinkButton>
        <LinkButton size="sm" href="#">
          <Text>Composed link label</Text>
        </LinkButton>
        <Text>Outside the button</Text>
      </Flex>
    </TextContext.Provider>
  );
}
