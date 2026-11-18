import { useContext, type Key, type JSX } from 'react';
import { Text } from '#components/text';
import { Icon } from '#components/icon';
import { Button } from '#components/button';
import { Menu, MenuItem, MenuTrigger } from '#components/menu';
import { WizardStateContext } from './use-wizard-state.ts';
import { WizardStepLabelsContext } from './wizard-provider.tsx';

/** Visited destinations in collection order; unvisited steps cannot be selected. */
export function WizardStepsMenu() {
  const state = useContext(WizardStateContext);
  const steps = useContext(WizardStepLabelsContext);
  const stepIcon = function (key: Key): JSX.Element {
    switch (true) {
      case key === state?.activeStep:
        return <Icon icon="circle-half" />;
      case state?.visitedSteps.has(key as string):
        return <Icon icon="checkmark" />;
      default:
        return <Icon icon="circle" />;
    }
  };
  if (!state) return null;

  return (
    <MenuTrigger>
      <Button isDisabled={steps.length === 0}>
        Step {state.activePosition + 1} of {steps.length} <Icon icon="chevron-down" />
      </Button>
      <Menu
        aria-label="Steps"
        selectionMode="single"
        selectedKeys={state.activeStep === null ? [] : [state.activeStep]}
      >
        {steps.map(({ key, label }) => (
          <MenuItem key={key} id={key} isDisabled={!state.visitedSteps.has(key)} onAction={() => state.goToStep(key)}>
            {stepIcon(key)}
            <Text>{label}</Text>
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
