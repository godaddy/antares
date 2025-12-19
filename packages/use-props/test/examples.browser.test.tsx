import { Button as ApplyOmitButton } from '../examples/button-with-apply-and-omit.tsx';
import { Button as ApplyButton } from '../examples/button-with-apply.tsx';
import { Button as BasicButton } from '../examples/button.tsx';
import { Nested } from '../examples/nested.tsx';
import { Memo } from '../examples/memo.tsx';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('@bento/use-props examples', function bento() {
  describe('Basic Button', function button() {
    it('should render a button without a className', function test() {
      const { container } = render(<BasicButton>Click this button</BasicButton>);
      expect(container.innerHTML).toMatchSnapshot();
    });

    it('can be rendered as an anchor with className', function test() {
      const { container } = render(
        <BasicButton href="foo.bar" as="a">
          Click this link
        </BasicButton>
      );
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('Apply Button', function applyButton() {
    it('should render a button with applied className', function test() {
      const { container } = render(<ApplyButton>Click this button</ApplyButton>);
      expect(container.innerHTML).toMatchSnapshot();
    });

    it('should handle additional props correctly', function test() {
      const { container } = render(
        <ApplyButton data-testid="test" disabled>
          Click this button
        </ApplyButton>
      );
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('Apply and Omit Button', function applyOmitButton() {
    it('should render a button with applied className and omitted props', function test() {
      const { container } = render(<ApplyOmitButton>Click this button</ApplyOmitButton>);
      expect(container.innerHTML).toMatchSnapshot();
    });

    it('should handle props correctly', function test() {
      const { container } = render(
        <ApplyOmitButton data-testid="test" as="a" href="test.com">
          Click this link
        </ApplyOmitButton>
      );
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('Memo', function memo() {
    it('should render a memoized button', function test() {
      const { container } = render(<Memo className="my-class" />);
      expect(container.innerHTML).toMatchSnapshot();
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
      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
