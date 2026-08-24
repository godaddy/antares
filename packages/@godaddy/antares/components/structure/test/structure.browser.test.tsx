import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Structure', function structure() {
    it('renders the composed containers in the browser', async function rendersDefault() {
      const { getByText, getByRole } = await render(<DefaultExample />);
      await expect.element(getByText('Delete file?')).toBeInTheDocument();
      await expect.element(getByText('This action cannot be undone.')).toBeInTheDocument();
      await expect.element(getByRole('group')).toBeInTheDocument();
    });
  });
});
