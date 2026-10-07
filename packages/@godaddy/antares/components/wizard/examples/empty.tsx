import { Button, DialogTrigger, Wizard, WizardSteps } from '@godaddy/antares';

/** An empty step collection is a valid starting point. @ignore */
export function EmptyExample() {
  return (
    <DialogTrigger>
      <Button>Open empty wizard</Button>
      <Wizard aria-label="Empty workflow">
        <WizardSteps />
      </Wizard>
    </DialogTrigger>
  );
}
