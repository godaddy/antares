/* v8 ignore next */
import Frame, { FrameContextConsumer } from 'react-frame-component';
/* v8 ignore next */
import React, { useContext, useState } from 'react';
import { Environment } from '@bento/environment';
import { withSlots } from '@bento/slots';
import { Box } from '@bento/box';

/**
 * Interface for example component props.
 *
 * @interface Example
 * @public
 */
interface Example {
  [key: string]: any;
}

/**
 * Button component that demonstrates accessing window and document through Box context.
 * This shows how components can interact with the correct DOM context when rendered in iframes.
 *
 * @param {object} args - The component props.
 * @returns {JSX.Element} The rendered button.
 * @public
 */
const IframeButton: React.FC<Example> = withSlots('IframeButton', function IframeButton(args: object) {
  const [clickCount, setClickCount] = useState(0);
  const { env } = useContext(Box);

  /**
   * Handles button click events and demonstrates DOM manipulation within iframe context.
   * Updates the click count and changes the background color of the document body.
   *
   * @returns {void}
   * @public
   */
  function handleClick() {
    // Access the correct document for this context
    const doc = env.document();

    // Update click count
    setClickCount((prev) => prev + 1);
    doc.body.style.backgroundColor = clickCount % 2 === 0 ? 'lightblue' : 'lightgreen';
  }

  return (
    <button className="iframe-button" onClick={handleClick} {...args}>
      Click me ({clickCount} clicks)
    </button>
  );
});

/**
 * Example component demonstrating iframe rendering with Environment configuration.
 * This shows how to use Environment with iframe context and how components can
 * access the correct window and document through Box context.
 *
 * @returns {JSX.Element} The rendered component with iframe content.
 * @public
 */
export function IframeRenderingExample() {
  return (
    <Frame style={{ width: '100%', height: '200px', border: '1px solid #ccc' }}>
      <FrameContextConsumer>
        {({ document }) => (
          <Environment root={document}>
            <div style={{ padding: '20px' }}>
              <h2>Inside Iframe</h2>
              <p>
                The button below uses Box context to access the iframe's document and demonstrates DOM manipulation.
              </p>
              <IframeButton>Click me</IframeButton>
            </div>
          </Environment>
        )}
      </FrameContextConsumer>
    </Frame>
  );
}
