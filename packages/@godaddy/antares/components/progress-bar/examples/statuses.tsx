import { useId } from 'react';
import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text } from '@godaddy/antares';

/**
 * Use `status` to communicate intent and a description for additional context.
 * @order 3
 */
export function StatusesExample() {
  const descriptionId = useId();
  return (
    <Flex direction="column" gap="md">
      <ProgressBar aria-describedby={`${descriptionId}-default`} status="default" value={50}>
        <Label>Default</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text id={`${descriptionId}-default`} slot="description">
          In progress
        </Text>
      </ProgressBar>
      <ProgressBar aria-describedby={`${descriptionId}-success`} status="success" value={100}>
        <Label>Success</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text id={`${descriptionId}-success`} slot="description">
          Complete
        </Text>
      </ProgressBar>
      <ProgressBar aria-describedby={`${descriptionId}-warning`} status="warning" value={70}>
        <Label>Warning</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text id={`${descriptionId}-warning`} slot="description">
          Storage almost full
        </Text>
      </ProgressBar>
      <ProgressBar aria-describedby={`${descriptionId}-critical`} status="critical" value={30}>
        <Label>Critical</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text id={`${descriptionId}-critical`} slot="description">
          Action required
        </Text>
      </ProgressBar>
    </Flex>
  );
}
