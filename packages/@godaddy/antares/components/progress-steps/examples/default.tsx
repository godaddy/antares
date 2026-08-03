import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/**
 * A horizontal stepper. `currentStep` marks the active step; earlier steps are `past`, later are `future`. Each `status` sets the step's icon, and an `error` step turns its accent bar red.
 * @order 1
 */
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
