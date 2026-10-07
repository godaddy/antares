import { Button, CloseButton, DialogTrigger, Heading, Wizard, WizardStep, WizardSteps } from '@godaddy/antares';

/**
 * Open a full-screen workflow with consumer-owned content and a close control.
 * @order 1
 */
export function DefaultExample() {
  return (
    <DialogTrigger>
      <Button>Start setup</Button>
      <Wizard>
        <Heading slot="title">Setup</Heading>
        <CloseButton />
        <WizardSteps>
          <WizardStep id="details" label="Details">
            <input aria-label="Account name" />
          </WizardStep>
          <WizardStep id="review" label="Review">
            <p>Review your account</p>
          </WizardStep>
        </WizardSteps>
      </Wizard>
    </DialogTrigger>
  );
}
