import { Button, DialogTrigger, Wizard, WizardStep, WizardSteps } from '@godaddy/antares';

/** Configures each overlay layer independently. @ignore */
export function LayerPropsExample() {
  return (
    <DialogTrigger>
      <Button>Open custom wizard</Button>
      <Wizard
        aria-label="Custom workflow"
        className="custom-dialog"
        overlayProps={{ className: 'custom-overlay' }}
        containerProps={{ className: 'custom-container' }}
      >
        <WizardSteps>
          <WizardStep id={42} label="First step">
            First content
          </WizardStep>
        </WizardSteps>
      </Wizard>
    </DialogTrigger>
  );
}
