import {
  Button,
  CloseButton,
  Content,
  Drawer,
  DrawerTrigger,
  Flex,
  Header,
  Heading,
  Text,
  type DrawerPlacement
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: DrawerPlacement;
  showHeader?: boolean;
  isDismissable?: boolean;
  animate?: boolean;
  maxSize?: number | string;
  minSize?: number | string;
}

export function PlaygroundExample({
  placement = 'right',
  showHeader,
  isDismissable = true,
  animate,
  maxSize,
  minSize
}: PlaygroundExampleProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <DrawerTrigger>
        <Button variant="primary">Open drawer</Button>
        <Drawer
          placement={placement}
          isDismissable={isDismissable}
          animate={animate}
          maxSize={maxSize}
          minSize={minSize}
          aria-label="Drawer"
        >
          {showHeader ? (
            <Header>
              <Heading slot="title">Drawer title</Heading>
              <CloseButton />
            </Header>
          ) : null}
          <Content>
            <Text>Drawer content!</Text>
          </Content>
        </Drawer>
      </DrawerTrigger>
    </Flex>
  );
}
