import { useState } from 'react';
import {
  Button,
  DialogTrigger,
  Footer,
  Input,
  Label,
  TextField,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

/** Render steps from keyed items. Reorder and insert while the dialog is open without losing surviving field values. */
export function ItemsExample() {
  const [items, setItems] = useState([
    { id: 'details', label: 'Details' },
    { id: 'review', label: 'Review' }
  ]);

  return (
    <DialogTrigger>
      <Button>Open items workflow</Button>
      <Wizard aria-label="Items workflow">
        <Button
          onPress={() =>
            setItems((current) =>
              current.some((item) => item.id === 'confirm')
                ? current
                : [...current.slice().reverse(), { id: 'confirm', label: 'Confirm' }]
            )
          }
        >
          Reorder and add step
        </Button>
        <WizardSteps items={items}>
          {(item) => (
            <WizardStep id={item.id} label={item.label}>
              <TextField>
                <Label>{item.label} notes</Label>
                <Input />
              </TextField>
            </WizardStep>
          )}
        </WizardSteps>
        <Footer>
          <WizardStepsMenu />
          <Button slot="previous">Previous</Button>
          <Button slot="next">Next</Button>
          <Button slot="close">Close</Button>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}
