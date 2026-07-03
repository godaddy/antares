import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** A disabled interactive step is muted, not focusable, and cannot be activated. */
export function DisabledExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1}>
      <ProgressStep status="complete" onPress={() => undefined}>
        Cart
      </ProgressStep>
      <ProgressStep status="partial" onPress={() => undefined}>
        Shipping
      </ProgressStep>
      <ProgressStep onPress={() => undefined} isDisabled>
        Payment
      </ProgressStep>
      <ProgressStep onPress={() => undefined} isDisabled>
        Review
      </ProgressStep>
    </ProgressSteps>
  );
}
