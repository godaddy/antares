/* v8 ignore next */
import React from 'react';
// Reuse the components from the lock-no-override example
import { DesignSystemVersion } from './lock-no-override';

/**
 * Example demonstrating lock WITH consumer override.
 * Expected: data-override ONLY on the button (trigger slot).
 * Consumer modifies the trigger slot, internal label/description are not flagged.
 *
 * @returns {JSX.Element} The rendered example.
 * @public
 */
export const LockWithOverride: React.FC = function LockWithOverride() {
  return <DesignSystemVersion slots={{ 'composed.root.trigger': { children: 'Hello World' } }} />;
};
