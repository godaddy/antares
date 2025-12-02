import React from 'react';
import { getComponentDocs, getInterfaceDocs, getMeta, getStory, getVariants } from '@bento/storybook-addon-helpers';
// biome-ignore lint/correctness/noUnusedImports: Test fixture - imports are used by transformer macros
import { Button, Component as AnotherComponent, type InterfaceProps } from './comp.tsx';

// getMeta

const meta = getMeta({
  title: 'meta1'
});

const _meta2 = getMeta({
  title: 'meta2',
  component: Button
});

const _meta3 = getMeta({
  title: 'meta3',
  args: {
    randomArgs: 'randomArgs'
  },
  argTypes: {
    randomArgs: {
      control: {
        type: 'text'
      }
    }
  }
});

export default meta;

// Docs

export const ButtonProps = getComponentDocs(Button);

export const FromInterfaceProps = getInterfaceDocs<InterfaceProps>();

export const FromInterfacePickProps = getInterfaceDocs<Pick<InterfaceProps, 'prop1'>>();

export const FromInterfaceOmitProps = getInterfaceDocs<Omit<InterfaceProps, 'prop1' | 'prop3'>>();

// getStory

export const NewButton1 = getStory(Button);

export const NewButton2 = getStory(Button, {
  args: { children: 'mundo' }
});

export const NewButton3 = getStory(Button, {
  args: { children: 'mundo' },
  render: () => <div>override render</div>
});

// getVariants

export const Styles = getVariants(Button, {
  primary: {
    args: {
      children: 'Primary!',
      onClick: function handleClick() {
        console.log('primary clicked!');
      }
    }
  },
  secondary: {
    args: {
      style: { backgroundColor: 'red', color: 'white' },
      children: 'secondary button!'
    }
  },
  customElement: {
    argTypes: {
      children: {
        description: 'mundo'
      }
    },
    render: (args) => <div>Custom Element: {args.children}</div>,
    args: {
      children: 'hola mundo!'
    }
  }
});

// expect no variants exported
export const NoVariants = getVariants(Button, {});
