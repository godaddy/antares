import { beforeEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetPointer } from '#test/utils/test-helpers.tsx';
import { PaddingExample } from '../examples/padding.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { HostCompositionExample } from '../examples/host-composition.tsx';
import { ClassNameRenderPropExample } from '../examples/class-name-render-prop.tsx';
import { StyleRenderPropExample } from '../examples/style-render-prop.tsx';
import { ContextExample } from '../examples/context.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Box', function boxTests() {
    beforeEach(resetPointer);

    it('merges context defaults and refs while allowing overrides and opt-out', async function contextProps() {
      let contextElement: HTMLElement | null = null;
      let consumerElement: HTMLDivElement | null = null;
      const screen = await render(
        <ContextExample
          contextRef={function contextRef(element) {
            contextElement = element;
          }}
          consumerRef={function consumerRef(element) {
            consumerElement = element;
          }}
        />
      );
      const content = screen.getByText('Content from context').element();
      expect(screen.getByText('Section from context').element().tagName).toBe('SECTION');
      expect(content).toHaveClass('context-class', 'consumer-class');
      expect(content).toHaveStyle({ color: 'blue', opacity: '0.5', padding: '8px' });
      expect(contextElement).toBe(content);
      expect(consumerElement).toBe(content);
      expect(content).toHaveAttribute('data-context', 'true');
      const independent = screen.getByTestId('opt-out').element();
      expect(independent.tagName).toBe('DIV');
      expect(independent).not.toHaveClass('context-class');
      expect(independent).not.toHaveAttribute('data-context');
      expect(independent).not.toHaveAttribute('slot');
      await screen.rerender(
        <ContextExample padding="sm" style={{ opacity: 1 }}>
          Consumer content
        </ContextExample>
      );
      const overridden = screen.getByText('Consumer content').element();
      expect(overridden).toHaveStyle({ color: 'blue', opacity: '1', padding: '4px' });
    });

    it('renders boxes with padding in the browser', async function rendersPadding() {
      const { getByText } = await render(<PaddingExample />);
      expect(getByText('Padding: md')).toBeInTheDocument();
      expect(getByText('Block Padding: lg')).toBeInTheDocument();
      expect(getByText('Inline Padding: xl')).toBeInTheDocument();
    });

    it('renders boxes with alignment in the browser', async function rendersAlignment() {
      const { getByText } = await render(<AlignmentExample />);
      expect(getByText('align-self: start')).toBeInTheDocument();
      expect(getByText('align-self: center')).toBeInTheDocument();
      expect(getByText('align-self: end')).toBeInTheDocument();
    });

    it('composes className and style for a host element', async function composesHost() {
      const { getByText } = await render(<HostCompositionExample />);

      const span = getByText('Save');
      expect(span).toHaveClass('custom');
      expect(span.element().getAttribute('style')).toContain('padding');
      expect(span).toHaveStyle({ opacity: '0.5' });
    });

    it('composes a function className and re-evaluates on interaction', async function composesFunctionClassName() {
      const { getByRole } = await render(<ClassNameRenderPropExample />);

      const button = getByRole('button');
      expect(button).toHaveClass('idle');

      await userEvent.hover(button);
      expect(button).toHaveClass('hover');
    });

    it('merges a function style and re-evaluates when progress changes', async function mergesFunctionStyle() {
      const { getByRole, rerender } = await render(<StyleRenderPropExample />);

      const progressbar = getByRole('progressbar');
      expect(progressbar.element().getAttribute('style')).toContain('padding');
      expect(progressbar).toHaveStyle({ opacity: '0.5' });

      await rerender(<StyleRenderPropExample isIndeterminate={false} />);
      expect(progressbar.element().getAttribute('style')).toContain('padding');
      expect(progressbar).toHaveStyle({ opacity: '1' });
    });
  });
});
