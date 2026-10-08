import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue } from '@godaddy/antares';

/**
 * ProgressBarValue shows the formatted value by default and accepts static or state-based content.
 * Static content does not change the accessible value; set the root's valueLabel when needed.
 * @order 7
 */
export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60}>
        <Label>Upload progress</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Files uploaded</Label>
        <ProgressBarValue>
          <span>3 of 5 files</span>
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Processing progress</Label>
        <ProgressBarValue>
          {function renderValue({ percentage }) {
            return `Current: ${percentage}%`;
          }}
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}
