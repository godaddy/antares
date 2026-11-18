import { useState } from 'react';
import {
  Button,
  DialogTrigger,
  Footer,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu,
  type WizardProps
} from '@godaddy/antares';

/** App-managed dismissal and optional app-managed navigation in a reusable workflow. */
export function LifecycleExample({
  allowClose = true,
  allowNavigation = true,
  controlled = false,
  defaultActiveStep,
  isKeyboardDismissDisabled = false
}: {
  allowClose?: boolean;
  allowNavigation?: boolean;
  controlled?: boolean;
  defaultActiveStep?: WizardProps['defaultActiveStep'];
  isKeyboardDismissDisabled?: boolean;
} = {}) {
  const [isOpen, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<WizardProps['activeStep']>('details');

  return (
    <>
      <Button>Outside workflow</Button>
      <DialogTrigger isOpen={isOpen} onOpenChange={(open) => (open || allowClose) && setOpen(open)}>
        <Button>Open lifecycle</Button>
        <Wizard
          aria-label="Lifecycle workflow"
          defaultActiveStep={defaultActiveStep}
          activeStep={controlled ? activeStep : undefined}
          onStepChange={controlled ? (key) => allowNavigation && setActiveStep(key) : undefined}
          isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        >
          <WizardSteps>
            <WizardStep id="details" label="Details">
              <input aria-label="Details entry" />
            </WizardStep>
            <WizardStep id="review" label="Review">
              <input aria-label="Review entry" />
            </WizardStep>
            <WizardStep id="confirm" label="Confirm">
              <input aria-label="Confirm entry" />
            </WizardStep>
          </WizardSteps>
          <Footer>
            <WizardStepsMenu />
            <Button slot="previous">Previous</Button>
            <Button slot="next">Next</Button>
            <Button slot="close">Close workflow</Button>
          </Footer>
        </Wizard>
      </DialogTrigger>
    </>
  );
}
