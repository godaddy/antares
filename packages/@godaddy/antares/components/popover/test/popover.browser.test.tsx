import { WithCloseButtonExample } from '../examples/with-close-button.tsx';
import { CustomAnchorExample } from '../examples/custom-anchor.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/popover-playground.tsx';
import { LayerPropsExample } from '../examples/layer-props.tsx';
import { ContainerContextExample } from '../examples/container-context.tsx';
import { createRef } from 'react';
import { cdp, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Popover', function popoverTests() {
    it('opens DefaultExample and renders popover content', async function defaultExample() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Open popover' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });
    });

    it('keeps opacity feedback without spatial motion when reduced motion is preferred', async function reducedMotion() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      const setReducedMotion = (value: 'reduce' | 'no-preference') =>
        session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value }]
        });

      await setReducedMotion('reduce');

      try {
        assume(matchMedia('(prefers-reduced-motion: reduce)').matches).is.true();

        const { getByRole } = await render(<DefaultExample />);
        await getByRole('button', { name: 'Open popover' }).click();

        const dialog = getByRole('dialog', { name: 'Open popover' }).element();
        const surface = dialog.closest('[data-placement]') as HTMLElement;
        const style = getComputedStyle(surface);

        assume(style.transform).equals('none');
        assume(style.transitionProperty).equals('opacity');
      } finally {
        await setReducedMotion('no-preference');
      }
    });

    it('opens DefaultExample with Enter key', async function keyboardOpen() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Open popover' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });
    });

    it('closes DefaultExample with Escape key', async function keyboardClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Open popover' }).query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Open popover' }).query()).equals(null);
      });
    });

    it('opens CustomAnchorExample from external trigger', async function customAnchorExample() {
      const { getByRole } = await render(<CustomAnchorExample />);

      await getByRole('button', { name: 'Open Popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Popover' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Popover content!');
      });
    });

    it('closes WithCloseButtonExample when close button is pressed', async function withCloseButtonExample() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });

      await getByRole('button', { name: 'Close' }).click();

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).equals(null);
      });
    });

    it('closes WithCloseButtonExample using keyboard on close button', async function withCloseButtonKeyboard() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).equals(null);
      });
    });

    it('labels the dialog from a composed Heading slot="title"', async function headingLabel() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).is.not.equal(null);
      });
    });

    it('puts the close button beside the title and keeps the content full width', async function regionLayout() {
      const { getByRole } = await render(<PlaygroundExample showTitle showCloseButton longContent />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Popover title' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.closest('[data-entering]')).equals(null);

        const title = (dialog as unknown as Element).querySelector('[slot="title"]');
        const content = (dialog as unknown as Element).querySelector('section');
        assume(title).is.not.equal(null);
        assume(content).is.not.equal(null);

        const titleRect = (title as Element).getBoundingClientRect();
        const contentRect = (content as Element).getBoundingClientRect();
        const closeRect = getByRole('button', { name: 'Close' }).element().getBoundingClientRect();

        // The close button owns its own column in the title row, so the title stops where the
        // button begins and they share the row.
        assume(titleRect.right <= closeRect.left).is.true();
        assume(closeRect.top < titleRect.bottom).is.true();

        // Content spans both columns below, so it keeps the full popover width.
        assume(contentRect.top >= titleRect.bottom).is.true();
        assume(contentRect.right > closeRect.left).is.true();
      });
    });

    it('routes className to the dialog and containerProps to the panel', async function layerProps() {
      const { getByRole } = await render(<LayerPropsExample />);

      await getByRole('button', { name: 'Open popover' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Layer props' }).query()).is.not.equal(null);
      });

      const dialog = document.querySelector('.custom-dialog');
      const container = document.querySelector('.custom-container');

      // className lands on the dialog, matching Modal and Drawer; the panel is a distinct ancestor.
      assume(dialog?.getAttribute('role')).equals('dialog');
      assume(container?.contains(dialog as Node)).is.true();

      // The panel keeps its own classes alongside the consumer's.
      assume((container as HTMLElement).className.split(' ').length).is.above(1);
    });

    it('preserves menu presentation when the consumer supplies containerProps', async function menuContainerProps() {
      const { getByRole } = await render(
        <ContainerContextExample
          popoverProps={{
            containerProps: {
              className: 'local-panel',
              style: { color: 'rgb(128, 0, 0)' }
            }
          }}
        />
      );

      await getByRole('button', { name: 'Open context panel' }).click();

      await vi.waitFor(function menuPresentation() {
        const panel = document.querySelector('.local-panel') as HTMLElement;
        assume(panel).is.not.equal(null);
        assume(panel.classList.contains('local-panel')).is.true();
        assume(panel.getAttribute('data-noarrow')).equals('true');
        assume(getComputedStyle(panel).minInlineSize).equals('186px');
        assume(getComputedStyle(panel).borderRadius).equals('16px');
        assume(panel.style.color).equals('rgb(128, 0, 0)');
      });
    });

    it('merges slotted panel defaults, styles and handlers while retaining both dialog refs', async function contextProps() {
      const contextRef = createRef<HTMLElement>();
      const consumerRef = createRef<HTMLElement>();
      const onContextMouseDown = vi.fn();
      const onConsumerMouseDown = vi.fn();
      const { getByRole } = await render(
        <ContainerContextExample
          menu={false}
          context={{
            slots: {
              content: {
                ref: contextRef,
                className: 'context-dialog',
                hideArrow: true,
                containerProps: {
                  className: 'context-panel',
                  lang: 'en',
                  dir: 'ltr',
                  style: { backgroundColor: 'rgb(240, 240, 240)', borderRadius: 13, padding: 12 },
                  onMouseDown: onContextMouseDown
                }
              }
            }
          }}
          popoverProps={{
            slot: 'content',
            ref: consumerRef,
            className: 'consumer-dialog',
            containerProps: {
              className: 'consumer-panel',
              lang: 'fr',
              style: { borderRadius: 9 },
              onMouseDown: onConsumerMouseDown
            }
          }}
        />
      );

      await getByRole('button', { name: 'Open context panel' }).click();
      await vi.waitFor(function composedPanel() {
        const panel = document.querySelector('.consumer-panel') as HTMLElement;
        assume(panel).is.not.equal(null);
        assume(panel.classList.contains('context-panel')).is.true();
        assume(panel.classList.contains('consumer-panel')).is.true();
        assume(panel.lang).equals('fr');
        assume(panel.dir).equals('ltr');
        assume(panel.style.backgroundColor).equals('rgb(240, 240, 240)');
        assume(panel.style.padding).equals('12px');
        assume(panel.style.borderRadius).equals('9px');
        assume(panel.getAttribute('data-noarrow')).equals('true');
        assume(contextRef.current).equals(consumerRef.current);
        assume(contextRef.current?.classList.contains('context-dialog')).is.true();
        assume(contextRef.current?.classList.contains('consumer-dialog')).is.true();
        assume(contextRef.current?.getAttribute('role')).equals('dialog');
      });

      await getByRole('dialog', { name: 'Context panel' }).click();
      assume(onContextMouseDown.mock.calls.length).equals(1);
      assume(onConsumerMouseDown.mock.calls.length).equals(1);
    });

    it('composes contextual and local container render props with local precedence', async function renderProps() {
      const { getByRole } = await render(
        <ContainerContextExample
          menu={false}
          context={{
            containerProps: {
              className: function contextClassName({ placement }) {
                return `context-${placement}`;
              },
              style: function contextStyle() {
                return { color: 'rgb(0, 0, 128)', borderRadius: 7 };
              }
            }
          }}
          popoverProps={{
            containerProps: {
              className: function localClassName({ defaultClassName, placement }) {
                return `${defaultClassName} consumer-render-prop consumer-${placement}`;
              },
              style: function localStyle() {
                return { backgroundColor: 'rgb(0, 128, 0)', borderRadius: 17 };
              }
            }
          }}
        />
      );

      await getByRole('button', { name: 'Open context panel' }).click();
      await vi.waitFor(function resolvedRenderProps() {
        const panel = document.querySelector('.consumer-render-prop') as HTMLElement;
        assume(panel).is.not.equal(null);
        assume(panel.classList.contains(`context-${panel.getAttribute('data-placement')}`)).is.true();
        assume(panel.classList.contains('consumer-render-prop')).is.true();
        assume(panel.classList.contains(`consumer-${panel.getAttribute('data-placement')}`)).is.true();
        assume(panel.style.color).equals('rgb(0, 0, 128)');
        assume(panel.style.backgroundColor).equals('rgb(0, 128, 0)');
        assume(panel.style.borderRadius).equals('17px');
      });
    });
  });
});
