import { ModalTrigger, Button } from '@godaddy/antares';
import { Modal } from '../src/index-a1-slot-props.tsx';

/**
 * Prototype a1 (slotProps): tweak the close button through a grouped, typed
 * `slotProps` object. The extra `onPress` runs AND the modal still closes
 * (handlers chain via `mergeProps`); `className`/`style` restyle it; `aria-label`
 * and `data-track` are forwarded.
 * Modal component owns the structure and styling of the modal, but the consumer can tweak the close button and other parts via slotProps.
 */
export function SlotPropsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open (slotProps)</Button>

      <Modal
        title="Delete file?"
        description="This action cannot be undone."
        actions={
          <Button slot="close" variant="critical">
            Delete
          </Button>
        }
        slotProps={{
          close: {
            'aria-label': 'Close dialog',
            'data-track': 'modal-close',
            className: 'proto-close-restyled',
            style: { outline: '2px solid hotpink', outlineOffset: 2 },
            onPress: () => console.log('slotProps close: extra onPress (modal still closes)')
          },
          title: { style: { color: 'crimson' } }
        }}
      />
    </ModalTrigger>
  );
}
