import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { BasicExample } from '../examples/basic.tsx';
import { AlreadyWrapped } from '../examples/already-wrapped.tsx';
import { NoRef } from '../examples/no-ref.tsx';
import { RestParams } from '../examples/rest-params.tsx';

describe('@bento/forward examples', function bento() {
  describe('BasicExample', function basic() {
    it('renders correctly', function rendersBasic() {
      const { container } = render(
        <BasicExample className="test-class">
          Test Content
        </BasicExample>
      );

      const result = container.innerHTML;
      assume(result).includes('Test Content');
      assume(result).includes('test-class');
    });

    it('forwards refs correctly', function forwardsRef() {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <BasicExample ref={ref}>
          Test
        </BasicExample>
      );

      assume(ref.current).is.not.null();
      assume(ref.current).exist();
      assume(ref.current?.textContent).equals('Test');
    });
  });

  describe('AlreadyWrapped', function wrapped() {
    it('renders correctly', function rendersWrapped() {
      const { container } = render(
        <AlreadyWrapped>
          Wrapped Content
        </AlreadyWrapped>
      );

      const result = container.innerHTML;
      assume(result).includes('Wrapped Content');
    });

    it('forwards refs correctly', function forwardsRef() {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <AlreadyWrapped ref={ref}>
          Test
        </AlreadyWrapped>
      );

      assume(ref.current).is.not.null();
      assume(ref.current).exist();
      assume(ref.current?.textContent).equals('Test');
    });
  });

  describe('NoRef', function noref() {
    it('renders correctly', function rendersNoRef() {
      const { container } = render(
        <NoRef>
          No Ref Content
        </NoRef>
      );

      const result = container.innerHTML;
      assume(result).includes('No Ref Content');
    });
  });

  describe('RestParams', function restparams() {
    it('renders correctly', function rendersRestParams() {
      const { container } = render(
        <RestParams className="rest-class">
          Rest Params Content
        </RestParams>
      );

      const result = container.innerHTML;
      assume(result).includes('Rest Params Content');
      assume(result).includes('rest-class');
    });

    it('forwards refs correctly', function forwardsRef() {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <RestParams ref={ref}>
          Test
        </RestParams>
      );

      assume(ref.current).is.not.null();
      assume(ref.current).exist();
      assume(ref.current?.textContent).equals('Test');
    });
  });
});
