import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Heading,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * `isDisabled` fades the Card. A disabled link Card does not navigate, and a disabled Card in a
 * CardGroup cannot be selected, run its action, or take focus. `disabledKeys` on the group does
 * the same by key.
 * @title Disabled
 * @order 9
 */
export function DisabledExample() {
  return (
    <Flex direction="column" gap="lg">
      <Card href="#billing" isDisabled>
        <TextLockup>
          <Heading slot="title">Disabled link</Heading>
          <Text slot="body">Pressing the Card does nothing.</Text>
        </TextLockup>
      </Card>

      <CardGroup aria-label="Backups" selectionMode="multiple" disabledKeys={['ssl']}>
        <Card id="backup" textValue="Backup" isDisabled>
          <TextLockup>
            <Heading slot="title">Disabled with isDisabled</Heading>
            <Text slot="body">The Card cannot be selected.</Text>
          </TextLockup>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>

        <Card id="ssl" textValue="SSL">
          <TextLockup>
            <Heading slot="title">Disabled with disabledKeys</Heading>
            <Text slot="body">The group disables this Card by key.</Text>
          </TextLockup>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>
      </CardGroup>
    </Flex>
  );
}
