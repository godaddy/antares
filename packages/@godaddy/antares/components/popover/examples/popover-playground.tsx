import { Button, CloseButton, Content, Flex, Heading, Popover, PopoverTrigger, Text } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: 'bottom' | 'bottom start' | 'bottom end' | 'top' | 'top start' | 'top end' | 'left' | 'right';
  hideArrow?: boolean;
  showTitle?: boolean;
  showCloseButton?: boolean;
  longContent?: boolean;
}

export function PlaygroundExample({
  placement = 'bottom',
  hideArrow = false,
  showTitle = false,
  showCloseButton = false,
  longContent = false
}: PlaygroundExampleProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <PopoverTrigger>
        <Button variant="primary">Open popover</Button>
        <Popover placement={placement} hideArrow={hideArrow}>
          {showTitle ? <Heading slot="title">Popover title</Heading> : null}
          {showCloseButton ? <CloseButton /> : null}
          <Content>
            <Text>
              {longContent
                ? 'Popover content long enough to wrap onto several lines, so it uses the full width of the popover under the close button.'
                : 'Popover content!'}
            </Text>
          </Content>
        </Popover>
      </PopoverTrigger>
    </Flex>
  );
}
