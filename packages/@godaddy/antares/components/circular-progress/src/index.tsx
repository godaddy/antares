import { forwardRef, useCallback, useState, type CSSProperties, type ReactNode, type Ref } from 'react';
import { useId } from 'react-aria';
import {
  DEFAULT_SLOT,
  ProgressBar as RACProgressBar,
  Provider as RACProvider,
  type ProgressBarProps as RACProgressBarProps,
  type ProgressBarRenderProps,
  composeRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { LabelContext } from '#components/label';
import { TextContext } from '#components/text';
import { BoxContext } from '#components/layout/box';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { textTreatmentClassName } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

const VIEWBOX_SIZE = 100;
const STROKE_WIDTH = 12.5;
const RADIUS = (VIEWBOX_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface CircularProgressProps extends RACProgressBarProps, Omit<GridOwnProps, 'as'> {
  /** Composed label, value, circular track, and description. A function receives progress state. */
  children?: RACProgressBarProps['children'];

  /** Accessible value text and default value-slot content. Does not add visible output. */
  valueLabel?: string;

  /** Size preset controlling circle diameter and typography scale. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

interface CircularProgressBodyProps {
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
function CircularProgressBody({ state, descriptionId, descriptionRef, children }: CircularProgressBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const value = {
    children: state.isIndeterminate ? null : state.valueText,
    className: composeClassName(undefined, styles.value, textTreatmentClassName('inherit')),
    'aria-hidden': true,
    'data-indeterminate': state.isIndeterminate || undefined
  };
  const offset = CIRCUMFERENCE * (state.isIndeterminate ? 0.75 : 1 - (state.percentage ?? 0) / 100);

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
                className: styles.indicator,
                'aria-hidden': true,
                'data-indeterminate': state.isIndeterminate || undefined,
                children: (
                  <svg
                    className={styles.svg}
                    data-indeterminate={state.isIndeterminate || undefined}
                    viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
                    aria-hidden="true"
                  >
                    <circle className={styles.track} cx="50" cy="50" r={RADIUS} fill="none" strokeLinecap="round" />
                    <circle
                      className={styles.fill}
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="none"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={offset}
                    />
                  </svg>
                )
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

/** Shows circular determinate or indeterminate progress. Compose only the parts you need. */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress(props, ref) {
    const {
      size = 'md',
      status = 'default',
      className,
      style,
      children,
      'aria-describedby': describedBy,
      ...rest
    } = props;
    const descriptionId = useId();
    const [hasDescription, setHasDescription] = useState(false);
    const descriptionRef = useCallback(function descriptionRef(element: HTMLElement | null) {
      setHasDescription(!!element);
    }, []);
    const description =
      [describedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined;

    return (
      <Grid
        columns="minmax(0, 1fr)"
        areas={['track', 'label', 'description']}
        justifyItems="center"
        {...rest}
        as={RACProgressBar}
        ref={ref}
        className={composeClassName(className, styles.root)}
        data-size={size}
        data-status={status}
        aria-describedby={description}
        style={composeRenderProps(style, function composeStyle(value) {
          return { ...value, '--circular-progress-stroke-width': STROKE_WIDTH } as CSSProperties;
        })}
      >
        {function renderContent(state) {
          return (
            <CircularProgressBody state={state} descriptionId={descriptionId} descriptionRef={descriptionRef}>
              {typeof children === 'function' ? children(state) : children}
            </CircularProgressBody>
          );
        }}
      </Grid>
    );
  }
);
