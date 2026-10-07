import { useContext } from 'react';
import { Button } from '#components/button';
import { Menu, MenuItem, MenuTrigger } from '#components/menu';
import { WizardStateContext } from './use-wizard-state.ts';
import { WizardStepLabelsContext } from './wizard-provider.tsx';

/** Visited destinations in collection order; unvisited steps cannot be selected. */
export function WizardStepsMenu() {
  const state = useContext(WizardStateContext);
  const steps = useContext(WizardStepLabelsContext);
  if (!state) return null;

  return (
    <MenuTrigger>
      <Button isDisabled={steps.length === 0}>Steps</Button>
      <Menu
        aria-label="Steps"
        selectionMode="single"
        selectedKeys={state.activeStep === null ? [] : [state.activeStep]}
      >
        {steps.map(({ key, label }) => (
          <MenuItem key={key} id={key} isDisabled={!state.visitedSteps.has(key)} onAction={() => state.goToStep(key)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
