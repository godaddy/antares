import { ScrollLock, useScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Environment } from '@bento/environment';
import { Box, defaults } from '@bento/box';
import { render } from 'vitest-browser-react';
import { describe, it, afterEach } from 'vitest';
import React, { useState, useEffect } from 'react';
import assume from 'assume';

describe('@bento/scroll-lock', function bento() {
  describe('ScrollLock Component', function scrollLockTests() {
    afterEach(function cleanup() {
      // Clean up data attributes from body
      document.body.removeAttribute('data-scroll-locked');
    });

    it('applies data-scroll-locked attribute to body when mounted', async function appliesDataAttribute() {
      await render(<ScrollLock />);

      const attribute = document.body.getAttribute('data-scroll-locked');
      assume(attribute).equals('true');
    });

    it('removes data-scroll-locked attribute from body when unmounted', async function removesDataAttribute() {
      const { unmount } = await render(<ScrollLock />);

      // Verify attribute is present
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      unmount();

      // Verify attribute is removed
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });

    it('does not apply data-scroll-locked when isDisabled is true', async function respectsIsDisabled() {
      await render(<ScrollLock isDisabled={true} />);

      const attribute = document.body.getAttribute('data-scroll-locked');
      // When isDisabled is true, the attribute should not be set (null)
      assume(attribute).equals(null);
    });

    it('renders children if provided', async function rendersChildren() {
      await render(
        <ScrollLock>
          <Container data-testid="scroll-lock-child">Child content</Container>
        </ScrollLock>
      );

      const child = document.querySelector('[data-testid="scroll-lock-child"]');
      assume(child).is.not.equal(null);
      assume(child?.textContent).equals('Child content');
    });

    it('renders null when no children provided', async function rendersNullWithoutChildren() {
      const { container } = await render(<ScrollLock />);

      // ScrollLock should not render any DOM elements
      assume(container.childNodes.length).equals(0);
    });

    it('updates data attribute when isDisabled changes', async function updatesOnDisabledChange() {
      function TestComponent({ disabled }: { disabled: boolean }) {
        return <ScrollLock isDisabled={disabled} />;
      }

      const { rerender } = await render(<TestComponent disabled={false} />);

      // Initially enabled
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      // Re-render with disabled
      await rerender(<TestComponent disabled={true} />);

      // Should now not have the attribute (null)
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });

    it('handles null children', async function handlesNullChildren() {
      const { container } = await render(<ScrollLock>{null}</ScrollLock>);

      assume(container.childNodes.length).equals(0);
      // Scroll lock should still be applied
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');
    });

    it('handles undefined children', async function handlesUndefinedChildren() {
      const { container } = await render(<ScrollLock>{undefined}</ScrollLock>);

      assume(container.childNodes.length).equals(0);
      // Scroll lock should still be applied
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');
    });
  });

  describe('useScrollLock Hook', function useScrollLockTests() {
    afterEach(function cleanup() {
      document.body.removeAttribute('data-scroll-locked');
    });

    it('applies data-scroll-locked when called', async function appliesDataAttribute() {
      function TestComponent() {
        useScrollLock();
        return <div>Test</div>;
      }

      await render(<TestComponent />);

      assume(document.body.getAttribute('data-scroll-locked')).equals('true');
    });

    it('respects isDisabled option', async function respectsIsDisabled() {
      function TestComponent() {
        useScrollLock({ isDisabled: true });
        return <div>Test</div>;
      }

      await render(<TestComponent />);

      // When disabled, attribute should not be set
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });

    it('cleans up on unmount', async function cleansUpOnUnmount() {
      function TestComponent() {
        useScrollLock();
        return <div>Test</div>;
      }

      const { unmount } = await render(<TestComponent />);

      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      unmount();

      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });

    it('handles multiple instances', async function handlesMultipleInstances() {
      function TestComponent() {
        useScrollLock();
        return <div>First</div>;
      }

      function AnotherComponent() {
        useScrollLock();
        return <div>Second</div>;
      }

      await render(
        <>
          <TestComponent />
          <AnotherComponent />
        </>
      );

      // Both should apply scroll lock
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');
    });
  });

  describe('Integration', function integrationTests() {
    afterEach(function cleanup() {
      document.body.removeAttribute('data-scroll-locked');
    });

    it('works with conditional rendering', async function testConditionalRendering() {
      function TestComponent({ show }: { show: boolean }) {
        return <>{show && <ScrollLock />}</>;
      }

      const { rerender } = await render(<TestComponent show={false} />);

      // Initially no scroll lock
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);

      // Show scroll lock
      await rerender(<TestComponent show={true} />);

      // Should now have scroll lock
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');
    });

    it('works with Portal integration', async function testPortalIntegration() {
      function ModalWithScrollLock() {
        const [mounted, setMounted] = useState(false);

        useEffect(function mount() {
          setMounted(true);
        }, []);

        return (
          <>
            <ScrollLock isDisabled={!mounted} />
            <Container data-testid="modal-content">Modal</Container>
          </>
        );
      }

      await render(<ModalWithScrollLock />);

      // After mounting, scroll should be locked
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      const modal = document.querySelector('[data-testid="modal-content"]');
      assume(modal).is.not.equal(null);
    });
  });

  describe('Environment Integration', function environmentTests() {
    afterEach(function cleanup() {
      document.body.removeAttribute('data-scroll-locked');
    });

    it('applies data attributes to custom environment document body', async function appliesAttributesToCustomEnv() {
      // Create a mock document body
      const mockBody = document.createElement('div');
      mockBody.setAttribute('data-testid', 'mock-body');
      document.body.appendChild(mockBody);

      const mockDoc = {
        body: mockBody,
        nodeType: 9
      } as unknown as Document;

      await render(
        <Environment document={() => mockDoc}>
          <ScrollLock />
          <Container data-testid="content">Content with scroll lock</Container>
        </Environment>
      );

      // Should apply data attributes to the custom body, not the real document.body
      assume(mockBody.getAttribute('data-scroll-locked')).equals('true');

      // Real document.body should NOT have the attribute
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);

      // Cleanup
      document.body.removeChild(mockBody);
    });

    it('removes attributes from custom environment on unmount', async function removesAttributesOnUnmount() {
      const customBody = document.createElement('div');
      customBody.setAttribute('data-testid', 'custom-body');
      document.body.appendChild(customBody);

      const customDoc = {
        body: customBody,
        nodeType: 9
      } as unknown as Document;

      function TestComponent({ show }: { show: boolean }) {
        return (
          <Environment document={() => customDoc}>
            {show && <ScrollLock />}
            <Container data-testid="content">Content</Container>
          </Environment>
        );
      }

      const { rerender } = await render(<TestComponent show={true} />);

      // Should have attribute
      assume(customBody.getAttribute('data-scroll-locked')).equals('true');

      // Unmount
      await rerender(<TestComponent show={false} />);

      // Should remove attribute
      assume(customBody.getAttribute('data-scroll-locked')).equals(null);

      // Cleanup
      document.body.removeChild(customBody);
    });

    it('useScrollLock hook works with custom environment', async function hookWorksWithCustomEnv() {
      const customBody = document.createElement('div');
      customBody.setAttribute('data-testid', 'hook-custom-body');
      document.body.appendChild(customBody);

      const customDoc = {
        body: customBody,
        nodeType: 9
      } as unknown as Document;

      function TestComponent() {
        useScrollLock({ isDisabled: false });
        return <Container data-testid="hook-content">Hook test</Container>;
      }

      await render(
        <Environment document={() => customDoc}>
          <TestComponent />
        </Environment>
      );

      // Should apply to custom body
      assume(customBody.getAttribute('data-scroll-locked')).equals('true');

      // Should not apply to real body
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);

      // Cleanup
      document.body.removeChild(customBody);
    });

    it('does not crash when env.document() returns null (SSR/no-document)', async function handlesNullDocument() {
      const ctx = defaults();
      const nullDocCtx = {
        ...ctx,
        env: {
          ...ctx.env,
          document: () => null as unknown as Document
        }
      };

      function TestComponent() {
        useScrollLock({ isDisabled: false });
        return <div data-testid="null-doc-child">Still renders</div>;
      }

      const { container } = await render(
        <Box.Provider value={nullDocCtx}>
          <TestComponent />
        </Box.Provider>
      );

      const child = container.querySelector('[data-testid="null-doc-child"]');
      assume(child).is.not.equal(null);
      assume(child?.textContent).equals('Still renders');
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });

    it('handles multiple environments independently', async function handlesMultipleEnvironments() {
      const body1 = document.createElement('div');
      body1.setAttribute('data-testid', 'body-1');
      const body2 = document.createElement('div');
      body2.setAttribute('data-testid', 'body-2');

      document.body.appendChild(body1);
      document.body.appendChild(body2);

      const doc1 = { body: body1, nodeType: 9 } as unknown as Document;
      const doc2 = { body: body2, nodeType: 9 } as unknown as Document;

      await render(
        <>
          <Environment document={() => doc1}>
            <ScrollLock />
          </Environment>
          <Environment document={() => doc2}>
            <ScrollLock isDisabled={true} />
          </Environment>
        </>
      );

      // First environment should have scroll lock
      assume(body1.getAttribute('data-scroll-locked')).equals('true');

      // Second environment should NOT have scroll lock (isDisabled)
      assume(body2.getAttribute('data-scroll-locked')).equals(null);

      // Real document.body should not be affected
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);

      // Cleanup
      document.body.removeChild(body1);
      document.body.removeChild(body2);
    });
  });
});
