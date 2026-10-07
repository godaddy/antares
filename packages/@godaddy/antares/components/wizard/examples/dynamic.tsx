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

export interface DynamicStep {
  id: string;
  label: string;
}

function StepControls() {
  const state = useContext(WizardStateContext);
  if (!state) throw new Error('Missing Wizard state');

  return (
    <>
      <output aria-label="Current step">{String(state.activeStep)}</output>
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

/** Change keyed items while a composed Wizard remains open. */
export function DynamicExample({
  items,
  activeStep,
  defaultActiveStep,
  onStepChange
}: Pick<WizardProps, 'activeStep' | 'defaultActiveStep' | 'onStepChange'> & { items: DynamicStep[] }) {
  return (
    <DialogTrigger>
      <Button>Open dynamic wizard</Button>
      <Wizard
        aria-label="Dynamic workflow"
        activeStep={activeStep}
        defaultActiveStep={defaultActiveStep}
        onStepChange={onStepChange}
      >
        <WizardSteps items={items}>
          {(item) => (
            <WizardStep id={item.id} label={item.label}>
              <label>
                {item.label} value
                <input />
              </label>
              <StepControls />
            </WizardStep>
          )}
        </WizardSteps>
      </Wizard>
    </DialogTrigger>
  );
}
