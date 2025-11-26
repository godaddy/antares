import { Overlay } from '../src/index.tsx';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import { useState } from 'react';
import assume from 'assume';
import React from 'react';

describe('@bento/overlay state management', function overlayState() {
  describe('Controlled state', function controlled() {
    it('opens when open prop changes from false to true', async function openOnPropChange() {
      function ControlledOverlay() {
        const [open, setOpen] = useState(false);

        return (
          <div>
            <button data-testid="external-trigger" onClick={() => setOpen(true)}>
              External Open
            </button>
            <Overlay open={open} onOpenChange={setOpen}>
              <Button slot="trigger" data-testid="trigger">
                Trigger
              </Button>
              <Container slot="content" data-testid="content">
                Overlay Content
              </Container>
            </Overlay>
          </div>
        );
      }

      const { container } = render(<ControlledOverlay />);
      const externalTrigger = container.querySelector('[data-testid="external-trigger"]');
      const content = container.querySelector('[data-testid="content"]');

      // Content should not be visible initially
      assume(content).to.not.exist;

      // Click external trigger to open
      externalTrigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Content should now be visible
      const updatedContent = container.querySelector('[data-testid="content"]');
      assume(updatedContent).to.exist;
    });

    it('closes when open prop changes from true to false', async function closeOnPropChange() {
      function ControlledOverlay() {
        const [open, setOpen] = useState(true);

        return (
          <div>
            <button data-testid="external-close" onClick={() => setOpen(false)}>
              External Close
            </button>
            <Overlay open={open} onOpenChange={setOpen}>
              <Button slot="trigger">Trigger</Button>
              <Container slot="content" data-testid="content">
                Overlay Content
              </Container>
            </Overlay>
          </div>
        );
      }

      const { container } = render(<ControlledOverlay />);
      const externalClose = container.querySelector('[data-testid="external-close"]');

      // Content should be visible initially
      let content = container.querySelector('[data-testid="content"]');
      assume(content).to.exist;

      // Click external close
      externalClose?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Content should now be hidden
      content = container.querySelector('[data-testid="content"]');
      assume(content).to.not.exist;
    });

    it('calls onOpenChange when trigger is clicked', async function onOpenChangeCallback() {
      let capturedOpen: boolean | undefined;

      function ControlledOverlay() {
        const [open, setOpen] = useState(false);

        function handleOpenChange(newOpen: boolean) {
          capturedOpen = newOpen;
          setOpen(newOpen);
        }

        return (
          <Overlay open={open} onOpenChange={handleOpenChange}>
            <Button slot="trigger" data-testid="trigger">
              Open
            </Button>
            <Container slot="content" data-testid="content">
              Content
            </Container>
          </Overlay>
        );
      }

      const { container } = render(<ControlledOverlay />);
      const trigger = container.querySelector('[data-testid="trigger"]') as HTMLButtonElement;

      // Click trigger using proper button click
      trigger?.click();

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // onOpenChange should have been called with true
      assume(capturedOpen).equals(true);

      // Content should be visible
      const content = container.querySelector('[data-testid="content"]');
      assume(content).to.exist;
    });
  });

  describe('Uncontrolled state', function uncontrolled() {
    it('starts closed by default', function defaultClosed() {
      function UncontrolledOverlay() {
        return (
          <Overlay>
            <Button slot="trigger">Open</Button>
            <Container slot="content" data-testid="content">
              Content
            </Container>
          </Overlay>
        );
      }

      const { container } = render(<UncontrolledOverlay />);
      const content = container.querySelector('[data-testid="content"]');

      // Content should not be visible
      assume(content).to.not.exist;
    });

    it('starts open when defaultOpen is true', function defaultOpenTrue() {
      function UncontrolledOverlay() {
        return (
          <Overlay defaultOpen={true}>
            <Button slot="trigger">Close</Button>
            <Container slot="content" data-testid="content">
              Content
            </Container>
          </Overlay>
        );
      }

      const { container } = render(<UncontrolledOverlay />);
      const content = container.querySelector('[data-testid="content"]');

      // Content should be visible
      assume(content).to.exist;
    });

    it('toggles state when trigger is clicked', async function toggleOnClick() {
      function UncontrolledOverlay() {
        return (
          <Overlay>
            <Button slot="trigger" data-testid="trigger">
              Toggle
            </Button>
            <Container slot="content" data-testid="content">
              Content
            </Container>
          </Overlay>
        );
      }

      const { container } = render(<UncontrolledOverlay />);
      const trigger = container.querySelector('[data-testid="trigger"]') as HTMLButtonElement;

      // Content should not be visible initially
      let content = container.querySelector('[data-testid="content"]');
      assume(content).to.not.exist;

      // Click trigger to open
      trigger?.click();

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Content should now be visible
      content = container.querySelector('[data-testid="content"]');
      assume(content).to.exist;

      // Click trigger again to close
      trigger?.click();

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Content should be hidden again
      content = container.querySelector('[data-testid="content"]');
      assume(content).to.not.exist;
    });
  });

  describe('Render props with state updates', function renderPropsState() {
    it('children render prop receives updated state on toggle', async function childrenStateUpdate() {
      const capturedStates: boolean[] = [];

      function StatefulOverlay() {
        function renderChildren(args: any) {
          capturedStates.push(args.state.open);
          return (
            <>
              <Button slot="trigger" data-testid="trigger">
                Toggle
              </Button>
              <Container slot="content" data-open={String(args.state.open)} data-testid="content">
                State: {args.state.open ? 'open' : 'closed'}
              </Container>
            </>
          );
        }

        return <Overlay defaultOpen={false}>{renderChildren}</Overlay>;
      }

      const { container } = render(<StatefulOverlay />);

      // Initial render - should be closed
      assume(capturedStates.length).is.above(0);
      assume(capturedStates).includes(false);

      const trigger = container.querySelector('[data-testid="trigger"]') as HTMLButtonElement;

      // Click to open
      trigger?.click();

      // Wait for state update and re-render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should have captured both false and true states
      assume(capturedStates).includes(true);

      // Verify content shows open state
      const content = container.querySelector('[data-testid="content"]');
      assume(content).to.exist;
      assume(content?.getAttribute('data-open')).equals('true');
    });
  });

  describe('Backdrop rendering', function backdropRendering() {
    it('renders empty backdrop with slot props applied', function rendersEmptyBackdrop() {
      function OverlayWithBackdrop() {
        const [open, setOpen] = useState(true);

        return (
          <Overlay open={open} onOpenChange={setOpen}>
            <Button slot="trigger">Trigger</Button>
            <Container
              slot="backdrop"
              data-testid="backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
            />
            <Container slot="content" data-testid="content">
              Content
            </Container>
          </Overlay>
        );
      }

      const { container } = render(<OverlayWithBackdrop />);

      // Backdrop should render even without children
      const backdrop = container.querySelector('[data-testid="backdrop"]') as HTMLElement;
      assume(backdrop).to.exist;
      assume(backdrop?.nodeName).equals('DIV');

      // Should have the styling applied
      assume(backdrop?.style.position).equals('fixed');
      assume(backdrop?.style.backgroundColor).includes('rgba');

      // Should have no children (empty)
      assume(backdrop?.childNodes.length).equals(0);
    });

    it('returns null when no children provided', function noChildren() {
      // @ts-expect-error - Testing edge case of no children
      const { container } = render(<Overlay open={true} />);

      // Should render nothing when no children
      assume(container.innerHTML).equals('');
    });

    it('respects type and isDismissable props', function typeAndDismissable() {
      function OverlayWithProps() {
        return (
          <Overlay open={true} type="menu" isDismissable={false}>
            <Button slot="trigger">Trigger</Button>
            <Container slot="content" data-testid="content">
              Content
            </Container>
          </Overlay>
        );
      }

      const { container } = render(<OverlayWithProps />);
      const content = container.querySelector('[data-testid="content"]');
      assume(content).to.exist;
    });
  });
});
