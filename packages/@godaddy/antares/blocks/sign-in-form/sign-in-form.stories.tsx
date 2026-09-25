'use client';

import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { SignInForm } from './index.tsx';

export default getMeta({
  title: 'Blocks/Sign In Form',
  id: 'blocks-sign-in-form'
});

export const Preview = getStory(SignInForm);
