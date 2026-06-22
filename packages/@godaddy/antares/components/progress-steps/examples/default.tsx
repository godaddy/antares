import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1}>
      <ProgressStep status="complete">Cart</ProgressStep>
      <ProgressStep status="partial">Shipping</ProgressStep>
      <ProgressStep status="error">Payment</ProgressStep>
      <ProgressStep>Review</ProgressStep>
    </ProgressSteps>
  );
}
