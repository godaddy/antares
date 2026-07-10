import{a as e,i as t}from"./preload-helper-B4cZKGJ2.js";import{V as n,y as r}from"./iframe-sEoj9CzO.js";import{n as i,t as a}from"./src-CA4QiW90.js";import{hn as o}from"./useTooltipTrigger-B2XMzOj1.js";import{c as s,i as c,n as l,o as u,t as d}from"./src-QfGA4lvp.js";var f,p,m,h,g=t((()=>{f=`_listbox_wqgvb_9`,p=`_section_wqgvb_170`,m=`_header_wqgvb_181`,h={listbox:f,section:p,header:m}}));function _(e){return(0,v.jsxs)(c,{...e,className:h.listbox,children:[(0,v.jsx)(l,{children:`Chicken Teriyaki`}),(0,v.jsx)(l,{children:`Salmon Bento`}),(0,v.jsx)(l,{children:`Beef Bowl`})]})}var v,y=t((()=>{d(),g(),v=r()}));function b(e){return(0,x.jsxs)(c,{...e,className:h.listbox,children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(s,{children:`Main Dishes`}),(0,x.jsx)(l,{children:`Chicken Teriyaki`}),(0,x.jsx)(l,{children:`Salmon Bento`})]}),(0,x.jsxs)(u,{children:[(0,x.jsx)(s,{children:`Side Dishes`}),(0,x.jsx)(l,{children:`Pickled Vegetables`}),(0,x.jsx)(l,{children:`Edamame`})]})]})}var x,S=t((()=>{d(),g(),x=r()}));function C({items:e,...t}){return(0,w.jsx)(c,{...t,className:h.listbox,items:e,children:e=>(0,w.jsx)(l,{textValue:e.name,children:e.name},e.id)})}var w,T=t((()=>{d(),g(),w=r()}));function E({categories:e,...t}){return(0,D.jsx)(c,{...t,className:h.listbox,items:e,children:e=>(0,D.jsxs)(u,{children:[(0,D.jsx)(s,{children:e.name}),(0,D.jsx)(o,{items:e.items,children:e=>(0,D.jsx)(l,{textValue:e.name,children:e.name},e.id)})]},e.id)})}var D,O=t((()=>{d(),g(),D=r()}));function k({categories:e,...t}){let{items:n,slots:r={},...a}=t,{apply:d}=i(a),f={"side-dishes.header":({props:e,original:t})=>(0,A.jsxs)(s,{...e,children:[`🥢 `,t]}),"side-dishes.pickled-vegetables":({original:e})=>(0,A.jsxs)(`div`,{style:{backgroundColor:`#4ade80`,color:`white`,padding:`2px 6px`,borderRadius:`4px`},children:[`🥒 `,e,` (Traditional)`]}),"main-dishes":({original:e})=>(0,A.jsx)(`div`,{style:{border:`2px dashed #f59e0b`,padding:`8px`,borderRadius:`6px`},children:e}),...r};return(0,A.jsx)(c,{...d({className:h.listbox}),items:n??e,slot:`bento-list`,slots:f,children:e=>(0,A.jsxs)(u,{slot:e.id,children:[(0,A.jsx)(s,{slot:`header`,children:e.name}),(0,A.jsx)(o,{items:e.items,children:e=>(0,A.jsx)(l,{textValue:e.name,slot:e.id,children:e.name},e.id)})]},e.id)})}var A,j=t((()=>{d(),a(),g(),A=r()})),M=e({DynamicItems:()=>z,Props:()=>L,StaticItems:()=>R,WithSections:()=>B,WithSectionsDynamic:()=>V,WithSlotsDynamicSections:()=>H,__namedExportsOrder:()=>U,default:()=>P}),N,P,F,I,L,R,z,B,V,H,U,W=t((()=>{n(),y(),S(),T(),O(),j(),N=r(),P={title:`Bento/components/ListBox`,component:()=>null,parameters:{layout:`centered`,controls:{expanded:!0}}},F={"aria-label":`Bento box selection`},I={"aria-label":{control:{type:`text`},description:`A11y label when there is no visible label.`,table:{type:{summary:`string`}}},id:{control:{type:`text`},description:`Unique element id (optional).`,table:{type:{summary:`string`}}},selectionBehavior:{control:{type:`select`},options:[`toggle`,`replace`],description:`Toggle: clicking again deselects. Replace: always replaces current selection.`,table:{defaultValue:{summary:`toggle`},type:{summary:`'toggle' | 'replace'`}}},selectionMode:{control:{type:`select`},options:[`single`,`multiple`,`none`],description:`How many items can be selected.`,table:{defaultValue:{summary:`single`},type:{summary:`'single' | 'multiple' | 'none'`}}},defaultSelectedKeys:{control:{type:`object`},description:`Initial selection (array of keys).`,table:{defaultValue:{summary:`—`},type:{summary:`Key[]`}}},selectedKeys:{control:{type:`object`},description:`Controlled selection (array of keys).`,table:{defaultValue:{summary:`—`},type:{summary:`Key[] | "all"`}}},disabledKeys:{control:{type:`object`},description:`Keys to disable (must match ids).`,table:{defaultValue:{summary:`—`},type:{summary:`Key[]`}}},orientation:{control:{type:`select`},options:[`vertical`,`horizontal`],description:`Nav axis: vertical (Up/Down) or horizontal (Left/Right).`,table:{defaultValue:{summary:`vertical`},type:{summary:`'vertical' | 'horizontal'`}}},shouldFocusWrap:{control:{type:`boolean`},description:`Arrow key nav wraps at ends.`,table:{defaultValue:{summary:`false`},type:{summary:`boolean`}}},shouldFocusOnHover:{control:{type:`boolean`},description:`Focus items on hover.`,table:{defaultValue:{summary:`false`},type:{summary:`boolean`}}},autoFocus:{control:{type:`select`},options:[!0,!1,`first`,`last`],description:`Auto focus: true/false/first/last.`,table:{defaultValue:{summary:`false`},type:{summary:`boolean | "first" | "last"`}}},disallowEmptySelection:{control:{type:`boolean`},description:`Prevent clearing the last selection.`,table:{defaultValue:{summary:`false`},type:{summary:`boolean`}}},layout:{control:{type:`select`},options:[`stack`,`grid`],description:`Item layout style.`,table:{defaultValue:{summary:`stack`},type:{summary:`'stack' | 'grid'`}}},className:{control:{type:`text`},description:`Class on root ListBox (string or fn).`,table:{defaultValue:{summary:`—`},type:{summary:`string | (props) => string`}}},style:{control:{type:`object`},description:`Inline style on root (object or fn).`,table:{defaultValue:{summary:`—`},type:{summary:`CSSProperties | (props) => CSSProperties`}}},escapeKeyBehavior:{control:{type:`select`},options:[`clearSelection`,`none`],description:`Escape key behavior.`,table:{defaultValue:{summary:`none`},type:{summary:`'clearSelection' | 'none'`}}}},L={tags:[`!dev`,`stable`],argTypes:{items:{description:"The items to render in the listbox. Each item must include a unique `key` property.",table:{type:{summary:`ItemWithKey[]`}}},children:{description:"Function to render each item when `items` prop is provided, or static children elements like Option components.",table:{type:{summary:`((item: ItemWithKey) => ReactNode) | ReactNode`}}},selectedKeys:{description:`The currently selected keys (controlled mode). Can be a Set of keys or the string "all" to select all items.`,table:{type:{summary:`Selection (Set<Key> | "all")`}}},defaultSelectedKeys:{description:`The initial selected keys (uncontrolled mode). Can be a Set of keys or the string "all" to select all items.`,table:{type:{summary:`Selection (Set<Key> | "all")`}}},onSelectionChange:{description:`Callback when selection changes. Receives the new selection and a meta object with event and state information.`,table:{type:{summary:`(keys: Selection, meta: Meta) => void`}}},selectionMode:{description:`The selection mode of the listbox.`,table:{defaultValue:{summary:`single`},type:{summary:`'single' | 'multiple' | 'none'`}}},disabledKeys:{description:`The keys of items that should be disabled and not selectable.`,table:{type:{summary:`Iterable<Key>`}}},disallowEmptySelection:{description:`Whether to prevent the user from deselecting the last selected item.`,table:{defaultValue:{summary:`false`},type:{summary:`boolean`}}},shouldFocusWrap:{description:`Whether focus should wrap around when navigating with arrow keys.`,table:{type:{summary:`boolean`}}},orientation:{description:`The orientation of the listbox, affecting keyboard navigation direction.`,table:{defaultValue:{summary:`vertical`},type:{summary:`'vertical' | 'horizontal'`}}},autoFocus:{description:`Whether to focus the listbox on mount.`,table:{defaultValue:{summary:`false`},type:{summary:`boolean`}}},renderEmptyState:{description:`Function to render when the listbox has no items.`,table:{type:{summary:`(props: ListBoxRenderProps) => ReactNode`}}},"aria-label":{description:`Optional ARIA label for the listbox. Required for accessibility if no visible label is provided.`,table:{type:{summary:`string`}}},"aria-describedby":{description:`Optional ARIA described by for the listbox. References an element ID that describes the listbox.`,table:{type:{summary:`string`}}},"aria-details":{description:`Optional ARIA details for the listbox. References an element ID with additional details about the listbox.`,table:{type:{summary:`string`}}},"aria-labelledby":{description:`Optional ARIA labelledby for the listbox. References an element ID that labels the listbox.`,table:{type:{summary:`string`}}}}},R={args:{...F,selectionMode:`single`,selectionBehavior:`toggle`,orientation:`vertical`,shouldFocusWrap:!1,shouldFocusOnHover:!1,disallowEmptySelection:!1},argTypes:I,render:e=>(0,N.jsx)(_,{...e})},z={args:{...F,"aria-label":`Bento selection`,items:[{id:`chicken-teriyaki`,name:`Chicken Teriyaki`},{id:`salmon-bento`,name:`Salmon Bento`},{id:`beef-bowl`,name:`Beef Bowl`},{id:`katsu-curry`,name:`Katsu Curry`},{id:`tempura-box`,name:`Tempura Box`}],selectionMode:`single`,selectionBehavior:`toggle`,orientation:`vertical`,shouldFocusWrap:!1,shouldFocusOnHover:!1,disallowEmptySelection:!1,id:`bento`,layout:`stack`},argTypes:{...I,items:{control:{type:`object`},description:"Array of data objects passed through the `items` prop."}},render:e=>(0,N.jsx)(C,{...e}),parameters:{docs:{description:{story:"Note: React Aria automatically prefixes DOM IDs (e.g., `react-aria[hash]-[instance]-option-[key]`) for accessibility and uniqueness. Use `data-key` or `data-text-value` attributes for reliable element selection instead of DOM IDs."}}}},B={args:{...F,selectionMode:`single`,selectionBehavior:`toggle`,orientation:`vertical`},argTypes:I,render:e=>(0,N.jsx)(b,{...e})},V={args:{...F,categories:[{id:`main-dishes`,name:`Main Dishes`,items:[{id:`chicken-teriyaki`,name:`Chicken Teriyaki`},{id:`salmon-bento`,name:`Salmon Bento`},{id:`beef-bowl`,name:`Beef Bowl`}]},{id:`side-dishes`,name:`Side Dishes`,items:[{id:`pickled-vegetables`,name:`Pickled Vegetables`},{id:`edamame`,name:`Edamame`},{id:`miso-soup`,name:`Miso Soup`}]}],selectionMode:`single`,selectionBehavior:`toggle`,orientation:`vertical`},argTypes:{...I,categories:{control:{type:`object`},description:`Array of category objects rendered as ListBox sections.`}},render:e=>(0,N.jsx)(E,{...e})},H={args:{...F,categories:[{id:`main-dishes`,name:`Main Dishes`,items:[{id:`chicken-teriyaki`,name:`Chicken Teriyaki`},{id:`salmon-bento`,name:`Salmon Bento`},{id:`beef-bowl`,name:`Beef Bowl`}]},{id:`side-dishes`,name:`Side Dishes`,items:[{id:`pickled-vegetables`,name:`Pickled Vegetables`},{id:`edamame`,name:`Edamame`},{id:`miso-soup`,name:`Miso Soup`}]}],selectionMode:`single`,selectionBehavior:`toggle`,orientation:`vertical`},argTypes:{...I,categories:{control:{type:`object`},description:`Array of category objects rendered as ListBox sections.`}},render:e=>(0,N.jsx)(k,{...e})},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  },
  argTypes: defaultArgTypes,
  render: args => <SectionsExample {...args} />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U=[`Props`,`StaticItems`,`DynamicItems`,`WithSections`,`WithSectionsDynamic`,`WithSlotsDynamicSections`]}));W();export{z as DynamicItems,L as Props,R as StaticItems,B as WithSections,V as WithSectionsDynamic,H as WithSlotsDynamicSections,U as __namedExportsOrder,P as default,M as n,W as t};