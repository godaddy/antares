import { useContext } from 'react';
import {
  Button,
  DialogTrigger,
  Wizard,
  WizardStateContext,
  WizardStep,
  WizardSteps,
  type WizardProps
} from '@godaddy/antares';

function Controls() {
  const state = useContext(WizardStateContext);
  if (!state) throw new Error('Missing Wizard state');

  return (
    <>
      <output aria-label="Current step">{String(state.activeStep)}</output>
      <output aria-label="Position">{state.activePosition}</output>
      <output aria-label="Visited steps">{[...state.visitedSteps].join(', ')}</output>
      <output aria-label="Step order">{state.collection.join(', ')}</output>
      <Button onPress={state.previous} isDisabled={!state.canPrevious}>
        Previous
      </Button>
      <Button onPress={state.next} isDisabled={!state.canNext}>
        Next
      </Button>
      <Button onPress={() => state.goToStep('review')}>Review directly</Button>
    </>
  );
}

/** Navigate through a static collection with custom controls. */
export function NavigationExample({
  defaultActiveStep,
  activeStep,
  onStepChange
}: Pick<WizardProps, 'defaultActiveStep' | 'activeStep' | 'onStepChange'> = {}) {
  return (
    <DialogTrigger>
      <Button>Open navigation</Button>
      <Wizard
        aria-label="Navigation"
        defaultActiveStep={defaultActiveStep}
        activeStep={activeStep}
        onStepChange={onStepChange}
      >
        <WizardSteps>
          <WizardStep id="details" label="Details">
            <Controls />
          </WizardStep>
          <WizardStep id="review" label="Review">
            <Controls />
          </WizardStep>
          <WizardStep id="confirm" label="Confirm">
            <Controls />
          </WizardStep>
        </WizardSteps>
      </Wizard>
    </DialogTrigger>
  );
}
