import { Text, type TextProps } from '@godaddy/antares';

/**
 * Basic text content.
 * @order 1
 */
export function DefaultExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}
