import { Button } from '../examples/button.tsx';
import { Nested } from '../examples/nested.tsx';
import { render } from 'vitest-browser-react';
import { Memo } from '../examples/memo.tsx';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/use-render-props examples', function bento() {
  describe('Button', function button() {
    it('should render a button without a className', function test() {
      const { container } = render(<Button>Click this button</Button>);
      const result = container.innerHTML;

      assume(result).includes('button');
      assume(result).includes('Click this button');
      assume(result).does.not.includes('class="xyz-hashed-class"');
    });

    it('can be rendered as an anchor with className', function test() {
      const { container } = render(
        <Button href="foo.bar" as="a">
          Click this link
        </Button>
      );
      const result = container.innerHTML;

      assume(result).does.not.includes('button');
      assume(result).includes('<a href="foo.bar"');
      assume(result).includes('Click this link');
      assume(result).includes('class="xyz-hashed-class"');
    });
  });

  describe('Memo', function memo() {
    it('should render a memoized button', function test() {
      const { container } = render(<Memo className="my-class" />);
      const result = container.innerHTML;

      assume(result).includes('href="https://example.com" target="_blank"');
      assume(result).includes('This button has a different class Name');
      assume(result).includes('class="xyz-hashed-class my-className my-class"');
      assume(result).includes('data-override="className"');
    });
  });

  describe('Nested', function nested() {
    it('renders the changes from a slot assignment', function test() {
      const { container } = render(
        <Nested
          slots={{
            'example-container.button': {
              as: 'a',
              children: 'Click Me',
              href: 'https://example.com',
              className: function className({ original }: { original: string }) {
                return [original, 'button'].filter(Boolean).join(' ');
              }
            }
          }}
        />
      );

      const result = container.innerHTML;
      assume(result).includes('Click Me</a>');
      assume(result).includes('href="https://example.com"');
      assume(result).includes('class="xyz-hashed-class button"');
    });
  });
});
