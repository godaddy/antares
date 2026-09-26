import { Fragment } from 'react';
import { viewportBreakpoints, viewportQueries, type ViewportBreakpoint } from '@godaddy/antares';

/**
 * Widths and inclusive minimum-width query strings come from the same definitions.
 * @order 2
 */
export function BreakpointsExample() {
  return (
    <dl>
      {Object.entries(viewportBreakpoints).map(function breakpoint([name, width]) {
        return (
          <Fragment key={name}>
            <dt>{name}</dt>
            <dd>
              {width}: <code>{viewportQueries[name as ViewportBreakpoint]}</code>
            </dd>
          </Fragment>
        );
      })}
    </dl>
  );
}
