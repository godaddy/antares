import { Popover, PopoverTrigger, Button, Text } from '@godaddy/antares';

/**
 * Use `showCloseButton` to show a close button in the popover header. Use the `header` prop to render content alongside it.
 * @title Close Button and Header
 * @order 3
 */
export function WithCloseButtonExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover showCloseButton header={<Text>Content to show next to the close button</Text>}>
        This is the popover content!
      </Popover>
    </PopoverTrigger>
  );
}
