import { ModalTrigger, Button, Text, Flex, Icon } from '@godaddy/antares';
import { Modal } from '../src/index-a4-provider-slots.tsx';

/**
 * Prototype a4 (provider slots): the consumer authors the interior and only TAGS elements
 * with `slot` names; the Modal appends the className + behavior for each slot via its own
 * RAC context providers.
 *
 * Shows: `slot="close"` and `slot="dismiss"` coexisting (both close, different styles, no
 * interference), `<Text slot="title|description">` picking up styles from TextContext, a
 * slotless button staying undecorated (DEFAULT_SLOT), and a chained `onPress` that runs
 * while the modal still closes. `aria-label` is set because the title is a Text, not a
 * Heading. `data-track` still needs a cast (Antares Button doesn't type data-*).
 */
export function ProviderSlotsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open (provider slots)</Button>

      <Modal>
        {/* Or a <Heading /> */}
        <Text slot="title">Delete file?</Text>
        <Text slot="description">This action cannot be undone.</Text>

        <Button
          slot="close"
          data-track="modal-close"
          onPress={() => console.log('provider-slots close: extra onPress (modal still closes)')}
        >
          <Icon icon="x" />
        </Button>

        {/* or a ModalFooter or ModalActions */}
        <Flex gap="md" justifyContent="end">
          <Button slot="myCustomDismiss" variant="secondary">
            Close (with "myCustomDismiss" slot)
          </Button>
          <Button variant="critical">Delete</Button>
        </Flex>
      </Modal>
    </ModalTrigger>
  );
}
