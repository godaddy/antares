import React from 'react';
import { getComponentDocs, getMeta, getStory, getTypeDocs, getVariants } from '@bento/storybook-addon-helpers';
import { Button, Component as AnotherComponent, type InterfaceProps } from './comp.tsx';
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
export const ButtonProps = {
  tags: ['!dev'],
  argTypes: {
    onClick: {
      name: 'onClick',
      description: 'this is the onClick handler',
      required: true,
      type: {
        name: '() => void',
        required: true
      },
      table: {
        defaultValue: {
          summary: null
        },
        category: 'Events'
      }
    }
  }
};
export const FromTypeProps = {
  tags: ['!dev'],
  argTypes: {
    prop1: {
      name: 'prop1',
      description: 'interface prop description',
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
      name: 'prop2',
      description: 'interface prop description 2',
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
      name: 'prop3',
      description: 'interface prop description 3',
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
export const FromTypeIncludeProps = {
  tags: ['!dev'],
  argTypes: {
    prop1: {
      name: 'prop1',
      description: 'interface prop description',
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
export const FromTypeExcludeProps = {
  tags: ['!dev'],
  argTypes: {
    prop2: {
      name: 'prop2',
      description: 'interface prop description 2',
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
export const NoVariants = getVariants(Button, {});
