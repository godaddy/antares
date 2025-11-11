import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { render } from 'vitest-browser-react';
import { describe, it, beforeEach, afterEach } from 'vitest';
import React from 'react';
import assume from 'assume';

describe('@bento/portal', function bento() {
  describe('Portal', function portalTests() {
    let container: HTMLElement;

    beforeEach(function setup() {
      container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
    });

    afterEach(function cleanup() {
      // Clean up test container if it exists in DOM
      const testContainer = document.getElementById('test-container');
      if (testContainer && testContainer.parentNode) {
        testContainer.parentNode.removeChild(testContainer);
      }
      // Note: Portal content is automatically cleaned up by React
    });

    it('renders children to document.body when mounted is true', function rendersToBody() {
      render(
        <Portal mounted={true}>
          <Container data-testid="portal-content">Portal content</Container>
        </Portal>
      );

      const portalContent = document.body.querySelector('[data-testid="portal-content"]');
      assume(portalContent).is.not.equal(null);
      assume(portalContent?.textContent).equals('Portal content');

      // Verify data attributes are applied
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');
    });

    it('does not render when mounted is false', function doesNotRenderWhenNotMounted() {
      render(
        <Portal mounted={false}>
          <Container>Should not render</Container>
        </Portal>
      );

      const portalContent = document.body.querySelector('[data-portal="true"]');
      assume(portalContent).equals(null);
    });

    it('renders to custom container when provided', function rendersToCustomContainer() {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-portal-container';
      document.body.appendChild(customContainer);

      render(
        <Portal container={customContainer} mounted={true}>
          <Container data-testid="custom-content">Custom container content</Container>
        </Portal>
      );

      const content = customContainer.querySelector('[data-testid="custom-content"]');
      assume(content).is.not.equal(null);
      assume(content?.textContent).equals('Custom container content');

      // Verify data attributes are applied even with custom container
      assume(content?.getAttribute('data-portal')).equals('true');
      assume(content?.getAttribute('data-mounted')).equals('true');

      // Cleanup
      document.body.removeChild(customContainer);
    });

    it('applies data-portal attribute to portal content', function appliesDataPortal() {
      render(
        <Portal mounted={true}>
          <Container data-testid="portal-content">Content</Container>
        </Portal>
      );

      const portalContent = document.body.querySelector('[data-testid="portal-content"]');
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');
    });

    it('handles null children', function handlesNullChildren() {
      render(<Portal mounted={true}>{null}</Portal>);

      const portalContent = document.body.querySelector('[data-portal="true"]');
      assume(portalContent).equals(null);
    });

    it('handles undefined children', function handlesUndefinedChildren() {
      render(<Portal mounted={true}>{undefined}</Portal>);

      const portalContent = document.body.querySelector('[data-portal="true"]');
      assume(portalContent).equals(null);
    });

    it('renders multiple children', function rendersMultipleChildren() {
      render(
        <Portal mounted={true}>
          <Container data-testid="first">First</Container>
          <Container data-testid="second">Second</Container>
        </Portal>
      );

      const first = document.body.querySelector('[data-testid="first"]');
      const second = document.body.querySelector('[data-testid="second"]');
      assume(first).is.not.equal(null);
      assume(second).is.not.equal(null);
      assume(first?.textContent).equals('First');
      assume(second?.textContent).equals('Second');

      // Verify data attributes are applied to all children
      assume(first?.getAttribute('data-portal')).equals('true');
      assume(first?.getAttribute('data-mounted')).equals('true');
      assume(second?.getAttribute('data-portal')).equals('true');
      assume(second?.getAttribute('data-mounted')).equals('true');
    });

    it('supports render prop children', function supportsRenderProp() {
      render(
        <Portal mounted={true}>
          {({ props }) => <Container data-testid="render-prop-content">Mounted: {String(props.mounted)}</Container>}
        </Portal>
      );

      const content = document.body.querySelector('[data-testid="render-prop-content"]');
      assume(content).is.not.equal(null);
      assume(content?.textContent).includes('Mounted: true');

      // Verify data attributes are applied with render props
      assume(content?.getAttribute('data-portal')).equals('true');
      assume(content?.getAttribute('data-mounted')).equals('true');
    });

    it('supports mounting after initial render', function supportsDelayedMount() {
      // Test that portal correctly handles mounted prop changing from false to true
      function TestComponent() {
        const [mounted, setMounted] = React.useState(false);

        // Mount on first render
        React.useEffect(function mount() {
          setMounted(true);
        }, []);

        return (
          <Portal mounted={mounted}>
            <Container data-testid="delayed-content">Delayed content</Container>
          </Portal>
        );
      }

      render(<TestComponent />);

      // After React processes the effect, content should be rendered
      const portalContent = document.body.querySelector('[data-testid="delayed-content"]');
      assume(portalContent).is.not.equal(null);
      assume(portalContent?.textContent).equals('Delayed content');

      // Verify data attributes are applied after delayed mount
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');
    });

    it('handles text children', function handlesTextChildren() {
      render(
        <Portal mounted={true}>
          <div data-testid="text-container">Hello world</div>
        </Portal>
      );

      const content = document.body.querySelector('[data-testid="text-container"]');
      assume(content).is.not.equal(null);
      assume(content?.textContent).equals('Hello world');

      // Verify data attributes are applied even with text children
      assume(content?.getAttribute('data-portal')).equals('true');
      assume(content?.getAttribute('data-mounted')).equals('true');
    });

    it('handles mixed element and text children', function handlesMixedChildren() {
      render(
        <Portal mounted={true}>
          <Container data-testid="mixed-first">Element</Container>
          Raw text node
          <Container data-testid="mixed-second">Another element</Container>
        </Portal>
      );

      const first = document.body.querySelector('[data-testid="mixed-first"]');
      const second = document.body.querySelector('[data-testid="mixed-second"]');

      // Elements should have data attributes
      assume(first).is.not.equal(null);
      assume(first?.getAttribute('data-portal')).equals('true');
      assume(second).is.not.equal(null);
      assume(second?.getAttribute('data-portal')).equals('true');
    });
  });
});
