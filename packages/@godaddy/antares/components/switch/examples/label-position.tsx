import { Flex, Switch } from '@godaddy/antares';

export function SwitchLabelPosition() {
  return (
    <Flex direction="column" gap="md">
      <Switch labelPosition="start" defaultSelected>
        Label on the start
      </Switch>
      <Switch labelPosition="end" defaultSelected>
        Label on the end
      </Switch>
    </Flex>
  );
}
