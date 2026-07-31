import { CloseButton, Flex } from '@godaddy/antares';

/**
 * `CloseButton` is a Button preset for dismissing an overlay. With no children it renders an
 * `x` icon with `aria-label="Close"`; pass children for a labelled button such as "Cancel".
 * Both default to `slot="close"`, so inside a `Modal` they close it with no extra wiring.
 */
export function CloseButtonExample() {
  return (
    <Flex gap="md" alignItems="center">
      <CloseButton />
      <CloseButton variant="secondary">Cancel</CloseButton>
    </Flex>
  );
}
