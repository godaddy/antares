import type { DocsDefaults } from '../packages/dev/storybook-addon-helpers/src/types.ts';

/** Shared docs prop-table defaults for Antares components docs (Storybook + docs site). */
export const docsDefaults = {
  primary: ['id', 'children', 'className', 'style', 'disabled'],
  categories: {
    Events: [/^onPress/, /^onChange/, /^onHover/, /^on/],
    // box + flex + grid
    Layout: [
      'display',
      'justifyContent',
      'alignContent',
      'justifyItems',
      'alignItems',
      'gap',
      'columnGap',
      'rowGap',
      'padding',
      'inlinePadding',
      'inlinePaddingStart',
      'inlinePaddingEnd',
      'blockPadding',
      'blockPaddingStart',
      'blockPaddingEnd',
      'alignSelf',
      'justifySelf',
      'order',
      'flex',
      'flexGrow',
      'flexShrink',
      'flexBasis',
      'gridArea',
      'gridColumnStart',
      'gridColumnEnd',
      'gridRowStart',
      'gridRowEnd',
      'direction',
      'wrap',
      'areas',
      'columns',
      'rows',
      'autoColumns',
      'autoRows',
      'autoFlow'
    ],
    Form: [/^onSubmit/, /^onReset/],
    Aria: [/^aria-/]
  },
  exclude: [
    'translate',
    /^onMouse/,
    /^onAuxClick/,
    /^onPointer/,
    /^onTouch/,
    /^onWheel/,
    /^onAnimation/,
    /^onTransition/,
    /^onScroll/,
    /^onGotPointer/,
    /^onContextMenu/,
    /^on.*Capture$/
  ]
} satisfies DocsDefaults;
