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
}

/**
 * Group-owned selection restrictions.
 * @ignore
 */
export function GroupedSelectionExample({ kind, restriction }: GroupedSelectionExampleProps) {
  const [isRestricted, setRestricted] = useState(true);
  const Group = kind === 'checkbox' ? CheckboxGroup : RadioGroup;

  return (
    <Flex direction="column" gap="md">
      <Group
        aria-label="Choose an option"
        isDisabled={restriction === 'disabled' && isRestricted}
        isReadOnly={restriction === 'readOnly' && isRestricted}
      >
        <Card selection={kind} value="one" aria-label="Option one">
          <Text>Grouped card body</Text>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>
      </Group>
      <Button onPress={() => setRestricted((value) => !value)}>Toggle restriction</Button>
    </Flex>
  );
}
