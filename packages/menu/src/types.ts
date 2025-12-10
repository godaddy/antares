import type { TreeState } from 'react-stately';
import type { MenuTriggerState } from '@react-stately/menu';

/**
 * Re-export MenuTriggerState from React Stately for convenience
 * @public
 */
export type { MenuTriggerState };

/**
 * Alias for TreeState used internally by Menu components
 * @public
 */
export type MenuState<T> = TreeState<T>;

/**
 * Selection mode for menu items
 * @public
 */
export type SelectionMode = 'none' | 'single' | 'multiple';
