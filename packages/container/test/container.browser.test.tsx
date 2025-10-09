import { Container } from '@bento/container';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import assume from 'assume';

describe('@bento/container', function bento() {
  describe('Container', function containerTests() {
    it('renders as div by default', function rendersAsDiv() {
      const { container } = render(<Container>Hello World</Container>);
      const result = container.innerHTML;

      assume(result).match(/^<div[^>]*>Hello World<\/div>$/);
    });

    it('renders with custom element via as prop', function rendersCustomElement() {
      const { container } = render(<Container as="article">Article content</Container>);
      const element = container.firstChild;

      expect(element?.nodeName).toBe('ARTICLE');
      expect(element?.textContent).toBe('Article content');
    });

    it('passes through className', function passesClassName() {
      const { container } = render(<Container className="custom-class">Content</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element?.className).toContain('custom-class');
    });

    it('passes through style', function passesStyle() {
      const { container } = render(<Container style={{ color: 'red', fontSize: '16px' }}>Styled</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element?.style.color).toBe('red');
      expect(element?.style.fontSize).toBe('16px');
    });

    it('passes through ARIA attributes', function passesAriaAttributes() {
      const { container } = render(
        <Container aria-label="Test label" aria-hidden="true">
          ARIA content
        </Container>
      );
      const element = container.firstChild as HTMLElement;

      expect(element?.getAttribute('aria-label')).toBe('Test label');
      expect(element?.getAttribute('aria-hidden')).toBe('true');
    });

    it('passes through event handlers', function passesEventHandlers() {
      let clicked = false;
      const handleClick = function onClick() {
        clicked = true;
      };

      const { container } = render(<Container onClick={handleClick}>Click me</Container>);
      const element = container.firstChild as HTMLElement;

      element?.click();
      expect(clicked).toBe(true);
    });

    it('returns null when no children provided', function returnsNull() {
      const { container } = render(<Container />);

      expect(container.innerHTML).toBe('');
    });

    it('returns null when children is null', function returnsNullWithNullChildren() {
      const { container } = render(<Container>{null}</Container>);

      expect(container.innerHTML).toBe('');
    });

    it('returns null when children is undefined', function returnsNullWithUndefinedChildren() {
      const { container } = render(<Container>{undefined}</Container>);

      expect(container.innerHTML).toBe('');
    });

    it('renders with multiple children', function rendersMultipleChildren() {
      const { container } = render(
        <Container>
          <span>First</span>
          <span>Second</span>
        </Container>
      );
      const element = container.firstChild as HTMLElement;

      expect(element?.children.length).toBe(2);
      expect(element?.children[0].textContent).toBe('First');
      expect(element?.children[1].textContent).toBe('Second');
    });

    it('tracks overrides via data-override attribute', function tracksOverrides() {
      const { container } = render(
        <Container className="custom" style={{ color: 'blue' }}>
          Overridden
        </Container>
      );
      const element = container.firstChild as HTMLElement;

      expect(element?.getAttribute('data-override')).toBeTruthy();
    });

    it('renders with data attributes', function rendersDataAttributes() {
      const { container } = render(
        <Container data-testid="test-container" data-custom="value">
          Data attrs
        </Container>
      );
      const element = container.firstChild as HTMLElement;

      expect(element?.getAttribute('data-testid')).toBe('test-container');
      expect(element?.getAttribute('data-custom')).toBe('value');
    });

    it('renders with id attribute', function rendersWithId() {
      const { container } = render(<Container id="my-container">With ID</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element?.id).toBe('my-container');
    });

    it('renders with role attribute', function rendersWithRole() {
      const { container } = render(<Container role="navigation">Nav content</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element?.getAttribute('role')).toBe('navigation');
    });

    it('supports polymorphic rendering with semantic HTML elements', function polymorphicSemanticElements() {
      const elements = ['header', 'main', 'footer', 'nav', 'section', 'aside'];

      elements.forEach(function checkElement(element) {
        const { container } = render(<Container as={element}>Content</Container>);
        expect(container.firstChild?.nodeName).toBe(element.toUpperCase());
      });
    });
  });
});
