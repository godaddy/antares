import { Text, type TextProps } from '@godaddy/antares';

/**
 * Setting the `as` prop allows you to change the HTML tag of the `Text` component.
 * @order 2
 */
export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}
