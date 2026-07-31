import { Flex, Switch } from '@godaddy/antares';

export function SwitchSizes() {
  return (
    <Flex direction="column" gap="md">
      <Switch size="md" defaultSelected>
        Medium
      </Switch>
      <Switch size="sm" defaultSelected>
        Small
      </Switch>
    </Flex>
  );
}
