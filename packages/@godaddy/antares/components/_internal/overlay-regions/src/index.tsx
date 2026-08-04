import type { ReactNode } from 'react';
import { Provider as RACProvider } from 'react-aria-components';
import { ButtonGroupContext, ContentContext, FooterContext, HeaderContext } from '#components/structure';
import styles from './index.module.css';

export interface OverlayRegionsProps {
  /** The composed overlay interior. */
  children?: ReactNode;
}

/**
 * Supplies the region styling shared by every overlay (`Modal`, `Drawer`, `Popover`): `Header`
 * and `Footer` stay pinned while `Content` scrolls, and a `ButtonGroup` aligns to the end.
 *
 * Internal. Overlays wrap their children in it so the region CSS and context wiring live in
 * exactly one place. An overlay needing different spacing layers its own class on top through
 * its own `Provider` - `useContextProps` concatenates `className` - rather than forking this.
 *
 * @param props - The properties {@link OverlayRegionsProps} passed to the component.
 */
export function OverlayRegions(props: OverlayRegionsProps) {
  return (
    <RACProvider
      values={[
        [HeaderContext, { className: styles.header, alignItems: 'start' }],
        [ContentContext, { className: styles.content }],
        [FooterContext, { className: styles.footer }],
        [ButtonGroupContext, { className: styles.buttonGroup }]
      ]}
    >
      {props.children}
    </RACProvider>
  );
}
