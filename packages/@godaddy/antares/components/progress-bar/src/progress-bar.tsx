import { forwardRef, type ReactNode } from 'react';
import {
  DEFAULT_SLOT,
  ProgressBar as RACProgressBar,
  Provider as RACProvider,
  type ProgressBarProps as RACProgressBarProps,
  useSlottedContext
} from 'react-aria-components';
import { LabelContext } from '#components/label';
import { TextContext } from '#components/text';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { textTreatmentClassName } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';
import { ProgressBarStateContext } from './state.ts';
import styles from './index.module.css';

export interface ProgressBarProps extends RACProgressBarProps, Omit<GridOwnProps, 'as'> {
  /** Composed label, value, track, and description. A function receives progress state. */
  children?: RACProgressBarProps['children'];

  /** Accessible value text, also used by ProgressBarValue's default output. Does not add visible output. */
  valueLabel?: string;

  /** Visual size of the track. @default 'md' */
  size?: 'xs' | 'sm' | 'md';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

interface ProgressBarBodyProps {
  /** Composed interior. */
  children: ReactNode;
}

// Read the context inside RACProgressBar so React Aria's label ID and ref survive styling.
function ProgressBarBody({ children }: ProgressBarBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, styles.label) }],
        [
          TextContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              description: {
                className: composeClassName(undefined, styles.description, textTreatmentClassName('inherit'))
              }
            }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/** Shows determinate or indeterminate progress. Compose only the parts you need. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(props, ref) {
  const { size = 'md', status = 'default', className, children, ...rest } = props;

  return (
    <Grid
      columns="minmax(0, 1fr) auto"
      areas={['label value', 'track track', 'description description']}
      columnGap="xs"
      alignItems="baseline"
      {...rest}
      as={RACProgressBar}
      ref={ref}
      className={composeClassName(className, styles.progressBar)}
      data-size={size}
      data-status={status}
    >
      {function renderContent(state) {
        return (
          <ProgressBarStateContext.Provider value={state}>
            <ProgressBarBody>{typeof children === 'function' ? children(state) : children}</ProgressBarBody>
          </ProgressBarStateContext.Provider>
        );
      }}
    </Grid>
  );
});
