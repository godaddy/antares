import {
  ModalTrigger,
  Modal,
  Button,
  CloseButton,
  Heading,
  Content,
  ButtonGroup,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * A `TextLockup` in the content keeps its own title. The modal's `Heading slot="title"` still names
 * the dialog.
 * @order 7
 */
export function WithTextLockupExample() {
  return (
    <ModalTrigger>
      <Button>Compare plans</Button>
      <Modal>
        <Heading slot="title">Compare plans</Heading>
        <CloseButton />
        <Content>
          <TextLockup size="sm">
            <Tag slot="eyebrow" emphasis="premium">
              Pro
            </Tag>
            <Heading slot="title">Unlimited seats</Heading>
            <Text slot="body">Add your whole team with priority support.</Text>
          </TextLockup>
        </Content>
        <ButtonGroup>
          <Button slot="close">Close</Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}
