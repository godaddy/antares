import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** No `currentStep`: the flow hasn't started, so every step is `future` and none is marked current. */
export function NotStartedExample() {
  return (
    <ProgressSteps aria-label="Checkout">
      <ProgressStep>Cart</ProgressStep>
      <ProgressStep>Shipping</ProgressStep>
      <ProgressStep>Payment</ProgressStep>
      <ProgressStep>Review</ProgressStep>
    </ProgressSteps>
  );
}
