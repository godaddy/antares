import React from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Container, type ContainerProps } from '@bento/container';

export interface DrawerProps extends ContainerProps {
  /**
   * Whether the drawer is open or closed.
   * The drawer is a fully controlled component, so this prop must be managed by the parent.
   */
  readonly open: boolean;
}

/**
 * A headless Drawer component that manages state and coordinates child components
 * via slots. All styling and layout should be handled via external CSS.
 *
 * @component
 * @param {DrawerProps} args - The properties passed to the Drawer component
 * @returns {React.ReactElement} A Drawer component
 * @public
 */
function DrawerComponent(args: DrawerProps): React.ReactElement {
  const { props, apply } = useProps(args);

  const { open, children } = props;

  const state = { open };

  const dataAttributes = useDataAttributes(state);

  // Forward all props to Container, excluding internal props
  const containerProps = apply(
    {
      ...dataAttributes,
      'aria-expanded': open
    },
    ['open', 'children']
  );

  return <Container {...containerProps}>{children}</Container>;
}

export const Drawer = withSlots('BentoDrawer', DrawerComponent);
