import { cloneElement, isValidElement, type ElementType, type Key, type ReactElement, type ReactNode } from 'react';
import { FieldError } from '#components/field-error';
import { Input } from '#components/input';
import { Label } from '#components/label';
import { Popover } from '#components/popover';
import { Group } from '#components/structure';
import { TextArea } from '#components/text-area';

/**
 * Presets a field root fills in when the consumer leaves an interior slot empty. Each preset also
 * declares what fills its slot: a child of the same type as `control` counts as the control, so a
 * root registers its presets once, here, and no component has to be tagged.
 */
export interface FieldSlots {
  /** Inserted after the last label when the interior has no control child. */
  control?: ReactElement;

  /** Appended when the interior has no overlay child. */
  overlay?: ReactElement;

  /** Wraps the children that fill no field slot (collection items), in place. */
  items?: (items: ReactNode[]) => ReactElement;
}

/** Which part of a field interior a child fills. */
type FieldChildRole = 'label' | 'control' | 'description' | 'error' | 'overlay';

/** The slots whose preset also declares which child type fills them. */
type FieldPresets = Pick<FieldSlots, 'control' | 'overlay'>;

/**
 * Generic field parts, the same set `FieldContexts` injects chrome into. A `Group` is the control
 * when the interior composes several controls; a lone `Input` / `TextArea` is the control itself.
 */
const CONTROL_TYPES: ElementType[] = [Group, Input, TextArea];

const OVERLAY_TYPES: ElementType[] = [Popover];

/** `Fragment`, read off an element rather than imported, so a fragment child can be looked through. */
const FRAGMENT_TYPE = (<></>).type;

/** Gives an inserted preset a stable key, since it joins a list of children. */
function keyed(preset: ReactElement, key: Key) {
  return cloneElement(preset, { key });
}

function roleOf(child: ReactNode, presets: FieldPresets): FieldChildRole | undefined {
  if (!isValidElement(child)) return undefined;

  // A root's own preset declares what fills its slot, so no component has to be tagged.
  const { type } = child;
  if (type === Label) return 'label';
  if (type === FieldError) return 'error';
  if (CONTROL_TYPES.includes(type as ElementType) || type === presets.control?.type) return 'control';
  if (OVERLAY_TYPES.includes(type as ElementType) || type === presets.overlay?.type) return 'overlay';

  // RAC slot conventions, for parts whose role comes from usage rather than identity.
  const { slot } = child.props as { slot?: string | null };
  if (slot === 'description') return 'description';
  if (slot === 'trigger' || slot === 'control') return 'control';

  return undefined;
}

/**
 * Flattens the interior, looking through arrays and fragments so a conditionally grouped child is
 * seen as the child itself. Every element is keyed by its path through that nesting, since the
 * normalized interior is rendered as a list.
 */
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
 * Fills the interior slots the consumer left empty. Children keep the order they were written in:
 * the field only inserts the presets that are missing and wraps loose collection items in place.
 *
 * @param children - The interior as written by the consumer.
 * @param slots - The {@link FieldSlots} this root fills in.
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
      // The whole loose run collapses into one wrapper, where the first loose child was written.
      if (index === firstLoose) normalized.push(wrapLoose);
      return;
    }

    normalized.push(child);
    if (insertControl && index === lastLabel) normalized.push(insertControl);
  });

  if (appendOverlay) normalized.push(appendOverlay);

  return normalized;
}
