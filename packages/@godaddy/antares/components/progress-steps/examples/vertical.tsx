import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** Vertical orientation: accent bar on the leading edge, steps stacked in a column. */
export function VerticalExample() {
  return (
    <ProgressSteps aria-label="Onboarding" orientation="vertical" currentStep={1}>
      <ProgressStep status="complete">Create account</ProgressStep>
      <ProgressStep status="partial">Verify email</ProgressStep>
      <ProgressStep>Add payment method</ProgressStep>
      <ProgressStep>Invite your team</ProgressStep>
    </ProgressSteps>
  );
}
