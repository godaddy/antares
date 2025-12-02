import React from 'react';
import { getComponentDocs, getInterfaceDocs, getMeta, getStory, getVariants } from '@bento/storybook-addon-helpers';
import { Button, Component as AnotherComponent, type InterfaceProps } from './comp.tsx';

// getMeta

const meta = {
  title: 'meta1'
};

const _meta2 = {
  title: 'meta2',
  component: Button
};

const _meta3 = {
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
};

export default meta;

// Docs

export const ButtonProps = {
  tags: ['!dev'],
  argTypes: {
    onClick: {
      description: 'this is the onClick handler',
      name: 'onClick',
      required: true,
      type: {
        name: '() => void',
        required: true
      },
      table: {
        defaultValue: {
          summary: null
        }
      }
    }
  }
};

export const FromInterfaceProps = {
  tags: ['!dev'],
  argTypes: {
    prop1: {
      description: 'interface prop description',
      name: 'prop1',
      required: true,
      type: {
        name: 'string',
        required: true
      },
      table: {
        defaultValue: {
          summary: null
        }
      }
    },
    prop2: {
      description: 'interface prop description 2',
      name: 'prop2',
      required: false,
      type: {
        name: 'string',
        required: false
      },
      table: {
        defaultValue: {
          summary: "'default value'"
        }
      }
    },
    prop3: {
      description: 'interface prop description 3',
      name: 'prop3',
      required: false,
      type: {
        name: '() => React.ReactNode',
        required: false
      },
      table: {
        defaultValue: {
          summary: null
        }
      }
    }
  }
};

export const FromInterfacePickProps = {
  tags: ['!dev'],
  argTypes: {
    prop1: {
      description: 'interface prop description',
      name: 'prop1',
      required: true,
      type: {
        name: 'string',
        required: true
      },
      table: {
        defaultValue: {
          summary: null
        }
      }
    }
  }
};

export const FromInterfaceOmitProps = {
  tags: ['!dev'],
  argTypes: {
    prop2: {
      description: 'interface prop description 2',
      name: 'prop2',
      required: false,
      type: {
        name: 'string',
        required: false
      },
      table: {
        defaultValue: {
          summary: "'default value'"
        }
      }
    }
  }
};

// getStory

export const NewButton1 = {
  render: (args) => <Button {...args} />
};

export const NewButton2 = {
  args: { children: 'mundo' },
  render: (args) => <Button {...args} />
};

export const NewButton3 = {
  args: { children: 'mundo' },
  render: () => <div>override render</div>
};

// getVariants

export const StylesPrimary = {
  args: {
    children: 'Primary!',
    onClick: function handleClick() {
      console.log('primary clicked!');
    }
  },
  render: (args) => <Button {...args} />
};

export const StylesSecondary = {
  args: {
    style: { backgroundColor: 'red', color: 'white' },
    children: 'secondary button!'
  },
  render: (args) => <Button {...args} />
};

export const StylesCustomElement = {
  argTypes: {
    children: {
      description: 'mundo'
    }
  },
  render: (args) => <div>Custom Element: {args.children}</div>,
  args: {
    children: 'hola mundo!'
  }
};

// expect no variants exported
export const NoVariants = getVariants(Button, {});
