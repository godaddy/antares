import React from 'react';

/**
 * Checks if children contain all required slot assignments, including namespaced paths.
 *
 * This utility iterates through React children to verify that all required
 * slot names are present. It supports both simple slot names ('trigger') and
 * namespaced paths ('submit.icon') for deeply nested slot validation.
 *
 * **Important:** Only components wrapped with `withSlots()` are validated. Raw HTML
 * elements with `slot` props are ignored, as they are not part of the Bento slot system.
 *
 * @param slotNames - Array of required slot names to check for (e.g., ['trigger', 'submit.icon'])
 * @param children - React children to search through
 * @returns true if all required slots are found, false otherwise. Returns true
 *          for render prop functions since slots can't be validated until executed.
 *
 * @example
 * ```tsx
 * // Simple slot validation
 * function MyComponent({ children }) {
 *   if (!contains(['trigger', 'content'], children)) {
 *     throw new BentoError({
 *       name: 'my-component',
 *       method: 'MyComponent',
 *       message: 'Missing required slots: trigger and content'
 *     });
 *   }
 *   return <div>{children}</div>;
 * }
 *
 * // Namespaced slot validation
 * function Form({ children }) {
 *   if (!contains(['submit.icon'], children)) {
 *     throw new Error('Submit button must have an icon');
 *   }
 *   return <form>{children}</form>;
 * }
 * ```
 *
 * @public
 */
export function contains(slotNames: string[], children: React.ReactNode): boolean {
  if (!slotNames || slotNames.length === 0) return true;
  if (!children) return false;

  // Skip validation for render prop functions - we can't inspect slots
  // until the function is executed with state/props
  if (typeof children === 'function') return true;

  const foundSlots = new Set<string>();

  /**
   * Recursively search through children to find slot assignments, building
   * the path as we go to support namespaced lookups like 'submit.icon'.
   *
   * When a child has a slot prop, we add both the simple slot name and the full
   * namespaced path to our set. For example, if we find:
   * - `<Button slot="submit"><Icon slot="icon" /></Button>`
   *
   * We'll add: 'submit', 'submit', 'icon', and 'submit.icon' to foundSlots.
   *
   * Children without slot props (like wrapper divs) are searched through
   * transparently without extending the path.
   *
   * Only components wrapped with `withSlots()` are considered valid slotted
   * components. They can be identified by the `bento` property set to `true`.
   *
   * @param node - The React children to search through
   * @param path - The accumulated path of slot names from parent to current level
   */
  function search(node: React.ReactNode, path: string[] = []): void {
    React.Children.forEach(node, function processChild(child) {
      if (!React.isValidElement(child)) return;

      // Check if this is a component wrapped with withSlots
      // withSlots components have a `bento` property set to true
      const childType = child.type as any;
      const isSlottedComponent = childType?.bento === true;

      // Check if this child has a slot prop
      const slot = (child.props as any)?.slot;
      if (typeof slot === 'string' && slot.length > 0) {
        // Only process slot assignments on withSlots components
        if (isSlottedComponent) {
          // Build the full path including this slot
          const fullPath = [...path, slot];
          const pathString = fullPath.join('.');

          // Add both the simple slot name and the full namespaced path
          foundSlots.add(slot);
          foundSlots.add(pathString);

          // Continue searching children with the updated path
          if ((child.props as any)?.children) {
            search((child.props as any).children, fullPath);
          }
        } else {
          // Not a withSlots component - search children without extending path
          if ((child.props as any)?.children) {
            search((child.props as any).children, path);
          }
        }
      } else {
        // No slot on this child, but continue searching its children
        // without extending the path
        if ((child.props as any)?.children) {
          search((child.props as any).children, path);
        }
      }
    });
  }

  search(children);

  // Check if all required slots were found
  return slotNames.every((name) => foundSlots.has(name));
}
