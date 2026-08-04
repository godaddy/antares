import { Button, CloseButton, Content, Flex, Header, Heading, Popover, PopoverTrigger, Text } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: 'bottom' | 'bottom start' | 'bottom end' | 'top' | 'top start' | 'top end' | 'left' | 'right';
  hideArrow?: boolean;
  showHeader?: boolean;
}

export function PlaygroundExample({
  placement = 'bottom',
  hideArrow = false,
  showHeader = false
}: PlaygroundExampleProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <PopoverTrigger>
        <Button variant="primary">Open popover</Button>
        <Popover placement={placement} hideArrow={hideArrow} aria-label={showHeader ? undefined : 'Popover'}>
          {showHeader ? (
            <Header>
              <Heading slot="title">Popover title</Heading>
              <CloseButton />
            </Header>
          ) : null}
          <Content>
            <Text>Popover content!</Text>
          </Content>
        </Popover>
      </PopoverTrigger>
    </Flex>
  );
}
