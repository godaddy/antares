import { DEFAULT_SLOT, HeadingContext } from 'react-aria-components';
import { Heading } from '@godaddy/antares';

/**
 * Fixture for `Heading` level resolution: container-supplied, explicit prop wins, unslotted
 * falls back to the default. Uses RAC's context directly as it stands in for any container.
 * @ignore
 */
export function HeadingContextExample() {
  return (
    <HeadingContext.Provider value={{ slots: { [DEFAULT_SLOT]: {}, title: { level: 2 } } }}>
      <Heading slot="title">Container level</Heading>
      <Heading slot="title" level={5}>
        Explicit level
      </Heading>
      <Heading>Default level</Heading>
    </HeadingContext.Provider>
  );
}
