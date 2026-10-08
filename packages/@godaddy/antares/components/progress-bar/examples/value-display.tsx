import {
  Flex,
  Label,
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  type ProgressBarProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface ValueDisplayExampleProps extends ProgressBarProps {
  /** Content of the state-based value. */
  valueContent?: ProgressBarValueProps['children'];
}

/**
 * ProgressBarValue shows the formatted value by default and accepts static or state-based content.
 * Static content does not change the accessible value; set the root's valueLabel when needed.
 * @order 7
 */
export function ValueDisplayExample({ valueContent, ...props }: ValueDisplayExampleProps) {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60} {...props}>
        <Label>Upload progress</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60} {...props}>
        <Label>Files uploaded</Label>
        <ProgressBarValue>
          <span>3 of 5 files</span>
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60} {...props}>
        <Label>Processing progress</Label>
        <ProgressBarValue>
          {valueContent === undefined
            ? function renderValue({ percentage }) {
                return `Current: ${percentage}%`;
              }
            : valueContent}
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}
