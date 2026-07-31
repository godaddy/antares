import { Flex, Switch } from '@godaddy/antares';

/**
 * A disabled switch prevents interaction and renders at reduced opacity, whether off or on.
 * @order 6
 */
export function SwitchDisabledExample() {
  return (
    <Flex direction="column" gap="md">
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
    </Flex>
  );
}
