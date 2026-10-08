import { useState, type RefAttributes } from 'react';
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
}

/**
 * Parts keep their association through wrappers and fragments. Named areas allow a different source order.
 * The description can appear or disappear independently of the root.
 * @order 8
 */
export function CompositionExample({ trackProps, valueProps, ...props }: CompositionExampleProps) {
  const [showDescription, setShowDescription] = useState(true);
  const [descriptionId, setDescriptionId] = useState('upload-description');
  return (
    <>
      <Text id="external-description">Keep this window open.</Text>
      <ProgressBar value={60} aria-describedby="external-description" {...props}>
        {function renderParts({ valueText }) {
          return (
            <>
              <ProgressBarTrack {...trackProps} />
              <div style={{ display: 'contents' }}>
                <Text slot={null}>Additional content</Text>
                {showDescription ? (
                  <Text id={descriptionId} slot="description">
                    {valueText} uploaded
                  </Text>
                ) : null}
                <ProgressBarValue {...valueProps} />
                <Label>Uploading</Label>
              </div>
            </>
          );
        }}
      </ProgressBar>
      <Button
        onPress={function toggleDescription() {
          setShowDescription(!showDescription);
        }}
      >
        Toggle description
      </Button>
      <Button
        onPress={function changeDescriptionId() {
          setDescriptionId('renamed-description');
        }}
      >
        Change description ID
      </Button>
    </>
  );
}
