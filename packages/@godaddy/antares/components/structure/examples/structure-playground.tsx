import {
  Flex,
  Header,
  Content,
  Footer,
  ButtonGroup,
  type ContentProps,
  type ButtonGroupProps,
  Text,
  Button
} from '@godaddy/antares';

/** Props for the structure playground example. */
export interface PlaygroundExampleProps {
  /** Gap between the content region's lines. */
  contentGap?: ContentProps['gap'];
  /** Alignment of the footer actions. */
  actionsJustify?: ButtonGroupProps['justifyContent'];
}

export function PlaygroundExample({ contentGap = 'md', actionsJustify = 'end' }: PlaygroundExampleProps) {
  return (
    <Flex
      direction="column"
      gap="md"
      padding="md"
      style={{ border: '1px solid var(--ux-gray-300, #ccc)', borderRadius: 8 }}
    >
      <Header>
        <Text>Delete file?</Text>
        <Button variant="secondary">Close</Button>
      </Header>
      <Content gap={contentGap}>
        <Text>This action cannot be undone.</Text>
        <Text>All associated data will be permanently removed.</Text>
      </Content>
      <Footer>
        <ButtonGroup flexGrow={1} justifyContent={actionsJustify}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="critical">Delete</Button>
        </ButtonGroup>
      </Footer>
    </Flex>
  );
}
