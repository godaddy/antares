import { Icon, IconContext } from '@godaddy/antares';

/**
 * Parents inject presentation through IconContext so composed Icons inherit
 * color, size, and accessibility without wrapping or cloning. Props on Icon
 * still win over context.
 *
 * @ignore
 */
export function IconContextExample() {
  return (
    <IconContext.Provider
      value={{ color: 'blue', width: 24, height: 24, className: 'from-context', 'aria-hidden': true }}
    >
      <Icon icon="star" />
      <Icon icon="heart" color="red" className="from-local" />
    </IconContext.Provider>
  );
}
