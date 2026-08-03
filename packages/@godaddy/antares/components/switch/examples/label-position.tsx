import { Flex, Switch } from '@godaddy/antares';

/**
 * The `labelPosition` prop places the label at the `start` or `end` of the track.
 * @order 4
 */
export function SwitchLabelPositionExample() {
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
