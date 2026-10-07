import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  DialogTrigger,
  Footer,
  Heading,
  Input,
  Label,
  TextField,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu,
  type WizardProps
} from '@godaddy/antares';

/** Validate in the application before accepting a navigation request; submit only through the application's final action. */
export function ControlledValidationExample() {
  const [isOpen, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<NonNullable<WizardProps['activeStep']>>('details');
  const [accountName, setAccountName] = useState('');
  const [error, setError] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  function requestStep(step: NonNullable<WizardProps['activeStep']>) {
    if (step === 'review' && !accountName.trim()) {
      setError('Enter an account name to continue.');
      return;
    }
    setError('');
    setActiveStep(step);
  }

  return (
    <>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Create account</Button>
        <Wizard activeStep={activeStep} onStepChange={requestStep}>
          <Heading slot="title">Create an account</Heading>
          <WizardSteps>
            <WizardStep id="details" label="Account details">
              <Heading>Account details</Heading>
              <TextField>
                <Label>Account name</Label>
                <Input value={accountName} onChange={(event) => setAccountName(event.target.value)} />
              </TextField>
              {error && <p role="alert">{error}</p>}
            </WizardStep>
            <WizardStep id="review" label="Review">
              <Heading>Review</Heading>
              <p>Account: {accountName}</p>
            </WizardStep>
          </WizardSteps>
          <Footer>
            <WizardStepsMenu />
            <ButtonGroup>
              <Button slot="previous">Previous</Button>
              <Button slot="next">Next</Button>
              {activeStep === 'review' && (
                <Button
                  onPress={function createAccount() {
                    setSubmittedName(accountName);
                    setOpen(false);
                  }}
                >
                  Create
                </Button>
              )}
              <Button slot="close">Cancel</Button>
            </ButtonGroup>
          </Footer>
        </Wizard>
      </DialogTrigger>
      {submittedName && <p role="status">Account created for {submittedName}</p>}
    </>
  );
}
