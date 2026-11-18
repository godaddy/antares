import { useContext, useState } from 'react';
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
  WizardStateContext,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

function NextButton() {
  const state = useContext(WizardStateContext);
  return <Button slot="next">{state?.canFinish ? 'Finish' : 'Next'}</Button>;
}

/**
 * Open a full-screen workflow with one step collection and optional consumer-composed navigation.
 * @order 1
 */
export function DefaultExample() {
  const [isOpen, setOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  return (
    <>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Start setup</Button>
        <Wizard
          onFinish={function finishSetup() {
            setFinished(true);
            setOpen(false);
          }}
        >
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
              <NextButton />
            </ButtonGroup>
          </Footer>
        </Wizard>
      </DialogTrigger>
      {finished && <p role="status">Setup finished</p>}
    </>
  );
}
