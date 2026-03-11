import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import React from 'react';
import assume from 'assume';
import { VisuallyHidden } from '../src';

describe('@bento/visually-hidden', function bento() {
  describe('VisuallyHidden', function visuallyHiddenTests() {
    it('renders visually hidden content', function rendersVisuallyHidden() {
      const result = renderToString(<VisuallyHidden>Hidden content</VisuallyHidden>);
      assume(result).includes('Hidden content');
    });

    it('applies styles to visually hide the content', function appliesHiddenStyles() {
      const result = renderToString(<VisuallyHidden>Hidden content</VisuallyHidden>);

      assume(result).equals(
        '<span style="border:0;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap" data-hidden="true">Hidden content</span>'
      );
    });

    it('renders with custom element using as prop', function rendersCustomElement() {
      const result = renderToString(<VisuallyHidden as="div">Hidden div content</VisuallyHidden>);

      assume(result).includes('>Hidden div content</div>');
    });

    it('renders with custom element using elementType prop', function rendersElementType() {
      const result = renderToString(<VisuallyHidden elementType="p">Hidden paragraph content</VisuallyHidden>);

      assume(result).includes('>Hidden paragraph content</p>');
    });

    it('prefers as prop over elementType when both are provided', function prefersAsProp() {
      const result = renderToString(
        <VisuallyHidden as="div" elementType="span">
          Content
        </VisuallyHidden>
      );

      assume(result).includes('>Content</div>');
    });

    it('applies additional props', function appliesProps() {
      const result = renderToString(<VisuallyHidden data-testid="test-id">Content</VisuallyHidden>);

      assume(result).includes('data-testid="test-id"');
      assume(result).includes('>Content</span>');
    });
  });
});
