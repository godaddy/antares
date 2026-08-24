import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup, Text } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  longContent?: boolean;
  showActions?: boolean;
  showTitle?: boolean;
  longTitle?: boolean;
}

export function PlaygroundExample({
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  longContent = false,
  showActions = true,
  showTitle = true,
  longTitle = false
}: PlaygroundExampleProps) {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        aria-label={showTitle ? undefined : 'Modal without a title'}
      >
        {showTitle ? (
          <Heading slot="title">
            {longTitle
              ? 'A deliberately long modal title that has to wrap onto several lines to prove it never runs underneath the close button'
              : 'Modal title'}
          </Heading>
        ) : null}
        <CloseButton />
        <Content>
          {Array.from({ length: longContent ? 12 : 1 }, (_, i) => (
            <Text as="p" key={i}>
              She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
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
