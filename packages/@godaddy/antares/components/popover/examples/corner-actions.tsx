import { Button, CloseButton, Content, CornerActions, Heading, Popover, PopoverTrigger } from '@godaddy/antares';

/**
 * Place a dismiss action in CornerActions to compose a popover's corner controls.
 * @title Corner Actions
 * @order 2
 */
export function CornerActionsExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover with corner actions</Button>
      <Popover>
        <Heading slot="title">Corner actions popover</Heading>
        <CornerActions>
          <CloseButton />
        </CornerActions>
        <Content>Close this popover from its always-visible corner actions.</Content>
      </Popover>
    </PopoverTrigger>
  );
}
