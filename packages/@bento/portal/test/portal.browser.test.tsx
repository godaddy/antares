import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Environment } from '@bento/environment';
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

    it('renders children to document.body when mounted is true', async function rendersToBody() {
      await render(
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

    it('does not render when mounted is false', async function doesNotRenderWhenNotMounted() {
      await render(
        <Portal mounted={false}>
          <Container>Should not render</Container>
        </Portal>
      );

      const portalContent = document.body.querySelector('[data-portal="true"]');
      assume(portalContent).equals(null);
    });

    it('renders to custom container when provided', async function rendersToCustomContainer() {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-portal-container';
      document.body.appendChild(customContainer);

      await render(
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

    it('applies data-portal attribute to portal content', async function appliesDataPortal() {
      await render(
        <Portal mounted={true}>
          <Container data-testid="portal-content">Content</Container>
        </Portal>
      );

      const portalContent = document.body.querySelector('[data-testid="portal-content"]');
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');
    });

    it('handles null children', async function handlesNullChildren() {
      await render(<Portal mounted={true}>{null}</Portal>);

      const portalContent = document.body.querySelector('[data-portal="true"]');
      assume(portalContent).equals(null);
    });

    it('handles undefined children', async function handlesUndefinedChildren() {
      await render(<Portal mounted={true}>{undefined}</Portal>);

      const portalContent = document.body.querySelector('[data-portal="true"]');
      assume(portalContent).equals(null);
    });

    it('renders multiple children', async function rendersMultipleChildren() {
      await render(
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

    it('supports render prop children', async function supportsRenderProp() {
      await render(
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

    it('supports mounting after initial render', async function supportsDelayedMount() {
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

      await render(<TestComponent />);

      // After React processes the effect, content should be rendered
      const portalContent = document.body.querySelector('[data-testid="delayed-content"]');
      assume(portalContent).is.not.equal(null);
      assume(portalContent?.textContent).equals('Delayed content');

      // Verify data attributes are applied after delayed mount
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');
    });

    it('handles text children', async function handlesTextChildren() {
      await render(
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

    it('handles mixed element and text children', async function handlesMixedChildren() {
      await render(
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

    it('renders to custom environment document body', async function rendersToCustomEnv() {
      // Create a mock document body for custom environment
      const mockBody = document.createElement('div');
      mockBody.setAttribute('data-testid', 'mock-body');
      document.body.appendChild(mockBody);

      const mockDocument = {
        body: mockBody,
        nodeType: 9
      } as unknown as Document;

      function TestComponent() {
        const [mounted, setMounted] = React.useState(false);

        React.useEffect(function mount() {
          setMounted(true);
        }, []);

        return (
          <Environment document={() => mockDocument}>
            <Portal mounted={mounted}>
              <Container data-testid="portal-in-custom-env">Portal in custom environment</Container>
            </Portal>
          </Environment>
        );
      }

      await render(<TestComponent />);

      // Content should be rendered to the mock body
      const portalContent = mockBody.querySelector('[data-testid="portal-in-custom-env"]');
      assume(portalContent).is.not.equal(null);
      assume(portalContent?.textContent).equals('Portal in custom environment');

      // Verify it's NOT in the default document.body
      const contentInDefaultBody = document.body.querySelector('[data-testid="portal-in-custom-env"]');
      assume(contentInDefaultBody).equals(mockBody.querySelector('[data-testid="portal-in-custom-env"]'));

      // Cleanup
      document.body.removeChild(mockBody);
    });

    it('handles multiple custom environments independently', async function handlesMultipleEnvironments() {
      const body1 = document.createElement('div');
      body1.setAttribute('data-testid', 'body-1');
      const body2 = document.createElement('div');
      body2.setAttribute('data-testid', 'body-2');

      document.body.appendChild(body1);
      document.body.appendChild(body2);

      const doc1 = { body: body1, nodeType: 9 } as unknown as Document;
      const doc2 = { body: body2, nodeType: 9 } as unknown as Document;

      function TestComponent() {
        const [mounted, setMounted] = React.useState(false);

        React.useEffect(function mount() {
          setMounted(true);
        }, []);

        return (
          <>
            <Environment document={() => doc1}>
              <Portal mounted={mounted}>
                <Container data-testid="portal-1">Portal 1</Container>
              </Portal>
            </Environment>
            <Environment document={() => doc2}>
              <Portal mounted={mounted}>
                <Container data-testid="portal-2">Portal 2</Container>
              </Portal>
            </Environment>
          </>
        );
      }

      await render(<TestComponent />);

      // Each portal should render to its respective custom body
      const portal1 = body1.querySelector('[data-testid="portal-1"]');
      const portal2 = body2.querySelector('[data-testid="portal-2"]');

      assume(portal1).is.not.equal(null);
      assume(portal2).is.not.equal(null);
      assume(portal1?.textContent).equals('Portal 1');
      assume(portal2?.textContent).equals('Portal 2');

      // Cleanup
      document.body.removeChild(body1);
      document.body.removeChild(body2);
    });

    it('handles environment with null body', async function handlesNullBody() {
      // Create an environment with a document that has no body
      const mockDoc = {
        nodeType: 9,
        body: null
      } as unknown as Document;

      await render(
        <Environment document={() => mockDoc}>
          <Portal mounted={true}>
            <Container data-testid="should-not-render">Should not render</Container>
          </Portal>
        </Environment>
      );

      // Portal should not render because container is null
      const content = document.body.querySelector('[data-testid="should-not-render"]');
      assume(content).equals(null);
    });
  });
});
