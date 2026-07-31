import { Tag } from '@godaddy/antares';

/**
 * Use `design="inline"` to embed a tag within a sentence. The background and border are removed so the tag blends into the text flow.
 * @order 4
 */
export function InlineExample() {
  return (
    <p>
      This domain is{' '}
      <Tag emphasis="success" design="inline">
        Active
      </Tag>{' '}
      and your plan is{' '}
      <Tag emphasis="premium" design="inline">
        Pro
      </Tag>
      .
    </p>
  );
}
