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
 * React context for sharing MenuTrigger state (RootMenuTriggerState) across components.
 * This context is used to coordinate menu open/close state and is designed to support
 * future nested submenu implementations. In v1, it's primarily used by MenuTrigger but
 * can be extended for SubmenuTrigger in later versions.
 *
 * @context
 * @internal
 */
export const MenuTriggerStateContext = createContext<MenuTriggerState | null>(null);
