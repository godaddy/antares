import { Flex, Switch } from '@godaddy/antares';

/**
 * The `size` prop accepts `md` (default) or `sm`.
 * @order 3
 */
export function SwitchSizesExample() {
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
