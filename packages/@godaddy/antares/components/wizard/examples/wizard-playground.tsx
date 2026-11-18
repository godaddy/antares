import {
  Button,
  ButtonGroup,
  CloseButton,
  DialogTrigger,
  Footer,
  Heading,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

export function PlaygroundExample({
  defaultActiveStep,
  isKeyboardDismissDisabled,
  showMenu,
  showCloseButton
}: {
  defaultActiveStep: 'details' | 'review';
  isKeyboardDismissDisabled: boolean;
  showMenu: boolean;
  showCloseButton: boolean;
}) {
  return (
    <DialogTrigger>
      <Button>Open workflow</Button>
      <Wizard defaultActiveStep={defaultActiveStep} isKeyboardDismissDisabled={isKeyboardDismissDisabled}>
        <Heading slot="title">Account setup</Heading>
        {showCloseButton && <CloseButton />}
        <WizardSteps>
          <WizardStep id="details" label="Details">
            <Heading>Details</Heading>
            <p>Enter your account details.</p>
          </WizardStep>
          <WizardStep id="review" label="Review">
            <Heading>Review</Heading>
            <p>Check your account details.</p>
          </WizardStep>
        </WizardSteps>
        <Footer>
          {showMenu && <WizardStepsMenu />}
          <ButtonGroup>
            <Button slot="previous">Previous</Button>
            <Button slot="next">Next</Button>
          </ButtonGroup>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}
