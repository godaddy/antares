import { Text, type TextProps } from '@godaddy/antares';

/**
 * Basic text content.
 * @title Default
 * @order 1
 */
export function TextExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}
