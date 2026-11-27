'use client';
import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import {
  AvoidScenario,
  CoexistScenario,
  ForwardScenario,
  LeadScenario,
  MigrationShimScenario,
  MultipleCopiesScenario,
  SharedCopyScenario
} from './scenarios.tsx';

// Spike only, never merged: compares ways Antares Toast could live next to UXCore Growl.
export default getMeta({ title: 'experiments/Toast × Growl', parameters: { layout: 'padded' } });

export const A1Coexist = getStory(CoexistScenario);

export const A2Avoid = getStory(AvoidScenario);

export const A3Forward = getStory(ForwardScenario);

export const A4Lead = getStory(LeadScenario);

export const B1MultipleCopies = getStory(MultipleCopiesScenario);

export const B2MigrationShim = getStory(MigrationShimScenario);

export const B3SharedCopy = getStory(SharedCopyScenario);
