import { HeadingContext } from 'react-aria-components';
import { Heading, TextLockup } from '@godaddy/antares';

/**
 * Fixture for slot ownership. The lockup provides its own `title` slot rather than merging an
 * outer one, so the surrounding `level: 5` never reaches the heading. Uses RAC's context
 * directly as it stands in for any container.
 * @ignore
 */
export function SlotOwnershipExample() {
  return (
    <HeadingContext.Provider value={{ slots: { title: { level: 5 } } }}>
      <TextLockup>
        <Heading slot="title">Text Lockup</Heading>
      </TextLockup>
    </HeadingContext.Provider>
  );
}
