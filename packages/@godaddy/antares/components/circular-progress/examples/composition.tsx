import { useState, type ReactNode, type RefAttributes } from 'react';
import { Box, Button, Label, Text, type BoxProps } from '@godaddy/antares';
import {
  CircularProgress,
  type CircularProgressProps,
  type ProgressBarRenderProps
} from '@godaddy/antares/CircularProgress';

interface CompositionExampleProps extends CircularProgressProps, RefAttributes<HTMLDivElement> {
  /** Props for the circular track. */
  trackProps?: BoxProps & RefAttributes<HTMLDivElement>;

  /** Props for the visible value. */
  valueProps?: BoxProps & RefAttributes<HTMLDivElement>;

  /** Include a nested progress indicator to check context isolation. */
  nested?: boolean;

  /** Whether to include the visible label. */
  showLabel?: boolean;

  /** Whether to include the visible value. */
  showValue?: boolean;

  /** Whether to include the description. */
  showDescription?: boolean;

  /** Custom value content. Omit for the formatted value. */
  valueContent?: ReactNode | ((state: ProgressBarRenderProps) => ReactNode);
}

/** @ignore */
export function CompositionExample({
  trackProps,
  valueProps,
  nested,
  showLabel = true,
  showValue = true,
  showDescription = true,
  valueContent,
  ...props
}: CompositionExampleProps) {
  const [descriptionId, setDescriptionId] = useState<string | undefined>('upload-description');
  return (
    <>
      <Text id="external-description">Keep this window open.</Text>
      <CircularProgress
        value={60}
        aria-label={showLabel ? undefined : 'Upload progress'}
        aria-describedby="external-description"
        {...props}
      >
        {(state) => (
          <>
            <Box slot="track" {...trackProps} />
            <div style={{ display: 'contents' }}>
              {nested && <Text slot={null}>Additional content</Text>}
              <Box data-testid="unrelated-box" />
              {showDescription && descriptionId && (
                <Text id={descriptionId} slot="description">
                  {state.valueText} uploaded
                </Text>
              )}
              {showValue && (
                <Box slot="value" {...valueProps}>
                  {typeof valueContent === 'function' ? valueContent(state) : valueContent}
                </Box>
              )}
              {showLabel && <Label>Uploading</Label>}
            </div>
            {nested && (
              <div>
                <CircularProgress value={20} size="sm" status="success">
                  <Box slot="track" />
                  <Box slot="value" />
                  <Label>Current file</Label>
                  <Text slot="description">One file</Text>
                </CircularProgress>
              </div>
            )}
          </>
        )}
      </CircularProgress>
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
