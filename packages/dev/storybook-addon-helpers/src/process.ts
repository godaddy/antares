import type { DocsOptions, PropDoc, PropsDoc } from './types.ts';

export function processPropsDoc<P>(doc: PropsDoc, options: DocsOptions<P> = {}): PropsDoc {
  const filtered = filterProps(doc.props, options);
  const categorized = applyCategories(filtered, options.categories);

  return {
    name: doc.name,
    props: sortProps(categorized, options.order, options.categories)
  };
}

/** A matcher is an exact prop name or a `RegExp` tested against the prop name. */
type Matcher = PropertyKey | RegExp;

/** True when `name` equals any string matcher or is matched by any RegExp matcher. */
function matches(name: string, matchers: readonly Matcher[]): boolean {
  return matchers.some((matcher) => (matcher instanceof RegExp ? matcher.test(name) : String(matcher) === name));
}

function filterProps<P>(props: PropDoc[], options: DocsOptions<P>): PropDoc[] {
  const include = options.include ?? [];
  const exclude = options.exclude ?? [];

  if (include.length > 0) return props.filter((prop) => matches(prop.name, include));
  if (exclude.length > 0) return props.filter((prop) => !matches(prop.name, exclude));

  return [...props];
}

function applyCategories<P>(props: PropDoc[], categories: DocsOptions<P>['categories']): PropDoc[] {
  if (!categories) return props.map((prop) => ({ ...prop }));

  const entries = Object.entries(categories);

  return props.map(function categorize(prop) {
    // First declared category whose matchers match the prop wins.
    const entry = entries.find(([, matchers]) => matches(prop.name, matchers));
    return { ...prop, category: entry?.[0] };
  });
}

function sortProps<P>(
  props: PropDoc[],
  order: DocsOptions<P>['order'],
  categories: DocsOptions<P>['categories']
): PropDoc[] {
  const orderIndex = new Map((order ?? []).map((name, index) => [String(name), index]));
  const categoryOrder = new Map<string, number>();

  for (const category of Object.keys(categories ?? {})) {
    categoryOrder.set(category, categoryOrder.size);
  }

  for (const prop of props) {
    const category = prop.category ?? '';
    if (!categoryOrder.has(category)) categoryOrder.set(category, categoryOrder.size);
  }

  return [...props].sort(function compareProps(left, right) {
    const categoryDelta =
      (categoryOrder.get(left.category ?? '') ?? 0) - (categoryOrder.get(right.category ?? '') ?? 0);
    if (categoryDelta !== 0) return categoryDelta;

    const leftOrder = orderIndex.get(left.name);
    const rightOrder = orderIndex.get(right.name);
    if (leftOrder !== undefined || rightOrder !== undefined) {
      return (leftOrder ?? Number.MAX_SAFE_INTEGER) - (rightOrder ?? Number.MAX_SAFE_INTEGER);
    }

    if (left.required !== right.required) return left.required ? -1 : 1;
    return left.name.localeCompare(right.name);
  });
}
