import type { ComponentProps } from 'react';
import { Button, Menu, MenuItem, MenuTrigger, Popover, PopoverContext, PopoverTrigger } from '@godaddy/antares';

interface ContainerContextExampleProps {
  /** Presentation supplied by the owning component. */
  context?: ComponentProps<typeof PopoverContext.Provider>['value'];

  /** Consumer overrides for the dialog and its positioned panel. */
  popoverProps?: ComponentProps<typeof Popover>;

  /** Use a menu owner to exercise its contextual panel styling. */
  menu?: boolean;
}

/**
 * Context and local props compose on the positioned panel without changing its owner.
 * @ignore
 */
export function ContainerContextExample({ context, popoverProps, menu = true }: ContainerContextExampleProps) {
  const Trigger = menu ? MenuTrigger : PopoverTrigger;
  const popover = (
    <Popover aria-label="Context panel" {...popoverProps}>
      {menu ? (
        <Menu aria-label="Context actions">
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="paste">Paste</MenuItem>
        </Menu>
      ) : (
        <p>Context and local presentation share the same panel.</p>
      )}
    </Popover>
  );

  return (
    <Trigger>
      <Button variant="primary">Open context panel</Button>
      {context ? <PopoverContext.Provider value={context}>{popover}</PopoverContext.Provider> : popover}
    </Trigger>
  );
}
