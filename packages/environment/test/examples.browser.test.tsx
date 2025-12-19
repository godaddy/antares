import { IframeRenderingExample } from '../examples/iframe-rendering.tsx';
import { ComponentLevelExample } from '../examples/component-level.tsx';
import { CustomButtonExample } from '../examples/custom-button.tsx';
import { OverrideProps } from '../examples/override-props.tsx';
import { Override } from '../examples/override.tsx';
import { LockNoOverride } from '../examples/lock-no-override.tsx';
import { LockWithOverride } from '../examples/lock-with-override.tsx';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/environment examples', function bento() {
  describe('Override', function container() {
    it('should render the Container component', function test() {
      const { container } = render(<Override />);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('OverrideProps', function container() {
    it('should render the Container component', function test() {
      const { container } = render(<OverrideProps />);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('CustomButtonExample', function container() {
    it('should render the custom button component', async function testCustomButtonRender() {
      const { container } = await render(<CustomButtonExample />);
      expect(container.innerHTML).toMatchSnapshot();
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
      assume(result).does.not.include('data-override');
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

    it('should have data-slot attributes on slotted components', function test() {
      const { container } = render(<LockNoOverride />);

      // Container should have data-slot="root"
      const rootSlot = container.querySelector('[data-slot="root"]');
      assume(rootSlot).to.not.equal(null);

      // Button should have data-slot="pressable"
      const buttonSlot = container.querySelector('[data-slot="pressable"]');
      assume(buttonSlot).to.not.equal(null);
    });

    it('should have label and description on radio group', function test() {
      const { container } = render(<LockNoOverride />);

      // Check for radio group with label attribute
      const radioGroup = container.querySelector('[role="radiogroup"]');
      assume(radioGroup).to.not.equal(null);
      assume(radioGroup?.getAttribute('label')).equals('Favorite fruit');
      assume(radioGroup?.getAttribute('description')).equals('Pick your favorite');
    });
  });

  describe('LockWithOverride', function lockWithOverride() {
    it('should render with data-override only on the trigger button', function test() {
      const { container } = render(<LockWithOverride />);
      const button = container.querySelector('button');

      // Button should have data-override="slot" because consumer modified it
      assume(button).to.not.equal(null);
      assume(button?.getAttribute('data-override')).equals('slot');
    });

    it('should render the button with consumer override text', function test() {
      const { container } = render(<LockWithOverride />);
      const button = container.querySelector('button');

      assume(button).to.not.equal(null);
      assume(button?.textContent).equals('Hello World');
    });

    it('should have data-slot on slotted components', function test() {
      const { container } = render(<LockWithOverride />);

      // Button should have data-slot="pressable"
      const buttonSlot = container.querySelector('[data-slot="pressable"]');
      assume(buttonSlot).to.not.equal(null);

      // RadioGroup icons should have data-slot="content"
      const iconSlots = container.querySelectorAll('[data-slot="content"]');
      assume(iconSlots.length).equals(3);
    });

    it('should not flag internal composition with data-override', function test() {
      const { container } = render(<LockWithOverride />);

      // RadioGroup should not have data-override
      const radioGroup = container.querySelector('[role="radiogroup"]');
      assume(radioGroup).to.not.equal(null);
      assume(radioGroup?.hasAttribute('data-override')).equals(false);

      // Icons should not have data-override
      const icons = container.querySelectorAll('svg');
      icons.forEach(function checkIcon(icon) {
        assume(icon.hasAttribute('data-override')).equals(false);
      });
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
