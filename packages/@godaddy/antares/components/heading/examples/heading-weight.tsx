import type { CSSProperties } from 'react';
import { Heading } from '@godaddy/antares';

/**
 * Fixture for the heading weight ramp. A themed `--font-heading-weight` has to reach the
 * heading, which a relative `bolder` would ignore.
 * @ignore
 */
export function HeadingWeightExample() {
  return <Heading style={{ '--font-heading-weight': '500' } as CSSProperties}>Themed weight</Heading>;
}
