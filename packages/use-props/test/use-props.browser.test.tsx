import { useProps } from '../src/index.ts';
import { withSlots } from '@bento/slots';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/use-props', function suite() {
  describe('ref forwarding', function refForwarding() {
    it('receives the ref as ref, prop, and apply calls', async function refs() {
      const testRef = React.createRef<HTMLDivElement>();

      const TestComponent = withSlots(
        'RefForwardTest',
        function Component(args: any, fwd: React.ForwardedRef<HTMLDivElement>) {
          const { apply, ref, props } = useProps(args, {}, fwd);

          assume(ref).equals(testRef);
          assume(props.ref).equals(testRef);
          assume((apply() as any).ref).equals(testRef);

          const merged = apply({}, ['ref']);
          assume((merged as any).ref).is.a('undefined');

          return <div {...apply()}>Test Content</div>;
        }
      );

      render(<TestComponent ref={testRef}>Test Content</TestComponent>);
      assume(testRef.current?.textContent).equals('Test Content');
    });

    it('supports useProps(rest) with rest=[args, ref]', async function restWithRef() {
      const testRef = React.createRef<HTMLDivElement>();

      const TestComponent = withSlots('RestTwoParamsTest', function Component(...rest: any[]) {
        const { apply } = useProps(rest, { state: 'exists' });
        return <div {...apply()}>Test Content</div>;
      });

      render(<TestComponent ref={testRef}>Test Content</TestComponent>);
      assume(testRef.current?.textContent).equals('Test Content');
    });

    it('overrides the ref when a slot overrides the ref', async function slotted() {
      const testRef = React.createRef<HTMLDivElement>();
      const slotRef = React.createRef<HTMLDivElement>();

      const TestComponent = withSlots('SlottedTest', function Component(...rest: any[]) {
        const { apply } = useProps(rest, { state: 'exists' });
        return <div {...apply()} />;
      });

      render(
        <TestComponent slots={{ content: { ref: slotRef } }}>
          <TestComponent ref={testRef} slot="content">
            Test Content
          </TestComponent>
        </TestComponent>
      );

      assume(testRef.current?.textContent).equals('Test Content');
      assume(slotRef.current?.textContent).equals('Test Content');
    });

    it('does not attempt to merge refs when the slot is a function', async function slotFunction() {
      const testRef = React.createRef<HTMLDivElement>();

      const TestComponent = withSlots('SlottedTest', function Component(...rest: any[]) {
        const { apply } = useProps(rest, { state: 'exists' });
        return <div {...apply()} />;
      });

      const { container } = render(
        <TestComponent
          data-testid="outer-component"
          slots={{
            content: function slotFn({ props }: { props: Record<string, any> }) {
              return <div {...props}>Sike! Different content!</div>;
            }
          }}
        >
          <TestComponent ref={testRef} slot="content" data-testid="inner-component">
            Test Content
          </TestComponent>
        </TestComponent>
      );

      const html = container.innerHTML;

      assume(html).equals(
        '<div data-testid="outer-component"><div data-testid="inner-component" data-slot="content">Sike! Different content!</div></div>'
      );
      assume(testRef.current?.textContent).equals('Sike! Different content!');
    });
  });
});
