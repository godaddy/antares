import { Card, CardSelectionIndicator, CornerActions, Grid, Heading, Text, TextLockup } from '@godaddy/antares';

/**
 * `isDisabled` disables the Card's primary action or selection and fades the whole Card. A
 * disabled CheckboxGroup or RadioGroup does the same. Read-only selection keeps its value visible.
 * @title Disabled
 * @order 9
 */
export function DisabledExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="start">
      <Card aria-label="Open billing" onPress={() => undefined} isDisabled>
        <TextLockup>
          <Heading slot="title">Disabled action</Heading>
          <Text slot="body">Pressing the Card does nothing.</Text>
        </TextLockup>
      </Card>

      <Card selection="checkbox" aria-label="Backup" isDisabled>
        <TextLockup>
          <Heading slot="title">Disabled selection</Heading>
          <Text slot="body">The Card cannot be selected.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator />
        </CornerActions>
      </Card>

      <Card selection="checkbox" aria-label="SSL" isReadOnly defaultSelected>
        <TextLockup>
          <Heading slot="title">Read-only selection</Heading>
          <Text slot="body">The selection is visible but cannot change.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator />
        </CornerActions>
      </Card>
    </Grid>
  );
}
