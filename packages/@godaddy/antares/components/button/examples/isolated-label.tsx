import { DEFAULT_SLOT, TextContext } from 'react-aria-components';
import { Button, Flex, Text } from '@godaddy/antares';

/**
 * Fixture proving a `Button` shadows an ancestor's `TextContext`. The `Text` outside the
 * button is the control, so the assertions cannot pass vacuously.
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
        <Text>Outside the button</Text>
      </Flex>
    </TextContext.Provider>
  );
}
