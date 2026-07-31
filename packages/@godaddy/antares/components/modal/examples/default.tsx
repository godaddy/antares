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

/**
 * A Modal is composition-first: you author the interior from the shared containers
 * (`Header`, `Content`, `Footer`, `ButtonGroup`) plus `Heading slot="title"` and
 * `CloseButton`. The Modal styles each region, owns the scroll layout, and React Aria wires
 * the title and close behavior. `ModalTrigger` manages the open/close state.
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
        <Footer justifyContent="end">
          <ButtonGroup>
            <CloseButton variant="secondary">Cancel</CloseButton>
            <Button slot="close" variant="critical">
              Delete
            </Button>
          </ButtonGroup>
        </Footer>
      </Modal>
    </ModalTrigger>
  );
}
