import { Content, Heading, Modal, ModalTrigger, Button } from '@godaddy/antares';

/**
 * Reaches the backdrop and the positioned container, the two layers `className` does not target.
 * @ignore
 */
export function LayerPropsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        className="custom-dialog"
        overlayProps={{ className: 'custom-overlay' }}
        containerProps={{ className: 'custom-container' }}
      >
        <Heading slot="title">Layer props</Heading>
        <Content>Each layer carries its own class.</Content>
      </Modal>
    </ModalTrigger>
  );
}
