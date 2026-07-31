import { Tag, type TagProps } from '@godaddy/antares';

/**
 * A minimal tag with the default emphasis and size.
 * @order 1
 */
export function DefaultExample(props: Partial<TagProps>) {
  return <Tag {...props}>Tag</Tag>;
}
