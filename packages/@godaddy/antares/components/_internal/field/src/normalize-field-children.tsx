import { cloneElement, isValidElement, type ElementType, type Key, type ReactElement, type ReactNode } from 'react';
import { FieldError } from '#components/field-error';
import { Input } from '#components/input';
import { Label } from '#components/label';
import { Popover } from '#components/popover';
import { Group } from '#components/structure';
import { TextArea } from '#components/text-area';

/** Presets filled in when the consumer leaves an interior slot empty. */
export interface FieldSlots {
  /** Inserted after the last label when no control child is present. */
  control?: ReactElement;

  /** Appended when no overlay child is present. */
  overlay?: ReactElement;

  /** Wraps loose collection items in place. */
  items?: (items: ReactNode[]) => ReactElement;
}

type FieldChildRole = 'label' | 'control' | 'description' | 'error' | 'overlay';

type FieldPresets = Pick<FieldSlots, 'control' | 'overlay'>;

const CONTROL_TYPES: ElementType[] = [Group, Input, TextArea];

const OVERLAY_TYPES: ElementType[] = [Popover];

const FRAGMENT_TYPE = (<></>).type;

function keyed(preset: ReactElement, key: Key) {
  return cloneElement(preset, { key });
}

function roleOf(child: ReactNode, presets: FieldPresets): FieldChildRole | undefined {
  if (!isValidElement(child)) return undefined;

  const { type } = child;
  if (type === Label) return 'label';
  if (type === FieldError) return 'error';
  if (CONTROL_TYPES.includes(type as ElementType) || type === presets.control?.type) return 'control';
  if (OVERLAY_TYPES.includes(type as ElementType) || type === presets.overlay?.type) return 'overlay';

  const { slot } = child.props as { slot?: string | null };
  if (slot === 'description') return 'description';
  if (slot === 'trigger' || slot === 'control') return 'control';

  return undefined;
}

/** Flatten arrays/fragments and key each element by its path. */
function flatten(children: ReactNode): ReactNode[] {
  const list: ReactNode[] = [];

  function walk(node: ReactNode, prefix: string, index: number) {
    if (node === null || node === undefined || typeof node === 'boolean') return;

    if (Array.isArray(node)) {
      for (const [at, child] of (node as ReactNode[]).entries()) walk(child, `${prefix}.${index}`, at);
      return;
    }

    if (!isValidElement(node)) {
      list.push(node);
      return;
    }

    const key = node.key === null ? `${prefix}.${index}` : `${prefix}.$${node.key}`;
    if (node.type === FRAGMENT_TYPE) {
      const { children: held } = node.props as { children?: ReactNode };
      walk(held, key, 0);
      return;
    }

    list.push(cloneElement(node, { key }));
  }

  walk(children, '', 0);
  return list;
}

/**
 * Insert missing slot presets; preserve consumer child order.
 */
export function normalizeFieldChildren(children: ReactNode, slots?: FieldSlots): ReactNode {
  const { control, overlay, items } = slots ?? {};
  if (!control && !overlay && !items) return children;

  const written = flatten(children);
  const presets = { control, overlay };
  const roles = written.map(function resolve(child) {
    return roleOf(child, presets);
  });
  const loose = written.filter(function isLoose(_child, index) {
    return roles[index] === undefined;
  });

  const insertControl = control && !roles.includes('control') ? keyed(control, 'control') : undefined;
  const appendOverlay = overlay && !roles.includes('overlay') ? keyed(overlay, 'overlay') : undefined;
  const wrapLoose = items && loose.length > 0 ? keyed(items(loose), 'items') : undefined;
  if (!insertControl && !appendOverlay && !wrapLoose) return children;

  const lastLabel = roles.lastIndexOf('label');
  const firstLoose = roles.indexOf(undefined);
  const normalized: ReactNode[] = [];

  if (insertControl && lastLabel === -1) normalized.push(insertControl);

  written.forEach(function place(child, index) {
    if (wrapLoose && roles[index] === undefined) {
      if (index === firstLoose) normalized.push(wrapLoose);
      return;
    }

    normalized.push(child);
    if (insertControl && index === lastLabel) normalized.push(insertControl);
  });

  if (appendOverlay) normalized.push(appendOverlay);

  return normalized;
}
