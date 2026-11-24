import { createContext, useContext, type ReactNode } from 'react';
import { mergeProps } from 'react-aria';
import { DEFAULT_SLOT, Provider as RACProvider, type Key } from 'react-aria-components';
import { ButtonContext, type ButtonProps } from '#components/button';
import { ButtonGroupContext } from '#components/structure';
import { FooterContext, type FooterProps } from '#components/structure';
import { WizardStateContext, type WizardState } from './use-wizard-state.ts';

/** Labels come from the same React Aria collection as navigation keys. */
export const WizardStepLabelsContext = createContext<readonly { key: Key; label: string }[]>([]);

export function WizardProvider({ state, children }: { state: WizardState; children: ReactNode }) {
  const inheritedFooter = (useContext(FooterContext) ?? {}) as FooterProps;
  const inheritedSlots =
    (useContext(ButtonContext) as { slots?: Record<string | symbol, ButtonProps> } | null)?.slots ?? {};

  return (
    <RACProvider
      values={[
        [WizardStateContext, state],
        [FooterContext, { ...inheritedFooter, elevation: 'raised', inlinePadding: 'lg', blockPadding: 'lg' }],
        [ButtonGroupContext, { gap: 'lg' }],
        [
          ButtonContext,
          {
            slots: {
              ...inheritedSlots,
              [DEFAULT_SLOT]: inheritedSlots[DEFAULT_SLOT] ?? {},
              previous: mergeProps(inheritedSlots.previous, {
                onPress: state.previous,
                isDisabled: !state.canPrevious,
                variant: 'secondary'
              }),
              next: mergeProps(inheritedSlots.next, {
                variant: 'primary',
                onPress: state.canFinish ? state.finish : state.next,
                isDisabled: !state.canNext && !state.canFinish
              })
            }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}
