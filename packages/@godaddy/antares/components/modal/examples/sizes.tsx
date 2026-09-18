import {
  Button,
  ButtonGroup,
  CloseButton,
  Content,
  Heading,
  Modal,
  ModalTrigger,
  SizeProvider,
  Text,
  TextLockup
} from '@godaddy/antares';

/** Modal resets to medium, even when opened from a small interface scope. */
export function SizesExample() {
  return (
    <SizeProvider size="sm">
      {([undefined, 'sm', 'lg'] as const).map((size) => (
        <ModalTrigger key={size ?? 'default'}>
          <Button>Open {size ?? 'default'} modal</Button>
          <Modal size={size}>
            <Heading slot="title">{size ?? 'default'} modal</Heading>
            <CloseButton />
            <Content>
              Bare body text.
              <div data-plain="">Ordinary wrapper</div>
              <Text>Explicit body text</Text>
              <Button>Body action</Button>
              <TextLockup size="xl">
                <Heading level={3}>Unslotted heading</Heading>
                <Heading slot="title">Nested title</Heading>
                <Text slot="body">Nested body</Text>
              </TextLockup>
              <Content padding="2xl" data-explicit-spacing="">
                Explicit spacing
              </Content>
            </Content>
            <ButtonGroup>
              <Button slot="close">Done</Button>
            </ButtonGroup>
          </Modal>
        </ModalTrigger>
      ))}
    </SizeProvider>
  );
}
