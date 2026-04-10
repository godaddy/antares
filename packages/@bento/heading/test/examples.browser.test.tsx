import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { HeadingExample } from '../examples/heading.tsx';
import { LevelExample } from '../examples/level.tsx';
import { HeadingProviderExample } from '../examples/provider.tsx';
import { HeadingOverrideExample } from '../examples/override.tsx';

describe('@bento/heading examples', function bento() {
  describe('Heading', function headingExample() {
    it('renders the heading', async function rendersHeading() {
      const { container } = await render(<HeadingExample />);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Hello, world!<\/span>$/);
    });

    it('renders the level', async function rendersLevel() {
      const { container } = await render(<LevelExample />);
      const result = container.innerHTML;

      assume(result).match(/^<h1[^>]*>Hello, world!<\/h1>$/);
    });

    it('renders using the provider', async function rendersProvider() {
      const { container } = await render(<HeadingProviderExample />);
      const result = container.innerHTML;

      assume(result).match(/<h1[^>]*>Level 1<\/h1>/);
      assume(result).match(/<h2[^>]*>Level 2<\/h2>/);
      assume(result).match(/<h3[^>]*>Level 3<\/h3>/);
    });

    it('renders using provider and overrides', async function rendersOverride() {
      const { container } = await render(<HeadingOverrideExample />);
      const result = container.innerHTML;

      assume(result).match(/<h1[^>]*>Level 1<\/h1>/);
      assume(result).match(/<h2[^>]*>Level 2<\/h2>/);
      assume(result).match(/<h1[^>]*>Level 1 \(overridden\)<\/h1>/);
    });
  });
});
