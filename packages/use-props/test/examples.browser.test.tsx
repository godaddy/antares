import { Button as ApplyOmitButton } from '../examples/button-with-apply-and-omit.tsx';
import { Button as ApplyButton } from '../examples/button-with-apply.tsx';
import { Button as BasicButton } from '../examples/button.tsx';
import { Nested } from '../examples/nested.tsx';
import { Memo } from '../examples/memo.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/use-props examples', function bento() {
  describe('Basic Button', function button() {
    it('should render a button without a className', function test() {
      const { container } = render(<BasicButton>Click this button</BasicButton>);
      const result = container.innerHTML;

      assume(result).includes('button');
      assume(result).includes('Click this button');
      assume(result).does.not.includes('class="xyz-hashed-class"');
    });

    it('can be rendered as an anchor with className', function test() {
      const { container } = render(
        <BasicButton href="foo.bar" as="a">
          Click this link
        </BasicButton>
      );
      const result = container.innerHTML;

      assume(result).does.not.includes('button');
      assume(result).startsWith('<a');
      assume(result).endsWith('</a>');
      assume(result).includes('href="foo.bar"');
      assume(result).includes('Click this link');
      assume(result).includes('class="xyz-hashed-class"');
    });
  });

  describe('Apply Button', function applyButton() {
    it('should render a button with applied className', function test() {
      const { container } = render(<ApplyButton>Click this button</ApplyButton>);
      const result = container.innerHTML;

      assume(result).includes('button');
      assume(result).includes('Click this button');
      assume(result).includes('class="xyz-hashed-class"');
    });

    it('should handle additional props correctly', function test() {
      const { container } = render(
        <ApplyButton data-testid="test" disabled>
          Click this button
        </ApplyButton>
      );
      const result = container.innerHTML;

      assume(result).includes('button');
      assume(result).includes('data-testid="test"');
      assume(result).includes('disabled');
      assume(result).includes('class="xyz-hashed-class"');
    });
  });

  describe('Apply and Omit Button', function applyOmitButton() {
    it('should render a button with applied className and omitted props', function test() {
      const { container } = render(<ApplyOmitButton>Click this button</ApplyOmitButton>);
      const result = container.innerHTML;

      assume(result).includes('button');
      assume(result).includes('Click this button');
      assume(result).includes('class="xyz-hashed-class"');
    });

    it('should handle props correctly', function test() {
      const { container } = render(
        <ApplyOmitButton data-testid="test" as="a" href="test.com">
          Click this link
        </ApplyOmitButton>
      );
      const result = container.innerHTML;

      assume(result).includes('button');
      assume(result).includes('data-testid="test"');
      assume(result).includes('href="test.com"');
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
