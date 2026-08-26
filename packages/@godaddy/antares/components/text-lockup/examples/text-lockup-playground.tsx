import { Heading, Tag, Text, TextLockup, type TextLockupProps } from '@godaddy/antares';

interface PlaygroundExampleProps extends TextLockupProps {
  /** Render the eyebrow as a `Tag` rather than plain text. */
  tagEyebrow?: boolean;
}

/** @ignore */
export function PlaygroundExample(props: PlaygroundExampleProps) {
  const { tagEyebrow = false, ...rest } = props;

  return (
    <TextLockup {...rest}>
      {tagEyebrow ? <Tag slot="eyebrow">New</Tag> : <Text slot="eyebrow">Unaffectedly Modest</Text>}
      <Heading>Text Lockup</Heading>
      <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
    </TextLockup>
  );
}
