import { Container, type ContainerProps } from '@bento/container';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import React from 'react';

describe('@bento/container (node)', function bentoNode() {
  describe('Container SSR', function containerSSRTests() {
    it('renders on server', function rendersOnServer() {
      const html = renderToString(<Container>Server content</Container>);
      expect(html).toContain('<div');
      expect(html).toContain('>Server content</div>');
    });

    it('renders with as prop on server', function rendersWithAsOnServer() {
      const html = renderToString(<Container as="section">Section content</Container>);
      expect(html).toContain('<section');
      expect(html).toContain('>Section content</section>');
    });

    it('exports ContainerProps interface', function exportsInterface() {
      const props: ContainerProps = {
        as: 'div',
        children: 'test',
        className: 'test-class'
      };
      expect(props.as).toBe('div');
    });

    it('renders empty div with null children on server', function handlesNullOnServer() {
      const html = renderToString(<Container>{null}</Container>);
      expect(html).equals('<div></div>');
    });

    it('renders empty div with undefined children on server', function handlesUndefinedOnServer() {
      const html = renderToString(<Container>{undefined}</Container>);
      expect(html).equals('<div></div>');
    });

    it('renders empty div for presentational use on server', function rendersEmptyOnServer() {
      const html = renderToString(<Container style={{ width: '100px' }} className="backdrop" />);
      expect(html).toContain('<div');
      expect(html).toContain('class="backdrop"');
      expect(html).toContain('style="width:100px"');
      expect(html).toContain('></div>');
    });

    it('renders with props on server', function rendersWithPropsOnServer() {
      const html = renderToString(
        <Container className="server-class" id="server-id">
          SSR content
        </Container>
      );
      expect(html).toContain('class="server-class');
      expect(html).toContain('id="server-id"');
    });

    it('renders nested containers on server', function rendersNestedOnServer() {
      const html = renderToString(
        <Container as="article">
          <Container as="header">Header</Container>
          <Container as="main">Main content</Container>
          <Container as="footer">Footer</Container>
        </Container>
      );
      expect(html).toContain('<article');
      expect(html).toContain('<header');
      expect(html).toContain('<main');
      expect(html).toContain('<footer');
      expect(html).toContain('>Header</header>');
      expect(html).toContain('>Main content</main>');
      expect(html).toContain('>Footer</footer>');
    });

    it('type checks Container props', function typeChecksProps() {
      const validProps: ContainerProps = {
        as: 'span',
        children: <div>Child</div>,
        className: 'test',
        style: { color: 'red' },
        onClick: function handleClick() {
          // Empty handler for type checking
        },
        'aria-label': 'Test label',
        role: 'button',
        id: 'test-id'
      };

      expect(validProps.as).toBe('span');
      expect(validProps.className).toBe('test');
    });
  });
});
