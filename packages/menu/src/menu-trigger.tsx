import React, { useRef, type ReactElement, type ReactNode } from 'react';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';
import type { MenuTriggerProps as AriaMenuTriggerProps } from '@react-types/menu';
import { useProps } from '@bento/use-props';
import { MenuTriggerStateContext } from './context';

/**
 * Props for the MenuTrigger component.
 * @interface MenuTriggerProps
 */
export interface MenuTriggerProps extends AriaMenuTriggerProps {
  /**
   * The trigger element (e.g., a button) and the menu.
   * Children should use the `slot` prop to specify whether they're the trigger or menu.
   */
  readonly children: ReactNode;
}

/**
 * MenuTrigger coordinates the open/close state of a menu and its trigger element.
 * It uses React Aria's useMenuTrigger and useMenuTriggerState for behavior but does not
 * impose any overlay structure. Callers should compose with @bento/overlay, @bento/portal,
 * etc. to create the desired popup experience.
 *
 * @component
 * @example
 * ```tsx
 * <MenuTrigger>
 *   <Button slot="trigger">Actions</Button>
 *   <Popover slot="popover">
 *     <Menu aria-label="Actions">
 *       <MenuItem>Edit</MenuItem>
 *       <MenuItem>Delete</MenuItem>
 *     </Menu>
 *   </Popover>
 * </MenuTrigger>
 * ```
 * @public
 */
export function MenuTrigger(props: MenuTriggerProps): ReactElement {
  const { props: processedProps } = useProps(props);
  const state = useMenuTriggerState(processedProps);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);

  // Clone children and inject props
  const children = React.Children.toArray(processedProps.children);

  const enhancedChildren = children.map(function enhanceChild(child) {
    if (!React.isValidElement(child)) {
      return child;
    }

    const slot = (child.props as { slot?: string }).slot;

    if (slot === 'trigger') {
      return React.cloneElement(
        child as ReactElement,
        {
          ...menuTriggerProps,
          ref: triggerRef
        } as any
      );
    }

    if (slot === 'menu' || slot === 'popover') {
      // For the menu/popover slot, provide menuProps and state context
      return (
        <MenuTriggerStateContext.Provider value={state}>
          {React.cloneElement(
            child as ReactElement,
            {
              ...menuProps,
              ref: menuRef
            } as any
          )}
        </MenuTriggerStateContext.Provider>
      );
    }

    return child;
  });

  return <>{enhancedChildren}</>;
}
