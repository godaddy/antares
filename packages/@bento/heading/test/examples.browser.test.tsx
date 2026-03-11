import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { HeadingExample } from '../examples/heading.tsx';
import { LevelExample } from '../examples/level.tsx';
import { HeadingProviderExample } from '../examples/provider.tsx';
import { HeadingOverrideExample } from '../examples/override.tsx';

describe('@bento/heading examples', function bento() {
  describe('Heading', function headingExample() {
    it('renders the heading', function rendersHeading() {
      const { container } = render(<HeadingExample />);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Hello, world!<\/span>$/);
    });

    it('renders the level', function rendersLevel() {
      const { container } = render(<LevelExample />);
      const result = container.innerHTML;

      assume(result).match(/^<h1[^>]*>Hello, world!<\/h1>$/);
    });

    it('renders using the provider', function rendersProvider() {
      const { container } = render(<HeadingProviderExample />);
      const result = container.innerHTML;

      assume(result).match(/<h1[^>]*>Level 1<\/h1>/);
      assume(result).match(/<h2[^>]*>Level 2<\/h2>/);
      assume(result).match(/<h3[^>]*>Level 3<\/h3>/);
    });

    it('renders using provider and overrides', function rendersOverride() {
      const { container } = render(<HeadingOverrideExample />);
      const result = container.innerHTML;

      assume(result).match(/<h1[^>]*>Level 1<\/h1>/);
      assume(result).match(/<h2[^>]*>Level 2<\/h2>/);
      assume(result).match(/<h1[^>]*>Level 1 \(overridden\)<\/h1>/);
    });
  });
});
