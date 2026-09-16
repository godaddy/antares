import type { FlexOwnProps } from '#components/layout/flex';

const CARD_LAYOUT_PROPS = [
  'padding',
  'inlinePadding',
  'inlinePaddingStart',
  'inlinePaddingEnd',
  'blockPadding',
  'blockPaddingStart',
  'blockPaddingEnd',
  'elevation',
  'rounding',
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
  'display',
  'direction',
  'justifyContent',
  'alignContent',
  'alignItems',
  'wrap',
  'gap',
  'columnGap',
  'rowGap'
] as const satisfies readonly (keyof FlexOwnProps)[];

export function splitCardLayoutProps<T extends Record<string, unknown>>(props: T) {
  const cardProps: Partial<FlexOwnProps> = {};
  const fieldProps = { ...props };

  for (const key of CARD_LAYOUT_PROPS) {
    if (key in props) {
      cardProps[key] = props[key] as never;
      delete fieldProps[key];
    }
  }

  return { cardProps, fieldProps };
}
