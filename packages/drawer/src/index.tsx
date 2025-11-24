import React from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';
import { Container } from '@bento/container';

export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end';

export interface DrawerProps extends React.ComponentProps<'div'>, Slots {
  /**
   * The placement of the drawer relative to its container.
   * Determines which edge the drawer appears on and affects its animation direction.
   *
   * @default 'left'
   */
  readonly placement?: DrawerPlacement;

  /**
   * Whether the drawer is expanded (open) or collapsed (closed).
   * The drawer is a fully controlled component, so this prop must be managed by the parent.
   */
  readonly isExpanded: boolean;

  /**
   * Maximum width of the drawer when expanded.
   * Accepts any valid CSS width value (e.g., '300px', '50%', '20rem').
   *
   * @default 'auto'
   */
  readonly maxWidth?: string;

  /**
   * Maximum height of the drawer when expanded.
   * Accepts any valid CSS height value (e.g., '50vh', '400px', '100%').
   *
   * @default 'auto'
   */
  readonly maxHeight?: string;

  /**
   * Minimum width of the drawer when collapsed.
   * Accepts any valid CSS width value (e.g., '60px', '5rem').
   * When the drawer is collapsed, it will not shrink below this value.
   *
   * @default 'auto'
   */
  readonly minWidth?: string;

  /**
   * Minimum height of the drawer when collapsed.
   * Accepts any valid CSS height value (e.g., '40px', '3rem').
   * When the drawer is collapsed, it will not shrink below this value.
   *
   * @default 'auto'
   */
  readonly minHeight?: string;

  /**
   * Whether to animate the drawer when expanding or collapsing.
   * When set to `true`, uses a default transition of '0.3s ease-in-out'.
   * When set to a string, uses that value as the CSS transition timing function.
   * When set to `false`, disables animation entirely.
   *
   * @default true
   */
  readonly animate?: boolean | string;
}

/**
 * Hook that returns the styles for the drawer based on its expanded state and orientation.
 * @internal
 */
function useDrawerStyles({
  isExpanded,
  placement = 'left',
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  animate,
  style: userStyle = {}
}: DrawerProps): React.CSSProperties {
  const transitionValue = animate ? (typeof animate === 'string' ? animate : '0.3s ease-in-out') : 'none';

  // Determine orientation-specific styles
  const isHorizontal = ['left', 'right', 'start', 'end'].includes(placement);

  const styles = {
    // Base grid styles
    display: 'grid' as const,
    overflow: 'hidden' as const,
    padding: 0,
    margin: 0,
    border: 0,

    // Flex alignment based on placement
    alignSelf: ['bottom', 'right', 'end'].includes(placement) ? 'end' : 'start',

    // Orientation-specific grid styles
    ...(isHorizontal
      ? {
          gridTemplateColumns: isExpanded ? '1fr' : '0fr',
          height: '100%'
        }
      : {
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          width: '100%'
        }),
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    ...(animate
      ? {
          transition: `all ${transitionValue}`,
          willChange: 'grid-template-rows, grid-template-columns'
        }
      : {}),
    // User styles override collapse styles
    ...userStyle
  } as React.CSSProperties;

  return styles;
}

/**
 * A complete Drawer component providing an expandable panel that can be used for
 * sidebar navigation, bottom sheets, and disclosures.
 *
 * @component
 * @param {DrawerProps} args - The properties passed to the Drawer component
 * @param {React.ForwardedRef<HTMLDivElement>} ref - The ref to the drawer container
 * @returns {React.ReactElement} A Drawer component
 * @public
 */
function DrawerComponent(args: DrawerProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement {
  const { props } = useProps(args);

  const {
    placement = 'left',
    maxWidth = 'auto',
    maxHeight = 'auto',
    minWidth = 'auto',
    minHeight = 'auto',
    animate = true,
    children,
    style: userStyle = {},
    isExpanded,
    ...rest
  } = props;

  const state = { isExpanded, placement };

  const dataAttributes = useDataAttributes(state);

  const { apply } = useProps(rest, state);

  const propsToExclude = [
    'placement',
    'isExpanded',
    'maxWidth',
    'maxHeight',
    'minWidth',
    'minHeight',
    'animate',
    'children',
    'style'
  ];

  const appliedUserProps = apply(rest, propsToExclude);

  // Get styles for the drawer based on its state
  const style = useDrawerStyles({
    isExpanded,
    placement,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    animate,
    style: userStyle
  });

  return (
    <Container {...dataAttributes} {...appliedUserProps} style={style} ref={ref}>
      <div
        style={{
          // min-height: 0 and min-width: 0 are critical - allows grid item to shrink below content size
          // This is required for CSS Grid animation technique (0fr -> 1fr)
          minWidth: 0,
          minHeight: 0
        }}
      >
        {children}
      </div>
    </Container>
  );
}

export const Drawer = withSlots('BentoDrawer', React.forwardRef(DrawerComponent));
