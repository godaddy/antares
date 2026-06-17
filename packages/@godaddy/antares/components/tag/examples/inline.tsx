import { Tag } from '@godaddy/antares';

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
