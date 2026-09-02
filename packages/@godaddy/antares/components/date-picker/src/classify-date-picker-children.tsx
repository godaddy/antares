import { Children, isValidElement, type ReactNode } from 'react';
import { Button } from '#components/button';
import { Calendar, RangeCalendar } from '#components/calendar';
import { FieldError } from '#components/field-error';
import { Label } from '#components/label';
import { Popover } from '#components/popover';
import { Content, Group } from '#components/structure';
import { Text } from '#components/text';

const composedTypes = new Set([Group, Button, Popover, Content, Calendar, RangeCalendar]);

export type ClassifiedDatePickerChildren =
  | { mode: 'composed'; children: ReactNode | ((...args: never[]) => ReactNode) }
  | { mode: 'default'; label: ReactNode[]; description: ReactNode[]; error: ReactNode[] };

/**
 * Semi-composed vs composed detection for DatePicker / DateRangePicker children.
 * Composed: render function, or any Group / Button / Popover / Content / Calendar / RangeCalendar.
 * Default: Label / Text / FieldError kept; DatePicker injects the trigger and popover.
 */
export function classifyDatePickerChildren(
  children?: ReactNode | ((...args: never[]) => ReactNode)
): ClassifiedDatePickerChildren {
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

  for (const child of list) {
    if (!isValidElement(child)) continue;
    if (child.type === Label) label.push(child);
    else if (child.type === Text) description.push(child);
    else if (child.type === FieldError) error.push(child);
  }

  return { mode: 'default', label, description, error };
}
