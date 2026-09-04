import { Heading, Text, TextLockup } from '@godaddy/antares';

/**
 * A lockup stacks an optional eyebrow, a title and body text as one coordinated type
 * group. You supply the parts, so the title can be any heading level and the body any
 * number of paragraphs; `size` sets the tier for all of them at once.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextLockup>
      <Text slot="eyebrow">Unaffectedly Modest</Text>
      <Heading slot="title">Text Lockup</Heading>
      <Text slot="body">
        She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.
      </Text>
    </TextLockup>
  );
}
