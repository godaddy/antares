import { useState } from 'react';
import {
  Button,
  Card,
  CardSelectionIndicator,
  CheckboxGroup,
  CornerActions,
  Flex,
  RadioGroup,
  Text
} from '@godaddy/antares';

interface GroupedSelectionExampleProps {
  /** Selection control supplied by the group. */
  kind: 'checkbox' | 'radio';

  /** Group state to toggle. */
  restriction: 'disabled' | 'readOnly';

  /** Whether the Card also has an independent primary action. */
  hasPrimary?: boolean;
}

/**
 * Group-owned selection restrictions and independent primary actions.
 * @ignore
 */
export function GroupedSelectionExample({ kind, restriction, hasPrimary }: GroupedSelectionExampleProps) {
  const [isRestricted, setRestricted] = useState(true);
  const [presses, setPresses] = useState(0);
  const Group = kind === 'checkbox' ? CheckboxGroup : RadioGroup;

  function activate() {
    setPresses((count) => count + 1);
  }

  return (
    <Flex direction="column" gap="md">
      <Group
        aria-label="Choose an option"
        isDisabled={restriction === 'disabled' && isRestricted}
        isReadOnly={restriction === 'readOnly' && isRestricted}
      >
        <Card selection={kind} value="one" aria-label="Option one" onPress={hasPrimary ? activate : undefined}>
          <Text>Grouped card body</Text>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>
      </Group>
      <Button onPress={() => setRestricted((value) => !value)}>Toggle restriction</Button>
      <Text>Primary activations: {presses}</Text>
    </Flex>
  );
}
