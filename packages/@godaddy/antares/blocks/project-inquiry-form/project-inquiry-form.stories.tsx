'use client';

import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ProjectInquiryForm } from './index.tsx';

export default getMeta({
  title: 'Blocks/Project Inquiry Form',
  id: 'blocks-project-inquiry-form',
  parameters: { layout: 'fullscreen' }
});

export const Preview = getStory(ProjectInquiryForm);
