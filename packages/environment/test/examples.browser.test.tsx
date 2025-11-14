import { IframeRenderingExample } from '../examples/iframe-rendering.tsx';
import { ComponentLevelExample } from '../examples/component-level.tsx';
import { CustomButtonExample } from '../examples/custom-button.tsx';
import { OverrideProps } from '../examples/override-props.tsx';
import { Override } from '../examples/override.tsx';
import { LockNoOverride } from '../examples/lock-no-override.tsx';
import { LockWithOverride } from '../examples/lock-with-override.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/environment examples', function bento() {
  describe('Override', function container() {
    it('should render the Container component', function test() {
      const { container } = render(<Override />);

      const result = container.innerHTML;

      assume(result).equals(
        '<div><a href="foo.html" class="button-link">foo</a><div><a href="bar.html" class="button-link">bar</a></div></div>'
      );
    });
  });

  describe('OverrideProps', function container() {
    it('should render the Container component', function test() {
      const { container } = render(<OverrideProps />);

      const result = container.innerHTML;

      assume(result).equals(
        '<div><button class="ho ho ho" href="foo.html" data-example="example">foo</button><div><button class="ho ho ho" href="bar.html" data-example="example">bar</button></div></div>'
      );
    });
  });

  describe('CustomButtonExample', function container() {
    it('should render the custom button component', async function testCustomButtonRender() {
      const { container } = await render(<CustomButtonExample />);
      const result = container.innerHTML;
      assume(result).to.equal(
        '<div class="example-container"><div class="bento-card"><p class="bento-text">This text will be rendered with default styling</p><button class="custom-button" style="background-color: blue; color: white;">This button will be replaced with a custom one</button></div></div>'
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
    it('should render the component with overridden props', function test() {
      const { container } = render(<ComponentLevelExample />);
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

    it('should render icon in sprite mode via environment configuration', function test() {
      const { container } = render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg).to.not.equal(null);
      assume(svg?.getAttribute('data-mode')).equals('sprite');
    });

    it('should have correct icon dimensions', function test() {
      const { container } = render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg?.getAttribute('width')).equals('48');
      assume(svg?.getAttribute('height')).equals('48');
    });

    it('should contain proper accessibility attributes', function test() {
      const { container } = render(<ComponentLevelExample />);
      const svg = container.querySelector('svg');
      assume(svg?.getAttribute('role')).equals('img');
      assume(svg?.getAttribute('focusable')).equals('false');
      assume(svg?.querySelector('title')).to.not.equal(null);
    });
  });

  describe('IframeRenderingExample', function container() {
    it('should render iframe with correct content and handle interactions', async function test() {
      const { container } = render(<IframeRenderingExample />);

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

  describe('LockNoOverride', function lockNoOverride() {
    it('should render without any data-override attributes', function test() {
      const { container } = render(<LockNoOverride />);
      const result = container.innerHTML;

      // Should have NO data-override attributes since all slots are internal composition
      assume(result).equals(
        '<div><button type="button" tabindex="0" data-react-aria-pressable="true" class="_pressable_1heya_1">Click Me</button><div id="fruit-group" role="radiogroup" aria-orientation="vertical" aria-labelledby="react-aria-:r5:" aria-describedby="react-aria-:r7:" data-orientation="vertical"><span class="label" id="react-aria-:r5:">Favorite fruit</span><div><label class="_text_vfk41_1" data-react-aria-pressable="true"><span style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><input data-react-aria-pressable="true" tabindex="0" type="radio" name="react-aria-:r9:" aria-describedby="react-aria-:r7:" value="apple"></span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="_icon_1xscy_1" data-loading="true" data-icon="radioUnchecked" role="presentation" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="gray" stroke-width="2"></circle></svg><span class="_text_vfk41_1">Apple</span></label><label class="_text_vfk41_1" data-react-aria-pressable="true"><span style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><input data-react-aria-pressable="true" tabindex="0" type="radio" name="react-aria-:r9:" aria-describedby="react-aria-:r7:" value="banana"></span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="_icon_1xscy_1" data-loading="true" data-icon="radioUnchecked" role="presentation" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="gray" stroke-width="2"></circle></svg><span class="_text_vfk41_1">Banana</span></label><label class="_text_vfk41_1" data-react-aria-pressable="true"><span style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><input data-react-aria-pressable="true" tabindex="0" type="radio" name="react-aria-:r9:" aria-describedby="react-aria-:r7:" value="orange"></span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="_icon_1xscy_1" data-loading="true" data-icon="radioUnchecked" role="presentation" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="gray" stroke-width="2"></circle></svg><span class="_text_vfk41_1">Orange</span></label></div><span class="describe" id="react-aria-:r7:">Pick your favorite</span></div></div>'
      );
    });

    it('should render the button with internal composition text', function test() {
      const { container } = render(<LockNoOverride />);
      const button = container.querySelector('button');

      assume(button).to.not.equal(null);
      assume(button?.textContent).equals('Click Me');
    });

    it('should render the radio group with all options', function test() {
      const { container } = render(<LockNoOverride />);
      const radioInputs = container.querySelectorAll('input[type="radio"]');

      assume(radioInputs.length).equals(3);
    });

    it('should have label and description with internal composition classes', function test() {
      const { container } = render(<LockNoOverride />);

      // Check for label element
      const label = container.querySelector('.label');
      assume(label).to.not.equal(null);

      // Check for description element
      const description = container.querySelector('.describe');
      assume(description).to.not.equal(null);
    });
  });

  describe('LockWithOverride', function lockWithOverride() {
    it('should render with data-override only on the trigger button', function test() {
      const { container } = render(<LockWithOverride />);

      assume(container.innerHTML).equals(
        '<div><button type="button" tabindex="0" data-react-aria-pressable="true" data-override="slot" class="_pressable_1heya_1">Hello World</button><div id="fruit-group" role="radiogroup" aria-orientation="vertical" aria-labelledby="react-aria-:r19:" aria-describedby="react-aria-:r1b:" data-orientation="vertical"><span class="label" id="react-aria-:r19:">Favorite fruit</span><div><label class="_text_vfk41_1" data-react-aria-pressable="true"><span style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><input data-react-aria-pressable="true" tabindex="0" type="radio" name="react-aria-:r1d:" aria-describedby="react-aria-:r1b:" value="apple"></span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="_icon_1xscy_1" data-loading="true" data-icon="radioUnchecked" role="presentation" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="gray" stroke-width="2"></circle></svg><span class="_text_vfk41_1">Apple</span></label><label class="_text_vfk41_1" data-react-aria-pressable="true"><span style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><input data-react-aria-pressable="true" tabindex="0" type="radio" name="react-aria-:r1d:" aria-describedby="react-aria-:r1b:" value="banana"></span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="_icon_1xscy_1" data-loading="true" data-icon="radioUnchecked" role="presentation" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="gray" stroke-width="2"></circle></svg><span class="_text_vfk41_1">Banana</span></label><label class="_text_vfk41_1" data-react-aria-pressable="true"><span style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><input data-react-aria-pressable="true" tabindex="0" type="radio" name="react-aria-:r1d:" aria-describedby="react-aria-:r1b:" value="orange"></span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="_icon_1xscy_1" data-loading="true" data-icon="radioUnchecked" role="presentation" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="gray" stroke-width="2"></circle></svg><span class="_text_vfk41_1">Orange</span></label></div><span class="describe" id="react-aria-:r1b:">Pick your favorite</span></div></div>'
      );
    });

    it('should render the button with consumer override text', function test() {
      const { container } = render(<LockWithOverride />);
      const button = container.querySelector('button');

      assume(button).to.not.equal(null);
      assume(button?.textContent).equals('Hello World');
    });

    it('should not flag internal label and description with data-override', function test() {
      const { container } = render(<LockWithOverride />);
      const label = container.querySelector('.label');
      const description = container.querySelector('.describe');

      // Internal composition should not be flagged with data-override
      assume(label).to.not.equal(null);
      assume(description).to.not.equal(null);
      assume(label?.hasAttribute('data-override')).equals(false);
      assume(description?.hasAttribute('data-override')).equals(false);
    });

    it('should only have data-override on consumer-modified slots', function test() {
      const { container } = render(<LockWithOverride />);
      const elementsWithOverride = container.querySelectorAll('[data-override]');

      // Only the trigger button should have data-override
      assume(elementsWithOverride.length).equals(1);
      assume(elementsWithOverride[0]?.tagName.toLowerCase()).equals('button');
    });
  });
});
