import { Children, isValidElement, type ReactNode } from 'react';
import { Button } from '#components/button';
import { FieldError } from '#components/field-error';
import { Label } from '#components/label';
import { ListBox } from '#components/listbox';
import { Popover } from '#components/popover';
import { Group } from '#components/structure';
import { Text } from '#components/text';

const composedTypes = new Set([Group, Button, Popover, ListBox]);

export type ClassifiedSelectChildren =
  | { mode: 'composed'; children: ReactNode | ((...args: never[]) => ReactNode) }
  | { mode: 'default'; label: ReactNode[]; description: ReactNode[]; error: ReactNode[]; items: ReactNode[] };

/**
 * Semi-composed vs composed detection for Select children.
 * Composed: render function, or any Group / Button / Popover / ListBox.
 * Default: Label / Text / FieldError kept; everything else becomes list items.
 */
export function classifySelectChildren(
  children: ReactNode | ((...args: never[]) => ReactNode)
): ClassifiedSelectChildren {
  if (typeof children === 'function') {
    return { mode: 'composed', children };
  }

  const list = Children.toArray(children);
  if (
    list.some((child) => isValidElement(child) && typeof child.type !== 'string' && composedTypes.has(child.type as never))
  ) {
    return { mode: 'composed', children };
  }

  const label: ReactNode[] = [];
  const description: ReactNode[] = [];
  const error: ReactNode[] = [];
  const items: ReactNode[] = [];

  for (const child of list) {
    if (!isValidElement(child)) {
      items.push(child);
      continue;
    }
    if (child.type === Label) label.push(child);
    else if (child.type === Text) description.push(child);
    else if (child.type === FieldError) error.push(child);
    else items.push(child);
  }

  return { mode: 'default', label, description, error, items };
}
