import { useCallback, useState, type ReactNode, type Ref } from 'react';
import { useId } from 'react-aria';
import {
  DEFAULT_SLOT,
  Provider as RACProvider,
  type ProgressBarRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { LabelContext } from '#components/label';
import { TextContext } from '#components/text';
import { BoxContext, type BoxProps } from '#components/layout/box';
import { textTreatmentClassName } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';

/** Registers a composed description while preserving external description references. */
export function useProgressDescription(describedBy?: string) {
  const descriptionId = useId();
  const [hasDescription, setHasDescription] = useState(false);
  const descriptionRef = useCallback(function descriptionRef(element: HTMLElement | null) {
    setHasDescription(!!element);
  }, []);
  const description = [describedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined;

  return { descriptionId, descriptionRef, describedBy: description };
}

interface ProgressSlotsProps {
  /** Current progress state for the visual slots. */
  state: ProgressBarRenderProps;

  /** ID for the description slot. */
  descriptionId: string;

  /** Tracks whether a description is mounted. */
  descriptionRef: Ref<HTMLElement>;

  /** Component-specific classes for the shared text slots. */
  classNames: { label: string; value: string; description: string };

  /** Component-specific track content and presentation. */
  track: BoxProps;

  /** Hide the value slot from assistive technology. */
  isValueDecorative?: boolean;

  /** Composed interior. */
  children: ReactNode;
}

/** Provides progress slots inside RACProgressBar, preserving React Aria's label ID and ref. */
export function ProgressSlots({
  state,
  descriptionId,
  descriptionRef,
  classNames,
  track,
  isValueDecorative,
  children
}: ProgressSlotsProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const value = {
    children: state.isIndeterminate ? null : state.valueText,
    className: composeClassName(undefined, classNames.value, textTreatmentClassName('inherit')),
    'aria-hidden': isValueDecorative || undefined,
    'data-indeterminate': state.isIndeterminate || undefined
  };

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, classNames.label) }],
        [BoxContext, { slots: { [DEFAULT_SLOT]: {}, value, track } }],
        [
          TextContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              value,
              description: {
                id: descriptionId,
                ref: descriptionRef,
                className: composeClassName(undefined, classNames.description, textTreatmentClassName('inherit'))
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
