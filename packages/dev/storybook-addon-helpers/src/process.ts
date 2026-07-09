import type { DocsOptions, PropDoc, PropsDoc } from './types.ts';

export function processPropsDoc<P>(doc: PropsDoc, options: DocsOptions<P> = {}): PropsDoc {
  const overridden = applyOverrides(doc.props, options.overrides);
  const filtered = filterProps(overridden, options);
  const categorized = applyCategories(filtered, options.categories, options.primary);

  return {
    name: doc.name,
    props: sortProps(categorized, options.primary, options.categories)
  };
}

/** A matcher is an exact prop name or a `RegExp` tested against the prop name. */
type Matcher = PropertyKey | RegExp;

/** Index of the first matcher that matches `name`, or `-1` when none do. */
function firstMatchIndex(name: string, matchers: readonly Matcher[]): number {
  return matchers.findIndex((matcher) => (matcher instanceof RegExp ? matcher.test(name) : String(matcher) === name));
}

function matches(name: string, matchers: readonly Matcher[]): boolean {
  return firstMatchIndex(name, matchers) !== -1;
}

type Override<P> = NonNullable<DocsOptions<P>['overrides']>[number];

function applyOverrides<P>(props: PropDoc[], overrides: DocsOptions<P>['overrides']): PropDoc[] {
  if (!overrides || overrides.length === 0) return props.map((prop) => ({ ...prop }));

  const result = props.map((prop) => ({ ...prop }));
  const seen = new Set(result.map((prop) => prop.name));

  // An exact name that matches nothing adds a stub; RegExp names only patch existing props.
  for (const { name } of overrides) {
    if (name instanceof RegExp || seen.has(String(name))) continue;
    seen.add(String(name));
    result.push({ name: String(name), type: 'unknown', required: false });
  }

  // Apply every matching override in order; later fields win.
  return result.map(function patch(prop) {
    return overrides.reduce(
      (next, override) => (matches(prop.name, [override.name]) ? mergeOverride(next, override) : next),
      prop
    );
  });
}

function mergeOverride<P>(prop: PropDoc, override: Override<P>): PropDoc {
  const next = { ...prop };
  if (override.type !== undefined) next.type = override.type;
  if (override.required !== undefined) next.required = override.required;
  if (override.description !== undefined) next.description = override.description;
  if (override.defaultValue !== undefined) next.defaultValue = override.defaultValue;
  return next;
}

function filterProps<P>(props: PropDoc[], options: DocsOptions<P>): PropDoc[] {
  const include = options.include ?? [];
  const exclude = options.exclude ?? [];

  if (include.length > 0) return props.filter((prop) => matches(prop.name, include));
  if (exclude.length > 0) return props.filter((prop) => !matches(prop.name, exclude));

  return [...props];
}

function applyCategories<P>(
  props: PropDoc[],
  categories: DocsOptions<P>['categories'],
  primary: DocsOptions<P>['primary']
): PropDoc[] {
  const primaryMatchers = primary ?? [];
  const entries = Object.entries(categories ?? {});
  if (primaryMatchers.length === 0 && entries.length === 0) return props.map((prop) => ({ ...prop }));

  return props.map(function categorize(prop) {
    // `primary` wins over categories and keeps the prop uncategorized (root bucket).
    if (matches(prop.name, primaryMatchers)) return { ...prop, category: undefined };
    // Otherwise the first declared category whose matchers match wins.
    const entry = entries.find(([, matchers]) => matches(prop.name, matchers));
    return { ...prop, category: entry?.[0] };
  });
}

function sortProps<P>(
  props: PropDoc[],
  primary: DocsOptions<P>['primary'],
  categories: DocsOptions<P>['categories']
): PropDoc[] {
  const primaryMatchers = primary ?? [];
  const categoryMatchers = categories ?? {};

  // Sections follow category declaration order; the root bucket (no category)
  // renders first in Storybook regardless of its position here.
  const categoryOrder = new Map<string, number>();
  for (const category of Object.keys(categoryMatchers)) categoryOrder.set(category, categoryOrder.size);
  for (const prop of props) {
    const category = prop.category ?? '';
    if (!categoryOrder.has(category)) categoryOrder.set(category, categoryOrder.size);
  }

  // Rank within a bucket = first-match index in that bucket's matcher list
  // (`primary` for root, the category's own array for a section); unmatched
  // props rank last and fall back to required-first, then alphabetical.
  const rankByName = new Map<string, number>();
  for (const prop of props) {
    const bucket = prop.category ? (categoryMatchers[prop.category] ?? []) : primaryMatchers;
    const rank = firstMatchIndex(prop.name, bucket);
    rankByName.set(prop.name, rank === -1 ? Number.MAX_SAFE_INTEGER : rank);
  }

  return [...props].sort(function compareProps(left, right) {
    const categoryDelta =
      (categoryOrder.get(left.category ?? '') ?? 0) - (categoryOrder.get(right.category ?? '') ?? 0);
    if (categoryDelta !== 0) return categoryDelta;

    const rankDelta = (rankByName.get(left.name) ?? 0) - (rankByName.get(right.name) ?? 0);
    if (rankDelta !== 0) return rankDelta;

    if (left.required !== right.required) return left.required ? -1 : 1;
    return left.name.localeCompare(right.name);
  });
}
