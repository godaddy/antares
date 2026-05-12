import { ModalTrigger, Modal, Button, RadioGroup, Radio, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function WithMediaExample() {
  const [mediaVariant, setMediaVariant] = useState<string>();
  const [mediaDirection, setMediaDirection] = useState<string>();
  const [mediaPosition, setMediaPosition] = useState<string>();

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger>
        <Button variant="primary">Open modal</Button>
        <Modal
          title="Modal title"
          description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
          media={
            <Flex style={{ width: '100%', height: '100%', minWidth: 350, minHeight: 200, backgroundColor: 'teal' }} />
          }
          mediaVariant={mediaVariant as 'inset' | 'full' | undefined}
          mediaDirection={mediaDirection as 'column' | 'row' | undefined}
          mediaPosition={mediaPosition as 'start' | 'end' | undefined}
          actions={[
            <Button key="cancel" slot="close" variant="secondary">
              Cancel
            </Button>,
            <Button key="confirm" slot="close" variant="primary">
              Confirm
            </Button>
          ]}
        >
          <Flex padding="md" elevation="card" justifyContent="center">
            This is the children content
          </Flex>
        </Modal>
      </ModalTrigger>

      <RadioGroup orientation="horizontal" label="Variant" value={mediaVariant} onChange={setMediaVariant}>
        <Radio value="inset">Inset</Radio>
        <Radio value="full">Full (Default)</Radio>
      </RadioGroup>

      <RadioGroup orientation="horizontal" label="Direction" value={mediaDirection} onChange={setMediaDirection}>
        <Radio value="row">Row</Radio>
        <Radio value="column">Column (Default)</Radio>
      </RadioGroup>

      <RadioGroup orientation="horizontal" label="Position" value={mediaPosition} onChange={setMediaPosition}>
        <Radio value="start">Start (Default)</Radio>
        <Radio value="end">End</Radio>
      </RadioGroup>
    </Flex>
  );
}
