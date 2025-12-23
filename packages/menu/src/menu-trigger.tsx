import React, { useRef, useLayoutEffect, type ReactElement, type ReactNode } from 'react';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';
import { useResizeObserver } from '@react-aria/utils';
import type { MenuTriggerProps as AriaMenuTriggerProps } from '@react-types/menu';
import { useProps } from '@bento/use-props';
import { MenuTriggerStateContext, RootMenuTriggerStateContext } from './context';

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
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  readonly trigger?: 'press' | 'longPress';
  /**
   * Whether the menu is open by default (uncontrolled).
   */
  readonly defaultOpen?: boolean;
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

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { trigger: processedProps.trigger, type: 'menu' },
    state,
    triggerRef
  );

  // Track trigger width for popover positioning
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>();
  useResizeObserver({
    ref: triggerRef,
    onResize() {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }
  });

  // Set CSS variable for trigger width
  useLayoutEffect(
    function setTriggerWidthVar() {
      if (menuRef.current && triggerWidth) {
        menuRef.current.style.setProperty('--trigger-width', `${triggerWidth}px`);
      }
    },
    [triggerWidth]
  );

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

    // Support both 'overlay' (from PDR) and 'menu'/'popover' slots
    if (slot === 'overlay') {
      // For overlay slot, provide both trigger state and root state contexts
      return (
        <RootMenuTriggerStateContext.Provider value={state}>
          <MenuTriggerStateContext.Provider value={state}>
            {React.cloneElement(child as ReactElement)}
          </MenuTriggerStateContext.Provider>
        </RootMenuTriggerStateContext.Provider>
      );
    }

    if (slot === 'menu' || slot === 'popover') {
      // For the menu/popover slot, provide menuProps and state contexts
      return (
        <RootMenuTriggerStateContext.Provider value={state}>
          <MenuTriggerStateContext.Provider value={state}>
            {React.cloneElement(
              child as ReactElement,
              {
                ...menuProps,
                ref: menuRef
              } as any
            )}
          </MenuTriggerStateContext.Provider>
        </RootMenuTriggerStateContext.Provider>
      );
    }

    return child;
  });

  return <>{enhancedChildren}</>;
}
