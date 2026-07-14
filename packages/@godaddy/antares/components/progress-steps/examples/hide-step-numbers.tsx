import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** Step numbers are shown by default; `hideStepNumbers` omits the "N. " prefix. */
export function HideStepNumbersExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1} hideStepNumbers>
      <ProgressStep status="complete">Cart</ProgressStep>
      <ProgressStep status="partial">Shipping</ProgressStep>
      <ProgressStep>Payment</ProgressStep>
    </ProgressSteps>
  );
}
