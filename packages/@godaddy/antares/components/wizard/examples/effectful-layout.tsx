import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Button, DialogTrigger, Footer, Wizard, WizardStep, WizardSteps, WizardStepsMenu } from '@godaddy/antares';

function StepWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function EffectfulFooter({ onMount, addStep }: { onMount: () => void; addStep: () => void }) {
  useEffect(
    function recordFooterMount() {
      onMount();
    },
    [onMount]
  );

  return (
    <Footer>
      <WizardStepsMenu />
      <Button onPress={addStep}>Add step</Button>
      <Button slot="next">Next</Button>
      <Button slot="close">Close workflow</Button>
    </Footer>
  );
}

/** Effectful sibling regions should mount once during each open run. @ignore */
export function EffectfulLayoutExample() {
  const [mounts, setMounts] = useState(0);
  const [steps, setSteps] = useState([{ id: 'details', label: 'Details' }]);
  const recordMount = useCallback(() => setMounts((count) => count + 1), []);
  const addStep = useCallback(() => setSteps((items) => [...items, { id: 'review', label: 'Review' }]), []);

  return (
    <>
      <output data-testid="footer-mounts">{mounts}</output>
      <DialogTrigger>
        <Button>Open effectful workflow</Button>
        <Wizard aria-label="Effectful workflow">
          <p>Before steps</p>
          <StepWrapper>
            <WizardSteps items={steps}>
              {(step) => (
                <WizardStep id={step.id} label={step.label}>
                  {step.label} content
                </WizardStep>
              )}
            </WizardSteps>
          </StepWrapper>
          <EffectfulFooter onMount={recordMount} addStep={addStep} />
        </Wizard>
      </DialogTrigger>
    </>
  );
}
