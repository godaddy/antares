import type { ReactNode } from 'react';
import { Box, ProgressBar, type ProgressBarProps, type ProgressBarRenderProps } from '@godaddy/antares';

interface WithoutLabelExampleProps extends ProgressBarProps {
  /** Whether to include visible value output. */
  showValue?: boolean;

  /** Custom visible value content. Omit for the formatted value. */
  valueContent?: ReactNode | ((state: ProgressBarRenderProps) => ReactNode);
}

/**
 * Compose only the track for progress in a table or fixed position. Supply an accessible name.
 * Add a value slot when a visible value is useful.
 * @order 6
 */
export function WithoutLabelExample({ showValue = false, valueContent, ...props }: WithoutLabelExampleProps) {
  return (
    <ProgressBar aria-label="Upload progress" value={60} size="sm" {...props}>
      {(state) => (
        <>
          {showValue ? (
            <Box slot="value">{typeof valueContent === 'function' ? valueContent(state) : valueContent}</Box>
          ) : null}
          <Box slot="track" />
        </>
      )}
    </ProgressBar>
  );
}
