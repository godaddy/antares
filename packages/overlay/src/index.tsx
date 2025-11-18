import { useOverlayTriggerState } from '@react-stately/overlays';
import { useOverlayTrigger, useModalOverlay } from '@react-aria/overlays';
import { Slot } from '@bento/box';
import { withSlots, type Slots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import React, { type ReactNode, useRef } from 'react';

/**
 * State object passed to render prop functions and child slots
 * @public
 */
export interface State {
  /**
   * Whether the overlay is currently open
   */
  open: boolean;
}

/**
 * Props for the Overlay component.
 *
 * @public
 */
export interface OverlayProps extends Slots {
  /**
   * Whether the overlay is open (controlled).
   */
  open?: boolean;

  /**
   * Default open state (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The type of overlay trigger.
   * @default 'dialog'
   */
  type?: 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';

  /**
   * Whether the overlay can be dismissed by clicking outside or pressing ESC.
   * @default true
   */
  isDismissable?: boolean;

  /**
   * Content to render inside the overlay.
   * Consumers provide Portal, ScrollLock, FocusLock, and content via slots.
   */
  children?: ReactNode;

  /**
   * Render prop for className
   */
  className?: ((state: State) => string) | string;

  /**
   * Render prop for style
   */
  style?: ((state: State) => React.CSSProperties) | React.CSSProperties;
}

/**
 * Overlay manages state and coordinates React Aria hooks for overlay patterns.
 * It passes props via slots to children (trigger, backdrop, content) for composition.
 *
 * The Overlay component serves as a coordinator that brings together focused
 * primitives like Portal, FocusLock, ScrollLock, and Dismiss. It manages React
 * Aria hooks and coordinates all child components via slots, following Bento's
 * composition model.
 *
 * @component
 * @param args - The properties {@link OverlayProps} passed to the Overlay component.
 *
 * @example
 * ```tsx
 * // Basic controlled overlay
 * const [open, setOpen] = useState(false);
 * <Overlay open={open} onOpenChange={setOpen}>
 *   <Button slot="trigger" onPress={() => setOpen(true)}>Open</Button>
 *   {open && (
 *     <Portal mounted>
 *       <ScrollLock />
 *       <FocusLock contain restoreFocus autoFocus>
 *         <Container slot="backdrop" />
 *         <Container slot="content">
 *           <Dismiss onDismiss={() => setOpen(false)} />
 *           <Text>Overlay content</Text>
 *           <Dismiss onDismiss={() => setOpen(false)} />
 *         </Container>
 *       </FocusLock>
 *     </Portal>
 *   )}
 * </Overlay>
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled overlay with trigger
 * <Overlay defaultOpen={false}>
 *   <Button slot="trigger">Toggle Overlay</Button>
 *   {/* Portal, ScrollLock, FocusLock, content... *\/}
 * </Overlay>
 * ```
 *
 * @public
 */
export const Overlay = withSlots('BentoOverlay', function Overlay(args: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  // Extract onOpenChange, open, defaultOpen directly from args for state management
  // These must not go through useProps as they control the state itself
  const { onOpenChange, open, defaultOpen } = args;

  // Use React Aria's overlay trigger state for controlled/uncontrolled state
  const state = useOverlayTriggerState({
    onOpenChange,
    defaultOpen,
    isOpen: open
  });

  // Pass state to useProps so render props can access it and get type/isDismissable
  const { props } = useProps(args, { open: state.isOpen });
  const { type = 'dialog', isDismissable = true } = props;

  // Get trigger props from React Aria
  const { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type
    },
    state,
    triggerRef
  );

  // Get modal overlay props (includes underlayProps for backdrop)
  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable
    },
    state,
    overlayRef
  );

  // Access children - if it's a render prop function, execute it
  // Otherwise pass through via props.children for slot merging
  const rawChildren = args.children;
  const isRenderProp = typeof rawChildren === 'function';

  const renderedChildren = isRenderProp
    ? (rawChildren as Function)({ state: { open: state.isOpen }, props: args, slots: {} })
    : props.children;

  if (!renderedChildren) return null;

  // Use the Slot component to provide slots to children
  // Children that use slots will automatically receive the overlay slots
  return (
    <Slot
      slots={{
        trigger: {
          ...triggerProps,
          ref: triggerRef,
          onClick: () => state.toggle()
        },
        backdrop: underlayProps,
        content: {
          ...overlayProps,
          ...modalProps,
          ref: overlayRef
        }
      }}
    >
      {renderedChildren}
    </Slot>
  );
}) as (props: OverlayProps) => React.ReactElement | null;
