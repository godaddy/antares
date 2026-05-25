import { ModalTrigger, Modal, Button, Flex, type ModalProps } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  isDismissable?: boolean;
  centered?: boolean;
  showMedia?: boolean;
  mediaVariant?: ModalProps['mediaVariant'];
  mediaDirection?: ModalProps['mediaDirection'];
  mediaPosition?: ModalProps['mediaPosition'];
  showActions?: boolean;
  actionsJustifyContent?: 'start' | 'center' | 'end';
  actionsDirection?: 'row' | 'column';
}

export function PlaygroundExample({
  isDismissable = true,
  centered = false,
  showMedia = false,
  mediaVariant,
  mediaDirection,
  mediaPosition,
  showActions = false,
  actionsJustifyContent,
  actionsDirection
}: PlaygroundExampleProps) {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        title="Modal title"
        description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
        isDismissable={isDismissable}
        centered={centered}
        media={
          showMedia ? (
            <Flex style={{ width: '100%', height: '100%', minWidth: 350, minHeight: 200, backgroundColor: 'teal' }} />
          ) : undefined
        }
        mediaVariant={mediaVariant}
        mediaDirection={mediaDirection}
        mediaPosition={mediaPosition}
        actionProps={{
          justifyContent: actionsJustifyContent,
          direction: actionsDirection
        }}
        actions={
          showActions
            ? [
                <Button key="cancel" slot="close" variant="secondary">
                  Cancel
                </Button>,
                <Button key="confirm" slot="close" variant="primary">
                  Confirm
                </Button>
              ]
            : undefined
        }
      >
        <Flex padding="md" elevation="card" justifyContent="center">
          This is the children content
        </Flex>
      </Modal>
    </ModalTrigger>
  );
}
