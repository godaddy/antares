import { createContext, forwardRef, useCallback, useState, type ReactNode, type Ref } from 'react';
import { useId } from 'react-aria';
import {
  DEFAULT_SLOT,
  ProgressBar as RACProgressBar,
  Provider as RACProvider,
  type ContextValue,
  type ProgressBarProps as RACProgressBarProps,
  useContextProps,
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

  /** Show ongoing activity when progress cannot be measured. Ignores value and hides value text. @default false */
  isIndeterminate?: boolean;

  /** Accessible value text, also used by ProgressBarValue's default output. Does not add visible output. */
  valueLabel?: string;

  /** Visual size of the track. @default 'md' */
  size?: 'xs' | 'sm' | 'md';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

export const ProgressBarContext = createContext<ContextValue<ProgressBarProps, HTMLDivElement>>(null);

interface ProgressBarBodyProps {
  /** ID for the description slot. */
  descriptionId: string;

  /** Tracks whether a description is mounted. */
  descriptionRef: Ref<HTMLElement>;

  /** Composed interior. */
  children: ReactNode;
}

// Read the context inside RACProgressBar so React Aria's label ID and ref survive styling.
function ProgressBarBody({ descriptionId, descriptionRef, children }: ProgressBarBodyProps) {
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

/**
 * Shows determinate or indeterminate progress. Compose only the parts you need.
 *
 * @example
 * ```tsx
 * <ProgressBar value={60}>
 *   <Label>Uploading</Label>
 *   <ProgressBarValue />
 *   <ProgressBarTrack />
 *   <Text slot="description">3 of 5 files uploaded</Text>
 * </ProgressBar>
 * ```
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(props, ref) {
  [props, ref] = useContextProps(props, ref, ProgressBarContext);
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
          <ProgressBarStateContext.Provider value={state}>
            <ProgressBarBody descriptionId={descriptionId} descriptionRef={descriptionRef}>
              {typeof children === 'function' ? children(state) : children}
            </ProgressBarBody>
          </ProgressBarStateContext.Provider>
        );
      }}
    </Grid>
  );
});
