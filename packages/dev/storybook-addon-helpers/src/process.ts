import type { DocsOptions, PropDoc, PropsDoc } from './types.ts';

export function processPropsDoc<P>(doc: PropsDoc, options: DocsOptions<P> = {}): PropsDoc {
  const filtered = filterProps(doc.props, options);
  const grouped = applyGroups(filtered, options.groups);

  return {
    name: doc.name,
    props: sortProps(grouped, options.order, options.groups)
  };
}

function filterProps<P>(props: PropDoc[], options: DocsOptions<P>): PropDoc[] {
  const include = new Set((options.include ?? []).map(String));
  const exclude = new Set((options.exclude ?? []).map(String));

  if (include.size > 0) return props.filter((prop) => include.has(prop.name));
  if (exclude.size > 0) return props.filter((prop) => !exclude.has(prop.name));

  return [...props];
}

function applyGroups<P>(props: PropDoc[], groups: DocsOptions<P>['groups']): PropDoc[] {
  if (!groups) return props.map((prop) => ({ ...prop }));

  const groupByProp = new Map<string, string>();
  for (const [group, propNames] of Object.entries(groups)) {
    for (const propName of propNames) groupByProp.set(String(propName), group);
  }

  return props.map((prop) => ({ ...prop, group: groupByProp.get(prop.name) }));
}

function sortProps<P>(props: PropDoc[], order: DocsOptions<P>['order'], groups: DocsOptions<P>['groups']): PropDoc[] {
  const orderIndex = new Map((order ?? []).map((name, index) => [String(name), index]));
  const groupOrder = new Map<string, number>();

  for (const group of Object.keys(groups ?? {})) {
    groupOrder.set(group, groupOrder.size);
  }

  for (const prop of props) {
    const group = prop.group ?? '';
    if (!groupOrder.has(group)) groupOrder.set(group, groupOrder.size);
  }

  return [...props].sort(function compareProps(left, right) {
    const groupDelta = (groupOrder.get(left.group ?? '') ?? 0) - (groupOrder.get(right.group ?? '') ?? 0);
    if (groupDelta !== 0) return groupDelta;

    const leftOrder = orderIndex.get(left.name);
    const rightOrder = orderIndex.get(right.name);
    if (leftOrder !== undefined || rightOrder !== undefined) {
      return (leftOrder ?? Number.MAX_SAFE_INTEGER) - (rightOrder ?? Number.MAX_SAFE_INTEGER);
    }

    if (left.required !== right.required) return left.required ? -1 : 1;
    return left.name.localeCompare(right.name);
  });
}
