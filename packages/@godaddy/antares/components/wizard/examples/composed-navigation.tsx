import { useContext } from 'react';
import {
  Button,
  ButtonGroup,
  CloseButton,
  DialogTrigger,
  Footer,
  Wizard,
  WizardStateContext,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

function CustomControl() {
  const state = useContext(WizardStateContext);
  if (!state) throw new Error('Missing Wizard state');
  return <Button onPress={() => state.goToStep('review')}>Revisit review</Button>;
}

/** Consumer-composed navigation, menu, and close controls. */
export function ComposedNavigationExample({
  footerElevation,
  onNextPress
}: {
  footerElevation?: 'base';
  onNextPress?: () => void;
} = {}) {
  return (
    <DialogTrigger>
      <Button>Open composed wizard</Button>
      <Wizard aria-label="Composed workflow">
        <CloseButton />
        <WizardSteps>
          <WizardStep id="details" label="Details">
            Account details
          </WizardStep>
          <WizardStep id="review" label="Review">
            Review account
          </WizardStep>
          <WizardStep id="confirm" label="Confirm">
            Confirm account
          </WizardStep>
        </WizardSteps>
        <Footer data-testid="wizard-footer" elevation={footerElevation}>
          <WizardStepsMenu />
          <ButtonGroup>
            <Button slot="next" onPress={onNextPress}>
              Next
            </Button>
            <Button slot="previous">Previous</Button>
            <CustomControl />
            <Button slot="close">Cancel</Button>
          </ButtonGroup>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}
