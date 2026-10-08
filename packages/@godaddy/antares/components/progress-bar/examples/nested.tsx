import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text } from '@godaddy/antares';

/** @ignore */
export function NestedExample() {
  return (
    <ProgressBar value={60}>
      <Label>Overall upload</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">All files</Text>
      <div>
        <ProgressBar value={20} size="xs" status="success">
          <Label>Current file</Label>
          <ProgressBarValue />
          <ProgressBarTrack />
          <Text slot="description">One file</Text>
        </ProgressBar>
      </div>
    </ProgressBar>
  );
}
