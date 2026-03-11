import { Environment } from '@bento/environment';
import { withSlots } from '@bento/slots';
/* v8 ignore next */
import React from 'react';

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
 * Button component for the example.
 *
 * @param {object} args - The component props.
 * @returns {JSX.Element} The rendered button.
 * @public
 */
const Button: React.FC<Example> = withSlots('BentoButtonProps', function Button(args: object) {
  return <button className="button" {...args} />;
});

/**
 * Example component demonstrating prop overrides in the environment.
 *
 * @returns {JSX.Element} The rendered component with overridden props.
 * @public
 */
export const OverrideProps: React.FC<Example> = withSlots('MyOverridePropsContainer', function Containers() {
  const props = {
    BentoButtonProps: {
      props: {
        className: 'ho ho ho',
        'data-example': 'example'
      }
    }
  };

  return (
    <Environment components={props}>
      <div>
        <Button href="foo.html">foo</Button>

        <div>
          <Button href="bar.html">bar</Button>
        </div>
      </div>
    </Environment>
  );
});
