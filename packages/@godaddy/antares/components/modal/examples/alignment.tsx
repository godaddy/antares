import { ModalTrigger, Modal, Button, RadioGroup, Radio, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function AlignmentExample() {
  const [alignment, setAlignment] = useState<string>();
  const [actionsAlignment, setActionsAlignment] = useState<string>();
  const [actionsDirection, setActionsDirection] = useState<string>();

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger>
        <Button variant="primary">Open modal</Button>

        <Modal
          title="Modal title"
          description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
          centered={alignment === 'center'}
          actionProps={{
            [actionsAlignment ? 'justifyContent' : '']: actionsAlignment,
            [actionsDirection ? 'direction' : '']: actionsDirection
          }}
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

      <RadioGroup orientation="horizontal" label="Modal alignment" value={alignment} onChange={setAlignment}>
        <Radio value="">Start (Default)</Radio>
        <Radio value="center">Centered</Radio>
      </RadioGroup>

      <RadioGroup
        orientation="horizontal"
        label="Actions alignment"
        value={actionsAlignment}
        onChange={setActionsAlignment}
      >
        <Radio value="start">Start</Radio>
        <Radio value="center">Centered</Radio>
        <Radio value="">End (Default)</Radio>
      </RadioGroup>

      <RadioGroup
        orientation="horizontal"
        label="Actions direction"
        value={actionsDirection}
        onChange={setActionsDirection}
      >
        <Radio value="">Row (Default)</Radio>
        <Radio value="column">Column</Radio>
      </RadioGroup>
    </Flex>
  );
}
