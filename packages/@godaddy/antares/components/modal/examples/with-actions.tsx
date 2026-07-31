import { ModalTrigger, Modal, Button } from '@godaddy/antares';

/**
 * Render footer buttons via the `actions` prop. Use `slot="close"` on a button to close the modal automatically when pressed.
 * @title With actions
 * @order 3
 */
export function WithActionsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        title="Modal title"
        description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
        actions={[
          <Button key="cancel" slot="close" variant="secondary">
            Cancel
          </Button>,
          <Button key="confirm" slot="close" variant="primary">
            Confirm
          </Button>
        ]}
      />
    </ModalTrigger>
  );
}
