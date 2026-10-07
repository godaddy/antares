import {
  Button,
  ButtonGroup,
  CloseButton,
  DialogTrigger,
  Footer,
  Heading,
  Input,
  Label,
  TextField,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

/**
 * Open a full-screen workflow with one step collection and optional consumer-composed navigation.
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
            <Heading>Details</Heading>
            <TextField>
              <Label>Account name</Label>
              <Input />
            </TextField>
          </WizardStep>
          <WizardStep id="review" label="Review">
            <Heading>Review</Heading>
            <p>Review your account</p>
          </WizardStep>
        </WizardSteps>
        <Footer>
          <WizardStepsMenu />
          <ButtonGroup>
            <Button slot="previous">Previous</Button>
            <Button slot="next">Next</Button>
          </ButtonGroup>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}
