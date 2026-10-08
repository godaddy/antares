import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue } from '@godaddy/antares';

/**
 * Three track heights are available: `xs` (6px), `sm` (12px), and `md` (24px).
 * @order 2
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar size="xs" value={40}>
        <Label>Extra Small</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar size="sm" value={60}>
        <Label>Small</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar size="md" value={80}>
        <Label>Medium</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}
