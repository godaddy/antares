import { Children, isValidElement, type ReactNode } from 'react';
import { Input } from '#components/input';
import { Group } from '#components/structure';
import { TextArea } from '#components/text-area';

/**
 * When the consumer omits `Group`, wrap bare `Input` / `TextArea` so Field box chrome still applies.
 * Passthrough if any `Group` is already present, or if `children` is a render function.
 */
export function wrapBareFieldControl(children: ReactNode | ((...args: never[]) => ReactNode)) {
  if (typeof children === 'function') return children;

  const items = Children.toArray(children);
  if (items.some((child) => isValidElement(child) && child.type === Group)) {
    return children;
  }

  return items.map((child, index) => {
    if (!isValidElement(child)) return child;
    if (child.type === Input || child.type === TextArea) {
      return <Group key={child.key ?? index}>{child}</Group>;
    }
    return child;
  });
}
