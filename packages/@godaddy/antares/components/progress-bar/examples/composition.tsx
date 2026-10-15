import { useState, type RefAttributes } from 'react';
import { Button, Label, ProgressBar, Box, Text, type ProgressBarProps, type BoxProps } from '@godaddy/antares';

interface CompositionExampleProps extends ProgressBarProps, RefAttributes<HTMLDivElement> {
  /** Props for the track. */
  trackProps?: BoxProps & RefAttributes<HTMLDivElement>;

  /** Props for the visible value. */
  valueProps?: BoxProps & RefAttributes<HTMLDivElement>;

  /** Include a nested progress bar to check context isolation. */
  nested?: boolean;
}

/** @ignore */
export function CompositionExample({ trackProps, valueProps, nested, ...props }: CompositionExampleProps) {
  const [descriptionId, setDescriptionId] = useState<string | undefined>('upload-description');
  return (
    <>
      <Text id="external-description">Keep this window open.</Text>
      <ProgressBar value={60} aria-describedby="external-description" {...props}>
        {({ valueText }) => (
          <>
            <Box slot="track" {...trackProps} />
            <div style={{ display: 'contents' }}>
              <Text slot={null}>Additional content</Text>
              <Box data-testid="unrelated-box" />
              {descriptionId && (
                <Text id={descriptionId} slot="description">
                  {valueText} uploaded
                </Text>
              )}
              <Box slot="value" {...valueProps} />
              <Label>Uploading</Label>
            </div>
            {nested && (
              <div>
                <ProgressBar value={20} size="xs" status="success">
                  <Label>Current file</Label>
                  <Box slot="value" />
                  <Box slot="track" />
                  <Text slot="description">One file</Text>
                </ProgressBar>
              </div>
            )}
          </>
        )}
      </ProgressBar>
      <Button
        onPress={() =>
          setDescriptionId((id) =>
            id === 'upload-description' ? 'renamed-description' : id ? undefined : 'upload-description'
          )
        }
      >
        Change description
      </Button>
    </>
  );
}
