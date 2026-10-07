import type { ReactNode } from 'react';
import { Button, DialogTrigger, Footer, Wizard, WizardStep, WizardSteps, WizardStepsMenu } from '@godaddy/antares';

function StepsWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** A wrapper can supply the collection without changing the authored layout. @ignore */
export function WrappedStepsExample() {
  return (
    <DialogTrigger>
      <Button>Open wrapped workflow</Button>
      <Wizard aria-label="Wrapped workflow">
        <p>Before steps</p>
        <StepsWrapper>
          <WizardSteps>
            <WizardStep id="details" label="Details">
              Details content
            </WizardStep>
            <WizardStep id="review" label="Review">
              Review content
            </WizardStep>
          </WizardSteps>
        </StepsWrapper>
        <Footer>
          <WizardStepsMenu />
          <Button slot="next">Next</Button>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}
