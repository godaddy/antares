import { ProgressSteps, ProgressStep, type ProgressStepsProps, type ProgressStepStatus } from '@godaddy/antares';

export interface ProgressStepsPlaygroundExampleProps {
  orientation?: ProgressStepsProps['orientation'];
  currentStep?: number;
  hideStepNumbers?: boolean;
  interactive?: boolean;
}

const steps: { label: string; status: ProgressStepStatus }[] = [
  { label: 'Cart', status: 'complete' },
  { label: 'Shipping', status: 'partial' },
  { label: 'Payment', status: 'error' },
  { label: 'Review', status: 'none' }
];

export function ProgressStepsPlaygroundExample({
  orientation = 'horizontal',
  currentStep = 1,
  hideStepNumbers = false,
  interactive = true
}: ProgressStepsPlaygroundExampleProps) {
  return (
    <ProgressSteps
      aria-label="Checkout"
      orientation={orientation}
      currentStep={currentStep}
      hideStepNumbers={hideStepNumbers}
    >
      {steps.map((step) => (
        <ProgressStep
          key={step.label}
          status={step.status}
          onPress={interactive ? () => undefined : undefined}
        >
          {step.label}
        </ProgressStep>
      ))}
    </ProgressSteps>
  );
}
