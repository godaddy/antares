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

    it('renders empty div when no children provided', function rendersEmptyDiv() {
      const { container } = render(<Container />);
      const element = container.firstChild as HTMLElement;

      expect(element?.nodeName).toBe('DIV');
      expect(element?.childNodes.length).toBe(0);
    });

    it('renders empty div when children is null', function rendersEmptyDivWithNullChildren() {
      const { container } = render(<Container>{null}</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element?.nodeName).toBe('DIV');
      expect(element?.childNodes.length).toBe(0);
    });

    it('renders empty div when children is undefined', function rendersEmptyDivWithUndefinedChildren() {
      const { container } = render(<Container>{undefined}</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element?.nodeName).toBe('DIV');
      expect(element?.childNodes.length).toBe(0);
    });

    it('renders empty element with styles for presentational use cases', function rendersEmptyWithStyles() {
      const { container } = render(<Container style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />);
      const element = container.firstChild as HTMLElement;

      expect(element?.nodeName).toBe('DIV');
      expect(element?.childNodes.length).toBe(0);
      expect(element?.style.width).toBe('100px');
      expect(element?.style.height).toBe('100px');
      expect(element?.style.backgroundColor).toBe('red');
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

    it('changes the as prop of a nested child via slots system', function slotsChangeAsProp() {
      // Parent container passes slots to nested child
      const { container } = render(
        <Container slots={{ inner: { as: 'section' } }} data-testid="outer">
          {/* We assign as="article" to verify that slot overrides are correctly applied */}
          <Container slot="inner" as="article" data-testid="inner">
            Inner content
          </Container>
        </Container>
      );

      const outer = container.querySelector('[data-testid="outer"]') as HTMLElement;
      const inner = container.querySelector('[data-testid="inner"]') as HTMLElement;

      // Outer should be default div
      expect(outer?.nodeName).toBe('DIV');

      // Inner should be section (changed via slots)
      expect(inner?.nodeName).toBe('SECTION');
      expect(inner?.textContent).toBe('Inner content');
    });

    it('forwards refs provided by the consumer and slot to the DOM element', async function forwardsMergedRefs() {
      const forwardedRef = React.createRef<HTMLDivElement>();
      const slotRef = React.createRef<HTMLDivElement>();

      render(
        <Container slots={{ trigger: { ref: slotRef } }}>
          <Container slot="trigger" ref={forwardedRef}>
            Ref content
          </Container>
        </Container>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      assume(slotRef.current).exist();
      assume(forwardedRef.current).exist();
      assume(forwardedRef.current).equals(slotRef.current);
      assume(forwardedRef.current?.textContent).equals('Ref content');
    });
  });
});
