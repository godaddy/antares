import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

/**
 * Label component for the slots example.
 */
const Label = withSlots('SlotsExampleNamespaceLabel', function Label(args: any) {
  const { props } = useProps(args);
  return <label {...props}>{props.children}</label>;
});

const Content = withSlots('SlotsExampleNamespaceContent', function Content(props: any) {
  return (
    <>
      <Label slot="title">title</Label>
      {props.children}
    </>
  );
});

/**
 * Example demonstrating namespace usage.
 */
export const Namespace = withSlots('SlotsExampleNamespace', function Namespace() {
  return (
    <Content slots={{ title: { className: 'title-1' } }}>
      <Content slot="content" slots={{ title: { className: 'description-1' } }} />
    </Content>
  );
});

/**
 * Example demonstrating namespace usage with slot names.
 */
export const NamespaceWithSlotNames = withSlots(
  'SlotsExampleNamespaceWithSlotNames',
  function NamespaceWithSlotNames() {
    return (
      <Content slot="content" slots={{ title: { className: 'title-2' } }}>
        <Content slot="description" slots={{ title: { className: 'description-2' } }} />
      </Content>
    );
  }
);

/**
 * Example demonstrating namespace usage with replacements.
 */
export const NamespaceWithReplacements = withSlots(
  'SlotsExampleNamespaceWithReplacements',
  function NamespaceWithReplacements() {
    return (
      <NamespaceWithSlotNames
        slots={{
          'content.title': { className: 'title-3' },
          'content.description.title': { className: 'description-3' }
        }}
      />
    );
  }
);

/**
 * A container component for root-level inheritance example.
 */
const Container = withSlots('SlotsExampleNamespaceContainer', function Container(args: any) {
  const { props } = useProps(args);
  return <div {...props}>{props.children}</div>;
});

/**
 * Example demonstrating root-level slot inheritance.
 * Container passes a 'title' slot, and Content (which has no slot name)
 * should inherit it for its internal Label component with slot="title".
 */
export const NamespaceRootLevelInheritance = withSlots(
  'SlotsExampleNamespaceRootLevelInheritance',
  function NamespaceRootLevelInheritance() {
    return (
      <Container slots={{ title: { className: 'inherited-title' } }}>
        <Content>Content</Content>
      </Container>
    );
  }
);
