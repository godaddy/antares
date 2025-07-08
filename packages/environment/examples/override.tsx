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

/* c8 ignore start */
const Button: React.FC<Example> = withSlots('OverrideExample.CustomButton', function Button() {
  throw new Error('This button should not render as we are overriding it');
});
/* c8 ignore end */

const Link = withSlots('BentoLink', function Link(args: object) {
  return <a href="#" className="button-link" {...args} />;
});

/**
 * Example component demonstrating environment overrides.
 *
 * @param {Example} args - The component props.
 * @returns {JSX.Element} The rendered component.
 * @public
 */
export const Override: React.FC<Example> = withSlots('MyOverrideContainer', function Containers() {
  return (
    <Environment components={{ 'OverrideExample.CustomButton': Link }}>
      <div>
        <Button href="foo.html">foo</Button>

        <div>
          <Button href="bar.html">bar</Button>
        </div>
      </div>
    </Environment>
  );
});
