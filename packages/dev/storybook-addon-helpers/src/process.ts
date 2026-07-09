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

/**
 * Index of the first matcher that matches `name` (exact string or `RegExp.test`),
 * or `-1` when none match.
 */
function firstMatchIndex(name: string, matchers: readonly Matcher[]): number {
  return matchers.findIndex((matcher) => (matcher instanceof RegExp ? matcher.test(name) : String(matcher) === name));
}

/** True when `name` equals any string matcher or is matched by any RegExp matcher. */
function matches(name: string, matchers: readonly Matcher[]): boolean {
  return firstMatchIndex(name, matchers) !== -1;
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
  // Each prop's rank is the index of the first `order` entry (name or RegExp) that
  // matches it; props matched by no entry are omitted and fall back to the
  // required-first, alphabetical ordering below.
  const orderMatchers = order ?? [];
  const orderIndex = new Map<string, number>();
  for (const prop of props) {
    const rank = firstMatchIndex(prop.name, orderMatchers);
    if (rank !== -1) orderIndex.set(prop.name, rank);
  }

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
      // A RegExp entry can match several props, so ranks can tie; equal ranks
      // fall through to the required-first, alphabetical tie-break below.
      const orderDelta = (leftOrder ?? Number.MAX_SAFE_INTEGER) - (rightOrder ?? Number.MAX_SAFE_INTEGER);
      if (orderDelta !== 0) return orderDelta;
    }

    if (left.required !== right.required) return left.required ? -1 : 1;
    return left.name.localeCompare(right.name);
  });
}
