import { createContext, useEffect, useState } from 'react';
import type { Key } from 'react-aria-components';

export interface WizardStepChangeDetail {
  /** Previously displayed step. */
  previousStep: Key;

  /** Navigation action that requested this change. */
  reason: 'next' | 'previous' | 'menu';
}

export interface WizardStateOptions {
  /** Ordered collection of stable step keys. */
  collection: readonly Key[];

  /** Application-owned active step, when navigation is controlled. */
  activeStep?: Key | null;

  /** Preferred initial step for uncontrolled navigation. */
  defaultActiveStep?: Key;

  /** Called when navigation requests a different step. */
  onStepChange?: (step: Key, detail: WizardStepChangeDetail) => void;
}

export interface WizardState {
  /** Authoritative active key, or null when no valid item is active. */
  activeStep: Key | null;

  /** Ordered collection keys. */
  collection: readonly Key[];

  /** Zero-based position of the active step, or -1 when none is active. */
  activePosition: number;

  /** Keys displayed so far in this run. */
  visitedSteps: ReadonlySet<Key>;

  canPrevious: boolean;
  canNext: boolean;
  previous: () => void;
  next: () => void;
  goToStep: (step: Key) => void;
}

/** Navigation state for an ordered Wizard step collection. */
export function useWizardState({
  collection,
  activeStep: controlledStep,
  defaultActiveStep,
  onStepChange
}: WizardStateOptions): WizardState {
  const initialStep =
    defaultActiveStep !== undefined && collection.includes(defaultActiveStep)
      ? defaultActiveStep
      : (collection[0] ?? null);
  const [selectedStep, setSelectedStep] = useState<Key | null>(() => initialStep);
  const activeStep =
    controlledStep !== undefined
      ? controlledStep !== null && collection.includes(controlledStep)
        ? controlledStep
        : null
      : selectedStep !== null && collection.includes(selectedStep)
        ? selectedStep
        : initialStep;
  const activePosition = activeStep === null ? -1 : collection.indexOf(activeStep);
  const [visits, setVisits] = useState<ReadonlySet<Key>>(() => new Set(activeStep === null ? [] : [activeStep]));
  const visitedSteps = new Set([...visits].filter((step) => collection.includes(step)));
  if (activeStep !== null) visitedSteps.add(activeStep);

  useEffect(
    function recordActiveStep() {
      if (activeStep !== null) {
        if (controlledStep === undefined && selectedStep === null) setSelectedStep(activeStep);
        setVisits((previous) => (previous.has(activeStep) ? previous : new Set([...previous, activeStep])));
      }
    },
    [activeStep, controlledStep, selectedStep]
  );

  function request(step: Key, reason: WizardStepChangeDetail['reason']) {
    if (activeStep === null || step === activeStep || !collection.includes(step)) return;
    if (controlledStep === undefined) setSelectedStep(step);
    onStepChange?.(step, { previousStep: activeStep, reason });
  }

  return {
    activeStep,
    collection,
    activePosition,
    visitedSteps,
    canPrevious: activePosition > 0,
    canNext: activePosition >= 0 && activePosition < collection.length - 1,
    previous: function previous() {
      if (activePosition > 0) request(collection[activePosition - 1], 'previous');
    },
    next: function next() {
      if (activePosition >= 0 && activePosition < collection.length - 1)
        request(collection[activePosition + 1], 'next');
    },
    goToStep: function goToStep(step) {
      if (visitedSteps.has(step)) request(step, 'menu');
    }
  };
}

/** Read the Wizard's existing state from descendant custom controls. */
export const WizardStateContext = createContext<WizardState | null>(null);
