import { createRef } from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { BasicExample } from '../examples/basic.tsx';
import { AlreadyWrapped } from '../examples/already-wrapped.tsx';
import { NoRef } from '../examples/no-ref.tsx';
import { RestParams } from '../examples/rest-params.tsx';

describe('@bento/forward examples', function bento() {
  describe('BasicExample', function basic() {
    it('renders correctly', async function rendersBasic() {
      const { container } = await render(<BasicExample className="test-class">Test Content</BasicExample>);

      const result = container.innerHTML;
      assume(result).includes('Test Content');
      assume(result).includes('test-class');
    });

    it('renders and the element is accessible in the DOM', async function forwardsRef() {
      const { container } = await render(<BasicExample>Test</BasicExample>);

      const div = container.querySelector('div');
      assume(div).is.not.a('undefined');
      assume(div?.textContent).equals('Test');
    });
  });

  describe('AlreadyWrapped', function wrapped() {
    it('renders correctly', async function rendersWrapped() {
      const { container } = await render(<AlreadyWrapped>Wrapped Content</AlreadyWrapped>);

      const result = container.innerHTML;
      assume(result).includes('Wrapped Content');
    });

    it('forwards refs correctly', async function forwardsRef() {
      const ref = createRef<HTMLDivElement>();

      await render(<AlreadyWrapped ref={ref}>Test</AlreadyWrapped>);

      assume(ref.current).is.not.null();
      assume(ref.current).exist();
      assume(ref.current?.textContent).equals('Test');
    });
  });

  describe('NoRef', function noref() {
    it('renders correctly', async function rendersNoRef() {
      const { container } = await render(<NoRef>No Ref Content</NoRef>);

      const result = container.innerHTML;
      assume(result).includes('No Ref Content');
    });
  });

  describe('RestParams', function restparams() {
    it('renders correctly', async function rendersRestParams() {
      const { container } = await render(<RestParams className="rest-class">Rest Params Content</RestParams>);

      const result = container.innerHTML;
      assume(result).includes('Rest Params Content');
      assume(result).includes('rest-class');
    });

    it('renders and the element is accessible in the DOM', async function forwardsRef() {
      const { container } = await render(<RestParams>Test</RestParams>);

      const div = container.querySelector('div');
      assume(div).is.not.a('undefined');
      assume(div?.textContent).equals('Test');
    });
  });
});
