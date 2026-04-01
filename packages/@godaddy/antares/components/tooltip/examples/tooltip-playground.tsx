import {
  Button,
  Flex,
  Tooltip,
  TooltipTrigger,
  Text,
  type TooltipProps,
  type TooltipTriggerProps
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: TooltipProps['placement'];
  hideArrow?: TooltipProps['hideArrow'];
  delay?: TooltipTriggerProps['delay'];
  closeDelay?: TooltipTriggerProps['closeDelay'];
}

export function PlaygroundExample({
  placement = 'bottom',
  hideArrow = false,
  delay,
  closeDelay
}: PlaygroundExampleProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <TooltipTrigger delay={delay} closeDelay={closeDelay}>
        <Button variant="primary">Hover me</Button>
        <Tooltip placement={placement} hideArrow={hideArrow}>
          <Text>Tooltip content!</Text>
        </Tooltip>
      </TooltipTrigger>
    </Flex>
  );
}
