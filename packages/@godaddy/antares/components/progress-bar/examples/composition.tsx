import { useId, useState, type RefAttributes } from 'react';
import {
  Button,
  Label,
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  Text,
  type ProgressBarProps,
  type ProgressBarTrackProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface CompositionExampleProps extends ProgressBarProps, RefAttributes<HTMLDivElement> {
  /** Props for the track. */
  trackProps?: ProgressBarTrackProps & RefAttributes<HTMLDivElement>;

  /** Props for the visible value. */
  valueProps?: ProgressBarValueProps & RefAttributes<HTMLElement>;

  /** Include a nested progress bar to check context isolation. */
  nested?: boolean;
}

/** @ignore */
export function CompositionExample({ trackProps, valueProps, nested, ...props }: CompositionExampleProps) {
  const nestedDescriptionId = useId();
  const { 'aria-describedby': describedBy = 'external-description', ...rest } = props;
  const [descriptionId, setDescriptionId] = useState<string | undefined>('upload-description');
  return (
    <>
      <Text id="external-description">Keep this window open.</Text>
      <ProgressBar value={60} aria-describedby={[describedBy, descriptionId].filter(Boolean).join(' ')} {...rest}>
        {({ valueText }) => (
          <>
            <ProgressBarTrack {...trackProps} />
            <div style={{ display: 'contents' }}>
              <Text slot={null}>Additional content</Text>
              {descriptionId && (
                <Text id={descriptionId} slot="description">
                  {valueText} uploaded
                </Text>
              )}
              <ProgressBarValue {...valueProps} />
              <Label>Uploading</Label>
            </div>
            {nested && (
              <div>
                <ProgressBar value={20} size="xs" status="success" aria-describedby={nestedDescriptionId}>
                  <Label>Current file</Label>
                  <ProgressBarValue />
                  <ProgressBarTrack />
                  <Text id={nestedDescriptionId} slot="description">
                    One file
                  </Text>
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
