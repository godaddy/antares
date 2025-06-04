import { Environment } from '@bento/environment';
import { withSlots } from '@bento/slots';
import React, { useMemo } from 'react';

/**
 * Interface for component props.
 *
 * @interface ComponentProps
 * @public
 */
interface ComponentProps {
  [key: string]: any;
}

/**
 * Original Bento button component that will be replaced.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered button.
 * @public
 */
/* c8 ignore start */
const BentoButton = withSlots('CustomButtonExample.BentoButton', function BentoButton(props: ComponentProps) {
  return <button className="bento-button" {...props} />;
});
/* c8 ignore end */

/**
 * Bento card component used as a container.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered card container.
 * @public
 */
const BentoCard = withSlots('CustomButtonExample.BentoCard', function BentoCard(props: ComponentProps) {
  return <div className="bento-card" {...props} />;
});

/**
 * Bento text component for displaying content.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered text element.
 * @public
 */
const BentoText = withSlots('CustomButtonExample.BentoText', function BentoText(props: ComponentProps) {
  return <p className="bento-text" {...props} />;
});

/**
 * Custom button component that will replace the Bento button.
 * This component demonstrates how to create a custom implementation
 * that can be used to replace the default Bento button.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered custom button.
 * @public
 */
const CustomButton = withSlots('CustomButtonExample.CustomButton', function CustomButton(props: ComponentProps) {
  return (
    <button
      className="custom-button"
      style={{
        backgroundColor: 'blue',
        color: 'white'
      }}
      {...props}
    />
  );
});

/**
 * Main application component that contains the UI structure.
 * This component is wrapped by the Environment component to enable
 * component replacement functionality.
 *
 * @returns {JSX.Element} The rendered application UI.
 * @public
 */
const App: React.FC = function App() {
  return (
    <div className="example-container">
      <BentoCard>
        <BentoText>This text will be rendered with default styling</BentoText>
        <BentoButton>This button will be replaced with a custom one</BentoButton>
      </BentoCard>
    </div>
  );
};

/**
 * Example component demonstrating how to use Environment to replace components.
 * This example shows how you can replace the default Bento button with
 * a custom implementation while maintaining the slot-based architecture.
 *
 * The key points demonstrated are:
 * 1. How to create a custom component that can replace a Bento component
 * 2. How to use Environment to manage component replacements
 * 3. How to properly memoize the components object to prevent unnecessary re-renders
 *
 * @returns {JSX.Element} The rendered component with custom button.
 * @public
 */
export const CustomButtonExample: React.FC = function CustomButtonExample() {
  const components = useMemo(function memo() {
    //
    // We never want to introduce objects as props to components as new
    // instances of the object will be created for each render causing
    // unwanted re-renders in your application tree.
    //
    // Either use the `useMemo` hook to memoize the object or define the
    // object outside of the component.
    //
    return {
      'CustomButtonExample.BentoButton': CustomButton
    };
  }, []);

  return (
    <Environment components={components}>
      <App />
    </Environment>
  );
};
