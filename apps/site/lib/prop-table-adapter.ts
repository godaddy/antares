import type { PropsDoc } from '@bento/storybook-addon-helpers/docs';
import type { PropTableEntry, PropTableProps } from '../components/prop-table';

/**
 * Converts a processed neutral `PropsDoc` into the `{ entries, categories }`
 * shape consumed by the `<PropTable>` component. Entries keep `doc.props`
 * order; category keys are inserted in first-seen order, which - after
 * `processPropsDoc` - is the category declaration order from the stories file.
 */
export function toPropTable(doc: PropsDoc): PropTableProps {
  const entries: PropTableEntry[] = [];
  const categories: Record<string, string[]> = {};

  for (const prop of doc.props) {
    entries.push({
      name: prop.name,
      type: prop.type,
      default: prop.defaultValue ?? undefined,
      description: prop.description,
      required: prop.required,
      deprecated: prop.deprecated
    });

    if (prop.category) {
      (categories[prop.category] ??= []).push(prop.name);
    }
  }

  return { entries, categories };
}
