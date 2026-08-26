import { DEFAULT_SLOT, HeadingContext } from 'react-aria-components';
import { Heading } from '@godaddy/antares';

/**
 * Fixture for `Heading`'s level resolution. A container supplies the level through
 * `HeadingContext` — RAC's `Dialog` does this for `slot="title"` — an explicit `level`
 * prop wins over it, and an unslotted `Heading` receives nothing so its default applies.
 *
 * Uses RAC's context directly because it stands in for any container. `Modal`'s own
 * `aria-labelledby` wiring is covered by `modal/test/modal.browser.test.tsx`.
 * @ignore
 */
export function HeadingContextExample() {
  return (
    <HeadingContext.Provider value={{ slots: { [DEFAULT_SLOT]: {}, title: { level: 3 } } }}>
      <Heading slot="title">Container level</Heading>
      <Heading slot="title" level={5}>
        Explicit level
      </Heading>
      <Heading>Default level</Heading>
    </HeadingContext.Provider>
  );
}
