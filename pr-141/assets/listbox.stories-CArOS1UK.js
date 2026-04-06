import{j as e}from"./iframe-C3pkDmNe.js";import{L as b,a,b as x,H as u}from"./listbox-item-DbHDFVdk.js";import{d as S}from"./Collection-iI9670Rr.js";import{u as B}from"./index-DL7d8lYG.js";const w="_listbox_1qbuy_9",h={listbox:w};function T(t){return e.jsxs(b,{...t,className:h.listbox,children:[e.jsx(a,{children:"Chicken Teriyaki"}),e.jsx(a,{children:"Salmon Bento"}),e.jsx(a,{children:"Beef Bowl"})]})}function A(t){return e.jsxs(b,{...t,className:h.listbox,children:[e.jsxs(x,{children:[e.jsx(u,{children:"Main Dishes"}),e.jsx(a,{children:"Chicken Teriyaki"}),e.jsx(a,{children:"Salmon Bento"})]}),e.jsxs(x,{children:[e.jsx(u,{children:"Side Dishes"}),e.jsx(a,{children:"Pickled Vegetables"}),e.jsx(a,{children:"Edamame"})]})]})}function D({items:t,...o}){return e.jsx(b,{...o,className:h.listbox,items:t,children:n=>e.jsx(a,{textValue:n.name,children:n.name},n.id)})}function I({categories:t,...o}){return e.jsx(b,{...o,className:h.listbox,items:t,children:n=>e.jsxs(x,{children:[e.jsx(u,{children:n.name}),e.jsx(S,{items:n.items,children:r=>e.jsx(a,{textValue:r.name,children:r.name},r.id)})]},n.id)})}function R({categories:t,...o}){const{items:n,slots:r={},...k}=o,{apply:v}=B(k),j={...{"side-dishes.header":({props:s,original:i})=>e.jsxs(u,{...s,children:["🥢 ",i]}),"side-dishes.pickled-vegetables":({original:s})=>e.jsxs("div",{style:{backgroundColor:"#4ade80",color:"white",padding:"2px 6px",borderRadius:"4px"},children:["🥒 ",s," (Traditional)"]}),"main-dishes":({original:s})=>e.jsx("div",{style:{border:"2px dashed #f59e0b",padding:"8px",borderRadius:"6px"},children:s})},...r};return e.jsx(b,{...v({className:h.listbox}),items:n??t,slot:"bento-list",slots:j,children:s=>e.jsxs(x,{slot:s.id,children:[e.jsx(u,{slot:"header",children:s.name}),e.jsx(S,{items:s.items,children:i=>e.jsx(a,{textValue:i.name,slot:i.id,children:i.name},i.id)})]},s.id)})}const E={title:"components/ListBox",component:()=>null,parameters:{layout:"centered",controls:{expanded:!0}}},g={"aria-label":"Bento box selection"},f={"aria-label":{control:{type:"text"},description:"A11y label when there is no visible label.",table:{type:{summary:"string"}}},id:{control:{type:"text"},description:"Unique element id (optional).",table:{type:{summary:"string"}}},selectionBehavior:{control:{type:"select"},options:["toggle","replace"],description:"Toggle: clicking again deselects. Replace: always replaces current selection.",table:{defaultValue:{summary:"toggle"},type:{summary:"'toggle' | 'replace'"}}},selectionMode:{control:{type:"select"},options:["single","multiple","none"],description:"How many items can be selected.",table:{defaultValue:{summary:"single"},type:{summary:"'single' | 'multiple' | 'none'"}}},defaultSelectedKeys:{control:{type:"object"},description:"Initial selection (array of keys).",table:{defaultValue:{summary:"—"},type:{summary:"Key[]"}}},selectedKeys:{control:{type:"object"},description:"Controlled selection (array of keys).",table:{defaultValue:{summary:"—"},type:{summary:'Key[] | "all"'}}},disabledKeys:{control:{type:"object"},description:"Keys to disable (must match ids).",table:{defaultValue:{summary:"—"},type:{summary:"Key[]"}}},orientation:{control:{type:"select"},options:["vertical","horizontal"],description:"Nav axis: vertical (Up/Down) or horizontal (Left/Right).",table:{defaultValue:{summary:"vertical"},type:{summary:"'vertical' | 'horizontal'"}}},shouldFocusWrap:{control:{type:"boolean"},description:"Arrow key nav wraps at ends.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},shouldFocusOnHover:{control:{type:"boolean"},description:"Focus items on hover.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},autoFocus:{control:{type:"select"},options:[!0,!1,"first","last"],description:"Auto focus: true/false/first/last.",table:{defaultValue:{summary:"false"},type:{summary:'boolean | "first" | "last"'}}},disallowEmptySelection:{control:{type:"boolean"},description:"Prevent clearing the last selection.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},layout:{control:{type:"select"},options:["stack","grid"],description:"Item layout style.",table:{defaultValue:{summary:"stack"},type:{summary:"'stack' | 'grid'"}}},className:{control:{type:"text"},description:"Class on root ListBox (string or fn).",table:{defaultValue:{summary:"—"},type:{summary:"string | (props) => string"}}},style:{control:{type:"object"},description:"Inline style on root (object or fn).",table:{defaultValue:{summary:"—"},type:{summary:"CSSProperties | (props) => CSSProperties"}}},escapeKeyBehavior:{control:{type:"select"},options:["clearSelection","none"],description:"Escape key behavior.",table:{defaultValue:{summary:"none"},type:{summary:"'clearSelection' | 'none'"}}}},l={tags:["!dev","stable"],argTypes:{items:{description:"The items to render in the listbox. Each item must include a unique `key` property.",table:{type:{summary:"ItemWithKey[]"}}},children:{description:"Function to render each item when `items` prop is provided, or static children elements like Option components.",table:{type:{summary:"((item: ItemWithKey) => ReactNode) | ReactNode"}}},selectedKeys:{description:'The currently selected keys (controlled mode). Can be a Set of keys or the string "all" to select all items.',table:{type:{summary:'Selection (Set<Key> | "all")'}}},defaultSelectedKeys:{description:'The initial selected keys (uncontrolled mode). Can be a Set of keys or the string "all" to select all items.',table:{type:{summary:'Selection (Set<Key> | "all")'}}},onSelectionChange:{description:"Callback when selection changes. Receives the new selection and a meta object with event and state information.",table:{type:{summary:"(keys: Selection, meta: Meta) => void"}}},selectionMode:{description:"The selection mode of the listbox.",table:{defaultValue:{summary:"single"},type:{summary:"'single' | 'multiple' | 'none'"}}},disabledKeys:{description:"The keys of items that should be disabled and not selectable.",table:{type:{summary:"Iterable<Key>"}}},disallowEmptySelection:{description:"Whether to prevent the user from deselecting the last selected item.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},shouldFocusWrap:{description:"Whether focus should wrap around when navigating with arrow keys.",table:{type:{summary:"boolean"}}},orientation:{description:"The orientation of the listbox, affecting keyboard navigation direction.",table:{defaultValue:{summary:"vertical"},type:{summary:"'vertical' | 'horizontal'"}}},autoFocus:{description:"Whether to focus the listbox on mount.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},renderEmptyState:{description:"Function to render when the listbox has no items.",table:{type:{summary:"(props: ListBoxRenderProps) => ReactNode"}}},"aria-label":{description:"Optional ARIA label for the listbox. Required for accessibility if no visible label is provided.",table:{type:{summary:"string"}}},"aria-describedby":{description:"Optional ARIA described by for the listbox. References an element ID that describes the listbox.",table:{type:{summary:"string"}}},"aria-details":{description:"Optional ARIA details for the listbox. References an element ID with additional details about the listbox.",table:{type:{summary:"string"}}},"aria-labelledby":{description:"Optional ARIA labelledby for the listbox. References an element ID that labels the listbox.",table:{type:{summary:"string"}}}}},c={args:{...g,selectionMode:"single",selectionBehavior:"toggle",orientation:"vertical",shouldFocusWrap:!1,shouldFocusOnHover:!1,disallowEmptySelection:!1},argTypes:f,render:t=>e.jsx(T,{...t})},d={args:{...g,"aria-label":"Bento selection",items:[{id:"chicken-teriyaki",name:"Chicken Teriyaki"},{id:"salmon-bento",name:"Salmon Bento"},{id:"beef-bowl",name:"Beef Bowl"},{id:"katsu-curry",name:"Katsu Curry"},{id:"tempura-box",name:"Tempura Box"}],selectionMode:"single",selectionBehavior:"toggle",orientation:"vertical",shouldFocusWrap:!1,shouldFocusOnHover:!1,disallowEmptySelection:!1,id:"bento",layout:"stack"},argTypes:{...f,items:{control:{type:"object"},description:"Array of data objects passed through the `items` prop."}},render:t=>e.jsx(D,{...t}),parameters:{docs:{description:{story:"Note: React Aria automatically prefixes DOM IDs (e.g., `react-aria[hash]-[instance]-option-[key]`) for accessibility and uniqueness. Use `data-key` or `data-text-value` attributes for reliable element selection instead of DOM IDs."}}}},m={args:{...g,selectionMode:"single",selectionBehavior:"toggle",orientation:"vertical"},argTypes:f,render:t=>e.jsx(A,{...t})},p={args:{...g,categories:[{id:"main-dishes",name:"Main Dishes",items:[{id:"chicken-teriyaki",name:"Chicken Teriyaki"},{id:"salmon-bento",name:"Salmon Bento"},{id:"beef-bowl",name:"Beef Bowl"}]},{id:"side-dishes",name:"Side Dishes",items:[{id:"pickled-vegetables",name:"Pickled Vegetables"},{id:"edamame",name:"Edamame"},{id:"miso-soup",name:"Miso Soup"}]}],selectionMode:"single",selectionBehavior:"toggle",orientation:"vertical"},argTypes:{...f,categories:{control:{type:"object"},description:"Array of category objects rendered as ListBox sections."}},render:t=>e.jsx(I,{...t})},y={args:{...g,categories:[{id:"main-dishes",name:"Main Dishes",items:[{id:"chicken-teriyaki",name:"Chicken Teriyaki"},{id:"salmon-bento",name:"Salmon Bento"},{id:"beef-bowl",name:"Beef Bowl"}]},{id:"side-dishes",name:"Side Dishes",items:[{id:"pickled-vegetables",name:"Pickled Vegetables"},{id:"edamame",name:"Edamame"},{id:"miso-soup",name:"Miso Soup"}]}],selectionMode:"single",selectionBehavior:"toggle",orientation:"vertical"},argTypes:{...f,categories:{control:{type:"object"},description:"Array of category objects rendered as ListBox sections."}},render:t=>e.jsx(R,{...t})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  tags: ['!dev', 'stable'],
  argTypes: {
    items: {
      description: 'The items to render in the listbox. Each item must include a unique \`key\` property.',
      table: {
        type: {
          summary: 'ItemWithKey[]'
        }
      }
    },
    children: {
      description: 'Function to render each item when \`items\` prop is provided, or static children elements like Option components.',
      table: {
        type: {
          summary: '((item: ItemWithKey) => ReactNode) | ReactNode'
        }
      }
    },
    selectedKeys: {
      description: 'The currently selected keys (controlled mode). Can be a Set of keys or the string "all" to select all items.',
      table: {
        type: {
          summary: 'Selection (Set<Key> | "all")'
        }
      }
    },
    defaultSelectedKeys: {
      description: 'The initial selected keys (uncontrolled mode). Can be a Set of keys or the string "all" to select all items.',
      table: {
        type: {
          summary: 'Selection (Set<Key> | "all")'
        }
      }
    },
    onSelectionChange: {
      description: 'Callback when selection changes. Receives the new selection and a meta object with event and state information.',
      table: {
        type: {
          summary: '(keys: Selection, meta: Meta) => void'
        }
      }
    },
    selectionMode: {
      description: 'The selection mode of the listbox.',
      table: {
        defaultValue: {
          summary: 'single'
        },
        type: {
          summary: "'single' | 'multiple' | 'none'"
        }
      }
    },
    disabledKeys: {
      description: 'The keys of items that should be disabled and not selectable.',
      table: {
        type: {
          summary: 'Iterable<Key>'
        }
      }
    },
    disallowEmptySelection: {
      description: 'Whether to prevent the user from deselecting the last selected item.',
      table: {
        defaultValue: {
          summary: 'false'
        },
        type: {
          summary: 'boolean'
        }
      }
    },
    shouldFocusWrap: {
      description: 'Whether focus should wrap around when navigating with arrow keys.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    orientation: {
      description: 'The orientation of the listbox, affecting keyboard navigation direction.',
      table: {
        defaultValue: {
          summary: 'vertical'
        },
        type: {
          summary: "'vertical' | 'horizontal'"
        }
      }
    },
    autoFocus: {
      description: 'Whether to focus the listbox on mount.',
      table: {
        defaultValue: {
          summary: 'false'
        },
        type: {
          summary: 'boolean'
        }
      }
    },
    renderEmptyState: {
      description: 'Function to render when the listbox has no items.',
      table: {
        type: {
          summary: '(props: ListBoxRenderProps) => ReactNode'
        }
      }
    },
    'aria-label': {
      description: 'Optional ARIA label for the listbox. Required for accessibility if no visible label is provided.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    'aria-describedby': {
      description: 'Optional ARIA described by for the listbox. References an element ID that describes the listbox.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    'aria-details': {
      description: 'Optional ARIA details for the listbox. References an element ID with additional details about the listbox.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    'aria-labelledby': {
      description: 'Optional ARIA labelledby for the listbox. References an element ID that labels the listbox.',
      table: {
        type: {
          summary: 'string'
        }
      }
    }
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical',
    shouldFocusWrap: false,
    shouldFocusOnHover: false,
    disallowEmptySelection: false
  },
  argTypes: defaultArgTypes,
  render: args => <BasicListBoxExample {...args} />
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    'aria-label': 'Bento selection',
    items: [{
      id: 'chicken-teriyaki',
      name: 'Chicken Teriyaki'
    }, {
      id: 'salmon-bento',
      name: 'Salmon Bento'
    }, {
      id: 'beef-bowl',
      name: 'Beef Bowl'
    }, {
      id: 'katsu-curry',
      name: 'Katsu Curry'
    }, {
      id: 'tempura-box',
      name: 'Tempura Box'
    }],
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical',
    shouldFocusWrap: false,
    shouldFocusOnHover: false,
    disallowEmptySelection: false,
    id: 'bento',
    layout: 'stack'
  },
  argTypes: {
    ...defaultArgTypes,
    items: {
      control: {
        type: 'object' as const
      },
      description: 'Array of data objects passed through the \`items\` prop.'
    }
  },
  render: args => <DynamicCollectionExample {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Note: React Aria automatically prefixes DOM IDs (e.g., \`react-aria[hash]-[instance]-option-[key]\`) for accessibility and uniqueness. Use \`data-key\` or \`data-text-value\` attributes for reliable element selection instead of DOM IDs.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  },
  argTypes: defaultArgTypes,
  render: args => <SectionsExample {...args} />
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    /**
     * Categories are included here so they can be edited live from the
     * Storybook Controls panel. Each category becomes a section and must have
     * a unique \`id\`, a \`name\`, and an \`items\` array (items need \`id\` + \`name\`).
     */
    categories: [{
      id: 'main-dishes',
      name: 'Main Dishes',
      items: [{
        id: 'chicken-teriyaki',
        name: 'Chicken Teriyaki'
      }, {
        id: 'salmon-bento',
        name: 'Salmon Bento'
      }, {
        id: 'beef-bowl',
        name: 'Beef Bowl'
      }]
    }, {
      id: 'side-dishes',
      name: 'Side Dishes',
      items: [{
        id: 'pickled-vegetables',
        name: 'Pickled Vegetables'
      }, {
        id: 'edamame',
        name: 'Edamame'
      }, {
        id: 'miso-soup',
        name: 'Miso Soup'
      }]
    }],
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  } as any,
  argTypes: {
    ...defaultArgTypes,
    categories: {
      control: {
        type: 'object' as const
      },
      description: 'Array of category objects rendered as ListBox sections.'
    }
  } as any,
  render: args => <SectionsDynamicExample {...args} />
}`,...p.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    categories: [{
      id: 'main-dishes',
      name: 'Main Dishes',
      items: [{
        id: 'chicken-teriyaki',
        name: 'Chicken Teriyaki'
      }, {
        id: 'salmon-bento',
        name: 'Salmon Bento'
      }, {
        id: 'beef-bowl',
        name: 'Beef Bowl'
      }]
    }, {
      id: 'side-dishes',
      name: 'Side Dishes',
      items: [{
        id: 'pickled-vegetables',
        name: 'Pickled Vegetables'
      }, {
        id: 'edamame',
        name: 'Edamame'
      }, {
        id: 'miso-soup',
        name: 'Miso Soup'
      }]
    }],
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  } as any,
  argTypes: {
    ...defaultArgTypes,
    categories: {
      control: {
        type: 'object' as const
      },
      description: 'Array of category objects rendered as ListBox sections.'
    }
  } as any,
  render: args => <SlotsDynamicSectionsExample {...args} />
}`,...y.parameters?.docs?.source}}};const V=["Props","StaticItems","DynamicItems","WithSections","WithSectionsDynamic","WithSlotsDynamicSections"],F=Object.freeze(Object.defineProperty({__proto__:null,DynamicItems:d,Props:l,StaticItems:c,WithSections:m,WithSectionsDynamic:p,WithSlotsDynamicSections:y,__namedExportsOrder:V,default:E},Symbol.toStringTag,{value:"Module"}));export{l as P,F as S};
