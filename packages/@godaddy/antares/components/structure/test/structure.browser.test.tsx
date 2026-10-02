import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { CornerActionsExample } from '../examples/corner-actions.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Structure', function structure() {
    it('renders the composed containers in the browser', async function rendersDefault() {
      const { getByText, getByRole } = await render(<DefaultExample />);
      await expect.element(getByText('Delete file?')).toBeInTheDocument();
      await expect.element(getByText('This action cannot be undone.')).toBeInTheDocument();
      await expect.element(getByRole('group')).toBeInTheDocument();
    });

    it('keeps CornerActions available without adding a landmark', async function rendersCornerActions() {
      const { getByRole } = await render(<CornerActionsExample />);

      await expect.element(getByRole('button', { name: 'More actions' })).toBeInTheDocument();
      await expect.element(getByRole('button', { name: 'Share' })).toBeInTheDocument();
    });
  });
});
