import { Button, Flex, Popover, PopoverTrigger, Text, type PopoverProps } from '@godaddy/antares';

export function PlaygroundExample({ placement = 'bottom', hideArrow = false, showCloseButton = false }: PopoverProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <PopoverTrigger>
        <Button variant="primary">Open popover</Button>
        <Popover
          placement={placement}
          hideArrow={hideArrow}
          showCloseButton={showCloseButton}
          header={showCloseButton ? <Text>Popover header</Text> : undefined}
        >
          <Text>Popover content!</Text>
        </Popover>
      </PopoverTrigger>
    </Flex>
  );
}
