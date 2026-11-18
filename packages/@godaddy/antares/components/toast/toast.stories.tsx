'use client';
import { getComponentDocs, getExamples, getMeta, getStory, getTypeDocs } from '@bento/storybook-addon-helpers';
import { ToastRegion, type ToastOptions, type ToastQueueOptions } from './src/index.tsx';
import { PlaygroundExample } from './examples/toast-playground.tsx';

export default getMeta({ title: 'components/Toast' });

export const Props = getComponentDocs(ToastRegion);

export const ToastOptionsProps = getTypeDocs<ToastOptions>({ primary: ['message', 'title'] });

export const ToastQueueOptionsProps = getTypeDocs<ToastQueueOptions>();

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    title: 'Toast title',
    message: 'Something happened in the background.',
    emphasis: 'none',
    timeout: 5000,
    dismissible: true
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Bold heading shown above the message; empty for a message-only toast'
    },
    message: {
      control: 'text',
      description: 'The notification text'
    },
    emphasis: {
      control: 'radio',
      options: ['none', 'success', 'critical', 'warning'],
      description: 'The status icon'
    },
    timeout: {
      control: 'number',
      description: 'Milliseconds before the toast closes; 0 keeps it open until dismissed'
    },
    dismissible: {
      control: 'boolean',
      description: 'Show the close button (persistent toasts always show it)'
    }
  }
});
