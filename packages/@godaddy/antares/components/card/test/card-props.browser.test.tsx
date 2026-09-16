import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { PropsReviewExample } from '../examples/props-review.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card props review', function cardPropsReview() {
    it('forwards Card refs and layout props through Checkbox and Radio', async function cardProps() {
      const { container, getByRole, getByTestId } = await render(<PropsReviewExample />);
      const checkboxCard = container.querySelector<HTMLElement>('.review-checkbox-card');
      const radioCard = container.querySelector<HTMLElement>('.review-radio-card');

      expect(checkboxCard).not.toBeNull();
      expect(radioCard).not.toBeNull();
      expect(checkboxCard?.style.padding).toBe('var(--sp-sm)');
      expect(checkboxCard?.style.gap).toBe('var(--sp-xs)');
      expect(radioCard?.style.padding).toBe('var(--sp-md)');
      expect(radioCard?.style.gap).toBe('var(--sp-lg)');
      await expect.element(getByTestId('props-ref-status')).toHaveTextContent('Refs ready');
      await expect.element(getByRole('link', { name: 'Linked content ref' })).toBeInTheDocument();
      expect(getByTestId('props-static-content').element().tagName).toBe('DIV');
      expect(getByTestId('props-linked-content').element().tagName).toBe('A');
    });

    it('evaluates selection render props and controlled group changes once', async function renderPropState() {
      const { container, getByRole, getByTestId, getByText } = await render(<PropsReviewExample />);
      const checkboxCard = container.querySelector<HTMLElement>('.review-checkbox-card')!;
      const radioCard = container.querySelector<HTMLElement>('.review-radio-card')!;

      expect(checkboxCard).toHaveClass('unselected');
      expect(checkboxCard.style.borderColor).toBe('rgb(4, 5, 6)');
      expect(radioCard).toHaveClass('unselected');
      expect(radioCard.style.borderColor).toBe('rgb(10, 11, 12)');

      await userEvent.click(getByTestId('props-checkbox-indicator'));
      await expect.element(getByRole('checkbox', { name: 'Checkbox props card' })).toBeChecked();
      expect(checkboxCard).toHaveClass('selected');
      expect(checkboxCard.style.borderColor).toBe('rgb(1, 2, 3)');
      await expect.element(getByText('Checkbox changes: 1')).toBeInTheDocument();

      await userEvent.click(getByTestId('props-radio-indicator'));
      await expect.element(getByRole('radio', { name: 'Radio props card' })).toBeChecked();
      expect(radioCard).toHaveClass('selected');
      expect(radioCard.style.borderColor).toBe('rgb(7, 8, 9)');
    });

    it('uses CardContent label precedence default, context, then local', async function contentLabelPrecedence() {
      const { getByRole } = await render(<PropsReviewExample />);

      await expect.element(getByRole('link', { name: 'Default label content' })).toBeInTheDocument();
      await expect.element(getByRole('link', { name: 'Context label', exact: true })).toBeInTheDocument();
      await expect.element(getByRole('link', { name: 'Local label' })).toBeInTheDocument();
    });
  });
});
