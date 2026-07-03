import { ProgressSteps, ProgressStep } from '@godaddy/antares';
import { useState } from 'react';

const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

/** Interactive steps: each `onPress` navigates the wizard by updating `currentStep`. */
export function InteractiveExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ProgressSteps aria-label="Checkout" currentStep={currentStep}>
      {steps.map((label, index) => (
        <ProgressStep
          key={label}
          status={index < currentStep ? 'complete' : index === currentStep ? 'partial' : 'none'}
          onPress={() => setCurrentStep(index)}
        >
          {label}
        </ProgressStep>
      ))}
    </ProgressSteps>
  );
}
