import { Button, Content, Heading, Popover, PopoverTrigger } from '@godaddy/antares';

/**
 * Reaches the positioned panel, the layer `className` does not target. A popover has no
 * backdrop, so it has no `overlayProps`.
 * @ignore
 */
export function LayerPropsExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover className="custom-dialog" containerProps={{ className: 'custom-container' }}>
        <Heading slot="title">Layer props</Heading>
        <Content>Each layer carries its own class.</Content>
      </Popover>
    </PopoverTrigger>
  );
}
