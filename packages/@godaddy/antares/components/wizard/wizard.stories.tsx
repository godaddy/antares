'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { DialogTrigger, Wizard, WizardStep, WizardSteps } from './src/index.tsx';

export default getMeta({ title: 'components/Wizard' });

export const Props = getComponentDocs(Wizard);
export const DialogTriggerProps = getComponentDocs(DialogTrigger);
export const WizardStepsProps = getComponentDocs(WizardSteps);
export const WizardStepProps = getComponentDocs(WizardStep);
export const Examples = getExamples('./examples');
