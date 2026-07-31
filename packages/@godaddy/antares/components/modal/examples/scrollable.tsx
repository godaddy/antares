import {
  ModalTrigger,
  Modal,
  Button,
  CloseButton,
  Header,
  Heading,
  Content,
  Footer,
  ButtonGroup,
  Text
} from '@godaddy/antares';

const PARAGRAPH =
  'She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther. She had never fancied him so little disposed to converse. She had never seen him so desirous to please.';

/**
 * The `Content` region scrolls while the `Header` and `Footer` stay pinned. Scroll ownership
 * belongs to the Modal - a height-constrained flex column - not the generic containers, so
 * the same `Content` does not scroll when used standalone.
 * @title Scrollable content
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
          {Array.from({ length: 12 }, (_, i) => (
            <Text as="p" key={i}>
              {PARAGRAPH}
            </Text>
          ))}
        </Content>
        <Footer justifyContent="end">
          <ButtonGroup>
            <CloseButton variant="secondary">Decline</CloseButton>
            <Button slot="close" variant="primary">
              Accept
            </Button>
          </ButtonGroup>
        </Footer>
      </Modal>
    </ModalTrigger>
  );
}
