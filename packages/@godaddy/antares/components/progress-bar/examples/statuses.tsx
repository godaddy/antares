import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text } from '@godaddy/antares';

/**
 * Use `status` to communicate intent and a description for additional context.
 * @order 3
 */
export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar status="default" value={50}>
        <Label>Default</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">In progress</Text>
      </ProgressBar>
      <ProgressBar status="success" value={100}>
        <Label>Success</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Complete</Text>
      </ProgressBar>
      <ProgressBar status="warning" value={70}>
        <Label>Warning</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Storage almost full</Text>
      </ProgressBar>
      <ProgressBar status="critical" value={30}>
        <Label>Critical</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Action required</Text>
      </ProgressBar>
    </Flex>
  );
}
