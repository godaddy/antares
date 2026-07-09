import type { PropsDoc } from '../types.ts';

/** A single prop entry shaped for the docs-site `<PropTable>` component. */
export interface FumadocsPropEntry {
  name: string;
  type: string;
  default?: string;
  description?: string;
  required: boolean;
  deprecated?: boolean;
}

/** Full prop table: ordered entries plus a category -> prop-name index. */
export interface FumadocsPropTable {
  entries: FumadocsPropEntry[];
  categories: Record<string, string[]>;
}

/**
 * Converts a processed neutral `PropsDoc` into the `{ entries, categories }`
 * shape consumed by the docs-site `<PropTable>`. Entries keep `doc.props`
 * order; category keys are inserted in first-seen order, which - after
 * `processPropsDoc` - is the category declaration order from the stories file.
 */
export function toFumadocsPropTable(doc: PropsDoc): FumadocsPropTable {
  const entries: FumadocsPropEntry[] = [];
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
