import { Button, CloseButton, Content, Header, Heading, Popover, PopoverTrigger } from '@godaddy/antares';

/**
 * Compose a `Header` with a `Heading slot="title"` and a `CloseButton` for a dismissible
 * popover. The heading also gives the dialog its accessible name.
 * @title Header and Close Button
 * @order 3
 */
export function WithCloseButtonExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>
        <Header>
          <Heading slot="title">Popover title</Heading>
          <CloseButton />
        </Header>
        <Content>This is the popover content!</Content>
      </Popover>
    </PopoverTrigger>
  );
}
