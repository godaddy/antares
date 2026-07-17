import { Flex, Switch } from '@godaddy/antares';

export function SwitchDisabled() {
  return (
    <Flex direction="column" gap="md">
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
    </Flex>
  );
}
