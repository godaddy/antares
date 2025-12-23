import { createContext } from 'react';
import type { TreeState } from 'react-stately';
import type { MenuTriggerState } from '@react-stately/menu';

/**
 * React context for sharing Menu state (TreeState) across components.
 * This context provides the Menu state to child components like MenuItem and MenuSection,
 * enabling them to access selection state, collection data, and other shared functionality.
 *
 * @context
 * @internal
 */
export const MenuStateContext = createContext<TreeState<unknown> | null>(null);

/**
 * React context for sharing MenuTrigger state (MenuTriggerState) across components.
 * This context is used to coordinate menu open/close state between the MenuTrigger
 * and its Menu children.
 *
 * @context
 * @internal
 */
export const MenuTriggerStateContext = createContext<MenuTriggerState | null>(null);

/**
 * React context for sharing root-level MenuTrigger state across nested menus.
 * This context is used by SubmenuTrigger to coordinate with the root MenuTrigger,
 * enabling proper submenu behavior and state management in hierarchical menus.
 *
 * @context
 * @public
 */
export const RootMenuTriggerStateContext = createContext<MenuTriggerState | null>(null);
