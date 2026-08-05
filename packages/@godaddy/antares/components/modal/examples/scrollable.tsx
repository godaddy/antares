import {
  ModalTrigger,
  Modal,
  Button,
  CloseButton,
  Header,
  Heading,
  Content,
  ButtonGroup,
  Text
} from '@godaddy/antares';

/**
 * When the content is taller than the viewport, the `Content` region scrolls while the
 * `Header` and `ButtonGroup` stay pinned.
 * @order 3
 */
export function ScrollableExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Header>
          <Heading slot="title">Terms of service</Heading>
          <CloseButton />
        </Header>
        <Content>
          {Array.from({ length: 24 }, (_, i) => (
            <Text as="p" key={i}>
              She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
            </Text>
          ))}
        </Content>
        <ButtonGroup>
          <Button slot="close" variant="secondary">
            Decline
          </Button>
          <Button slot="close" variant="primary">
            Accept
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}
