import { CreateStore } from '../examples/create-store.tsx';
import { render } from 'vitest-browser-react';
import { Icon } from '../examples/icon.tsx';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/create-external-store examples', function bento() {
  describe('icon', function iconExample() {
    it('renders the icon with the correct icon name', async function name() {
      const { container } = await render(<Icon icon="octopus-sausages" />);

      assume(container.innerHTML).includes('octopus-sausages');
    });

    it('renders nothing when the icon is not found', async function notFound() {
      const { container } = await render(<Icon icon="does-not-exist" />);

      assume(container.innerHTML).equals('');
    });
  });

  describe('CreateStore', function createStoreExample() {
    it('renders the initial data', async function initialData() {
      const { container } = await render(<CreateStore hello="world" foo={['bar']} />);

      assume(container.innerHTML).includes(JSON.stringify({ initial: 'data', hello: 'world', foo: ['bar'] }, null, 2));
    });
  });
});
