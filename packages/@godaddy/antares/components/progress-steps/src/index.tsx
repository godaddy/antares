import React, { type ReactElement, type ReactNode } from 'react';
import { cx } from 'cva';
import { Button as RACButton, type ButtonProps as RACButtonProps, useLocale } from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { Text } from '#components/text';
import styles from './index.module.css';

/** Completion status of an individual step. Controls the status icon. */
export type ProgressStepStatus = 'none' | 'partial' | 'complete' | 'error';

/** Temporal position of a step relative to `currentStep`. */
type ProgressStepTimeline = 'past' | 'current' | 'future';

/** Status → CDN icon name. */
const statusIcon: Record<ProgressStepStatus, string> = {
  none: 'circle',
  partial: 'circle-half',
  complete: 'ok',
  error: 'alert'
};

/** Props for the {@link ProgressSteps} component. */
export interface ProgressStepsProps extends Omit<FlexOwnProps, 'as' | 'direction'> {
  /** Layout direction of the steps. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** 0-based index of the current step. Omit for a not-yet-started flow. */
  currentStep?: number;
  /** Hide the auto-generated `"N. "` step-number prefix on every step. @default false */
  hideStepNumbers?: boolean;
  /** Accessible label for the navigation landmark. @default 'Progress' */
  'aria-label'?: string;
  /** `ProgressStep` children — must be direct children. */
  children: ReactNode;
  /** Additional class names applied to the root `<nav>`. */
  className?: string;
}

/**
 * Resolve a step's timeline position from its index and the container's `currentStep`.
 * No `currentStep` ⇒ not started (all `future`); a negative value falls through to `future` too;
 * `currentStep >= count` ⇒ all `past` (none current).
 */
function resolveTimeline(index: number, currentStep: number | undefined): ProgressStepTimeline {
  if (currentStep == null) return 'future';
  if (index < currentStep) return 'past';
  if (index === currentStep) return 'current';
  return 'future';
}

/**
 * A multi-step progress indicator for wizard and onboarding flows. Renders a `<nav>` landmark
 * wrapping an ordered list of {@link ProgressStep}s, deriving each step's timeline from `currentStep`.
 *
 * @param props - The properties {@link ProgressStepsProps} passed to the component.
 */
export function ProgressSteps(props: ProgressStepsProps) {
  const {
    orientation = 'horizontal',
    currentStep,
    hideStepNumbers = false,
    'aria-label': ariaLabel = 'Progress',
    children,
    className,
    ...rest
  } = props;
  const { direction } = useLocale();

  const steps = React.Children.toArray(children).filter(
    React.isValidElement
  ) as ReactElement<ProgressStepInternalProps>[];

  return (
    <Flex
      as="nav"
      {...rest}
      direction="column"
      aria-label={ariaLabel}
      dir={direction}
      data-orientation={orientation}
      className={cx(styles.nav, className)}
    >
      <Flex as="ol" role="list" direction={orientation === 'vertical' ? 'column' : 'row'} className={styles.list}>
        {steps.map((step, index) =>
          React.cloneElement(step, {
            key: step.key ?? index,
            timeline: resolveTimeline(index, currentStep),
            stepNumber: hideStepNumbers ? undefined : index + 1
          })
        )}
      </Flex>
    </Flex>
  );
}

/** Props for the {@link ProgressStep} component. */
export interface ProgressStepProps extends Omit<FlexOwnProps, 'as' | 'direction'> {
  /** Step completion status. Controls the status icon. @default 'none' */
  status?: ProgressStepStatus;

  /** Whether the step is disabled (interactive steps only). */
  isDisabled?: boolean;

  /** Press handler. Its presence makes the step interactive; omit it for a display-only step. */
  onPress?: RACButtonProps['onPress'];

  /** Step label content (e.g. "Domain"). The step number is prepended automatically. */
  children: ReactNode;

  /** Additional class names applied to the step element. */
  className?: string;
}

/**
 * Public props plus the props `ProgressSteps` injects into each step. Not exported; set these
 * via the container (`currentStep`, `hideStepNumbers`) rather than per step.
 * @internal
 */
interface ProgressStepInternalProps extends ProgressStepProps {
  /** Timeline position, injected by the container. */
  timeline?: ProgressStepTimeline;

  /** 1-based step number, injected by the container; `undefined` when `hideStepNumbers`. */
  stepNumber?: number;
}

/**
 * An individual step within {@link ProgressSteps}, rendered as the list item (`<li>`). A step
 * with `onPress` is interactive (a focusable `Button`); without it, inert.
 *
 * @param props - The properties {@link ProgressStepProps} passed to the component.
 */
export function ProgressStep(props: ProgressStepProps) {
  const {
    status = 'none',
    isDisabled,
    onPress,
    children,
    className,
    timeline,
    stepNumber,
    ...rest
  } = props as ProgressStepInternalProps;
  const isInteractive = Boolean(onPress);
  const ariaCurrent = timeline === 'current' ? 'step' : undefined;

  const content = (
    <>
      <Icon icon={statusIcon[status]} aria-hidden className={styles.icon} />
      <Text className={styles.title}>
        {stepNumber != null ? `${stepNumber}. ` : null}
        {children}
      </Text>
    </>
  );

  return (
    <Flex
      as="li"
      {...rest}
      direction="column"
      data-timeline={timeline}
      data-status={status}
      className={cx(styles.step, className)}
    >
      {isInteractive ? (
        <Flex
          as={RACButton}
          alignItems="center"
          gap="sm"
          isDisabled={isDisabled}
          onPress={onPress}
          aria-current={ariaCurrent}
          className={styles.control}
        >
          {content}
        </Flex>
      ) : (
        <Flex alignItems="center" gap="sm" aria-current={ariaCurrent} className={styles.control}>
          {content}
        </Flex>
      )}
    </Flex>
  );
}
