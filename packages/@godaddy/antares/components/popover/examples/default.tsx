import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

/**
 * Use it with `<PopoverTrigger>`, which wraps both the popover content and an interactive trigger element (for example, a `Button`).
 * @order 1
 */
export function DefaultExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>This is the popover content!</Popover>
    </PopoverTrigger>
  );
}
