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

const PARAGRAPH =
  'She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.';

export interface PlaygroundExampleProps {
  isDismissable?: boolean;
  longContent?: boolean;
  showActions?: boolean;
}

export function PlaygroundExample({
  isDismissable = true,
  longContent = false,
  showActions = true
}: PlaygroundExampleProps) {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal isDismissable={isDismissable}>
        <Header>
          <Heading slot="title">Modal title</Heading>
          <CloseButton />
        </Header>
        <Content>
          {Array.from({ length: longContent ? 12 : 1 }, (_, i) => (
            <Text as="p" key={i}>
              {PARAGRAPH}
            </Text>
          ))}
        </Content>
        {showActions ? (
          <ButtonGroup>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close" variant="primary">
              Confirm
            </Button>
          </ButtonGroup>
        ) : null}
      </Modal>
    </ModalTrigger>
  );
}
