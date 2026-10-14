import { forwardRef, useCallback, useState, type CSSProperties, type ReactNode, type Ref } from 'react';
import { useId } from 'react-aria';
import {
  DEFAULT_SLOT,
  ProgressBar as RACProgressBar,
  Provider as RACProvider,
  type ProgressBarProps as RACProgressBarProps,
  type ProgressBarRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { LabelContext } from '#components/label';
import { TextContext } from '#components/text';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { BoxContext } from '#components/layout/box';
import { textTreatmentClassName } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface ProgressBarProps extends RACProgressBarProps, Omit<GridOwnProps, 'as'> {
  /** Composed label, value, track, and description. A function receives progress state. */
  children?: RACProgressBarProps['children'];

  /** Accessible value text and default value-slot content. Does not add visible output. */
  valueLabel?: string;

  /** Visual size of the track. @default 'md' */
  size?: 'xs' | 'sm' | 'md';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

interface ProgressBarBodyProps {
  /** Current progress state for the visual slots. */
  state: ProgressBarRenderProps;

  /** ID for the description slot. */
  descriptionId: string;

  /** Tracks whether a description is mounted. */
  descriptionRef: Ref<HTMLElement>;

  /** Composed interior. */
  children: ReactNode;
}

// Read the context inside RACProgressBar so React Aria's label ID and ref survive styling.
function ProgressBarBody({ state, descriptionId, descriptionRef, children }: ProgressBarBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const value = {
    children: state.isIndeterminate ? null : state.valueText,
    className: composeClassName(undefined, styles.value, textTreatmentClassName('inherit')),
    'data-indeterminate': state.isIndeterminate || undefined
  };

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, styles.label) }],
        [
          BoxContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              value,
              track: {
                className: styles.track,
                style: {
                  '--progress-bar-progress': state.isIndeterminate ? undefined : `${state.percentage ?? 0}%`
                } as CSSProperties,
                'aria-hidden': true,
                'data-indeterminate': state.isIndeterminate || undefined
              }
            }
          }
        ],
        [
          TextContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              value,
              description: {
                id: descriptionId,
                ref: descriptionRef,
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
  const { size = 'md', status = 'default', className, children, 'aria-describedby': describedBy, ...rest } = props;
  // React Aria merges a consumer's description ID back into this ID via TextContext.
  const descriptionId = useId();
  const [hasDescription, setHasDescription] = useState(false);
  const descriptionRef = useCallback(function descriptionRef(element: HTMLElement | null) {
    setHasDescription(!!element);
  }, []);
  const description = [describedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined;

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
      aria-describedby={description}
    >
      {function renderContent(state) {
        return (
          <ProgressBarBody state={state} descriptionId={descriptionId} descriptionRef={descriptionRef}>
            {typeof children === 'function' ? children(state) : children}
          </ProgressBarBody>
        );
      }}
    </Grid>
  );
});
