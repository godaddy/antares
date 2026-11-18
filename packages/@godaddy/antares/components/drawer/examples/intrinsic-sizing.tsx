import {
  Box,
  Button,
  CloseButton,
  Content,
  Drawer,
  DrawerTrigger,
  Header,
  Heading,
  type DrawerProps
} from '@godaddy/antares';

interface IntrinsicSizingExampleProps extends Pick<DrawerProps, 'placement' | 'minSize' | 'maxSize'> {
  contentSize?: number;
}

/** @ignore */
export function IntrinsicSizingExample({
  placement,
  minSize,
  maxSize,
  contentSize = 1200
}: IntrinsicSizingExampleProps) {
  return (
    <DrawerTrigger>
      <Button>Open drawer</Button>
      <Drawer placement={placement} minSize={minSize} maxSize={maxSize}>
        <Header>
          <Heading slot="title">Intrinsic sizing</Heading>
          <CloseButton />
        </Header>
        <Content>
          <Box style={{ inlineSize: contentSize, blockSize: contentSize, flexShrink: 0 }}>Long drawer content</Box>
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}
