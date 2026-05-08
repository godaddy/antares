const e=`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Button } from './button.tsx';
/* v8 ignore next */
import { useId } from 'react';

/**
 * Example component for slots demonstration.
 *
 * @param {Record<string, any>} args - The component props.
 * @returns {JSX.Element} The rendered example component.
 * @public
 */
const Example = withSlots('SlotsExample', function ExampleComponent(args: Record<string, any>) {
  const { props } = useProps(args);

  return (
    <div {...props} className="example">
      {props.children}
    </div>
  );
});

/**
 * Label component for the slots example.
 *
 * @param {Record<string, any>} props - The component props.
 * @returns {JSX.Element} The rendered label.
 * @public
 */
const Label = withSlots('SlotsLabel', function LabelComponent(props: Record<string, any>) {
  return <label {...props}>{props.children}</label>;
});

/**
 * Nested component demonstrating slot composition.
 *
 * @param {Record<string, any>} props - The component props.
 * @param {string} [props.children='Hello World'] - The content to display.
 * @param {string} [props.id] - The ID for the label-input connection.
 * @returns {JSX.Element} The rendered nested component.
 * @public
 */
export const Nested = withSlots(
  'SlotsNested',
  function NestedComponent({ children = 'Hello World', id = useId() }: Record<string, any>) {
    return (
      <Example slot="example-container">
        <Label slot="label" htmlFor="example">
          {children}
        </Label>
        <Button slot="button" id={id}>
          Click Me
        </Button>
      </Example>
    );
  }
);
`;export{e as S};
