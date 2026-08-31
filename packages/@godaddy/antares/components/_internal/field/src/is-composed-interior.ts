import { isValidElement, type ReactNode } from 'react';

/** True when `children` include one of `parts`. Walks arrays and Fragments. */
export function isComposedInterior(children: ReactNode, parts: Set<unknown>): boolean {
  if (Array.isArray(children)) {
    return children.some(function containsInteriorPart(child) {
      return isComposedInterior(child, parts);
    });
  }

  if (!isValidElement(children)) {
    return false;
  }

  if (parts.has(children.type)) {
    return true;
  }

  return (
    typeof children.type === 'symbol' &&
    isComposedInterior((children.props as { children?: ReactNode }).children, parts)
  );
}
