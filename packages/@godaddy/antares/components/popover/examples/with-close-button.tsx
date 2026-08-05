import { Button, CloseButton, Content, Heading, Popover, PopoverTrigger } from '@godaddy/antares';

/**
 * Add a `Heading slot="title"` and a `CloseButton` for a titled, dismissible popover. The heading
 * also gives the dialog its accessible name.
 * @title Title and Close Button
 * @order 3
 */
export function WithCloseButtonExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>
        <Heading slot="title">Popover title</Heading>
        <CloseButton />
        <Content>This is the popover content!</Content>
      </Popover>
    </PopoverTrigger>
  );
}
