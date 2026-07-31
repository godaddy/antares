import { Text, type TextProps } from '@godaddy/antares';

/**
 * Setting the `align` prop allows you to change the alignment of the text. Choose from `start`, `center`, `end`, or `justify`; the logical keywords support RTL languages.
 * @order 3
 */
export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}
