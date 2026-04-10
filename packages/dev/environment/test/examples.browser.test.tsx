import { IframeRenderingExample } from '../examples/iframe-rendering.tsx';
import { ComponentLevelExample } from '../examples/component-level.tsx';
import { CustomButtonExample } from '../examples/custom-button.tsx';
import { OverrideProps } from '../examples/override-props.tsx';
import { Override } from '../examples/override.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/environment examples', function bento() {
  describe('Override', function container() {
    it('should render the Container component', async function test() {
      const { container } = await render(<Override />);

      const result = container.innerHTML;

      assume(result).equals(
        '<div><a href="foo.html" class="button-link" data-override="context">foo</a><div><a href="bar.html" class="button-link" data-override="context">bar</a></div></div>'
      );
    });
  });

  describe('OverrideProps', function container() {
    it('should render the Container component', async function test() {
      const { container } = await render(<OverrideProps />);

      const result = container.innerHTML;

      assume(result).equals(
        '<div><button class="ho ho ho" href="foo.html" data-example="example" data-override="context className">foo</button><div><button class="ho ho ho" href="bar.html" data-example="example" data-override="context className">bar</button></div></div>'
      );
    });
  });

  describe('CustomButtonExample', function container() {
    it('should render the custom button component', async function testCustomButtonRender() {
      const { container } = await render(<CustomButtonExample />);
      const result = container.innerHTML;
      assume(result).to.equal(
        '<div class="example-container"><div class="bento-card"><p class="bento-text">This text will be rendered with default styling</p><button class="custom-button" data-override="context" style="background-color: blue; color: white;">This button will be replaced with a custom one</button></div></div>'
      );
    });

    it('should not render the BentoButton', async function testBentoButtonNotRendered() {
      const { container } = await render(<CustomButtonExample />);
      const result = container.innerHTML;
      assume(result).does.not.include('class="bento-button"');
    });

    it('should demonstrate component replacement for experimentation', async function testExperimentationReplacement() {
      const { container } = await render(<CustomButtonExample />);
      const button = container.querySelector('.custom-button');
      assume(button).to.not.equal(null);
      assume(button?.className).equals('custom-button');
      assume(button?.getAttribute('style')).includes('background-color: blue');
    });

    it('should preserve component hierarchy and structure', async function testComponentHierarchy() {
      const { container } = await render(<CustomButtonExample />);
      const exampleContainer = container.querySelector('.example-container');
      const bentoCard = container.querySelector('.bento-card');
      const bentoText = container.querySelector('.bento-text');

      assume(exampleContainer).to.not.equal(null);
      assume(bentoCard).to.not.equal(null);
      assume(bentoText).to.not.equal(null);
    });
  });

  describe('ComponentLevelExample', function container() {
    it('should render the component with overridden props', async function test() {
      const { container } = await render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg).to.not.equal(null);

      // Ensure overridden props from the Environment wrapper are applied
      assume(svg?.getAttribute('data-mode')).equals('sprite');
      assume(svg?.getAttribute('data-icon')).equals('my-icon');
      assume(svg?.getAttribute('width')).equals('48');
      assume(svg?.getAttribute('height')).equals('48');

      // Check the accompanying paragraph is present and contains the expected text
      const paragraph = container.querySelector('p');
      assume(paragraph).to.not.equal(null);
      assume(paragraph?.textContent).includes('This icon will be loaded as sprite');
    });

    it('should render icon in sprite mode via environment configuration', async function test() {
      const { container } = await render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg).to.not.equal(null);
      assume(svg?.getAttribute('data-mode')).equals('sprite');
    });

    it('should have correct icon dimensions', async function test() {
      const { container } = await render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg?.getAttribute('width')).equals('48');
      assume(svg?.getAttribute('height')).equals('48');
    });

    it('should contain proper accessibility attributes', async function test() {
      const { container } = await render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg?.getAttribute('role')).equals('img');
      assume(svg?.getAttribute('focusable')).equals('false');
      assume(svg?.querySelector('title')).to.not.equal(null);
    });
  });

  describe('IframeRenderingExample', function container() {
    it('should render iframe with correct content and handle interactions', async function test() {
      const { container } = await render(<IframeRenderingExample />);

      // Find the iframe element
      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      assume(iframe).to.not.equal(null);

      // Wait for iframe to load and content to be available
      await new Promise(function waitForIframe(resolve) {
        function checkContent() {
          const iframeDoc = iframe?.contentDocument;
          if (iframeDoc && iframeDoc.querySelector('h2')) {
            resolve(undefined);
          } else {
            setTimeout(checkContent, 10);
          }
        }

        if (iframe?.contentDocument?.readyState === 'complete') {
          checkContent();
        } else {
          iframe?.addEventListener('load', checkContent);
        }
      });

      // Access iframe's document
      const iframeDoc = iframe?.contentDocument;
      assume(iframeDoc).to.not.equal(null);

      // Check initial content
      const heading = iframeDoc?.querySelector('h2');
      assume(heading?.textContent).equals('Inside Iframe');

      const button = iframeDoc?.querySelector('.iframe-button') as HTMLButtonElement;
      assume(button).to.not.equal(null);
      assume(button?.textContent).equals('Click me (0 clicks)');

      // Check initial background color (should be default)
      const initialBgColor = iframeDoc?.body.style.backgroundColor;
      assume(initialBgColor).equals('');

      // Click the button
      button?.click();

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check updated button text
      assume(button?.textContent).equals('Click me (1 clicks)');

      // Check background color changed to lightblue
      const updatedBgColor = iframeDoc?.body.style.backgroundColor;
      assume(updatedBgColor).equals('lightblue');

      // Click again
      button?.click();

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check button text updated again
      assume(button?.textContent).equals('Click me (2 clicks)');

      // Check background color changed to lightgreen
      const secondUpdatedBgColor = iframeDoc?.body.style.backgroundColor;
      assume(secondUpdatedBgColor).equals('lightgreen');
    });
  });
});
