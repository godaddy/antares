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
 * Compose a Modal from `Header`, `Content`, and `ButtonGroup`. `ModalTrigger` opens the Modal
 * and manages its open/close state.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Header>
          <Heading slot="title">Delete file?</Heading>
          <CloseButton />
        </Header>
        <Content>
          <Text as="p">This action cannot be undone. The file will be permanently removed.</Text>
        </Content>
        <ButtonGroup justifyContent="end">
          <CloseButton variant="secondary">Cancel</CloseButton>
          <Button slot="close" variant="critical">
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}
