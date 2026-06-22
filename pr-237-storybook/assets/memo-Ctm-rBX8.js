import{i as e}from"./preload-helper-CNDr7-K1.js";var t,n=e((()=>{t=`import { useProps } from '@bento/use-props';
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
`})),r,i=e((()=>{r=`/* v8 ignore next */
import { useId, useMemo, useRef } from 'react';
import { Nested } from './nested.tsx';

/**
 * Memo component demonstrating memoization of slot props and refs.
 *
 * @returns {JSX.Element} The rendered Nested component with memoized slots.
 * @public
 */
export function Memo() {
  const ref = useRef<HTMLButtonElement>(null);
  const id = useId();

  //
  // Always use React.useMemo to memoize when you pass an object to a prop
  // in order to prevent unnecessary re-renders as each object is considered
  // a new object on each render, even if the values are the same.
  //
  // NOTE: This only applies when you're not using the new React compiler as
  //       it will automatically memoize objects for you.
  //
  // Learn more at: https://react.dev/learn/react-compiler
  //
  const slots = useMemo(
    () => ({
      'example-container': {
        // This is where you would put your slot props
        id
      },
      'example-container.button': {
        // Slots can also be used to add refs to elements
        ref: ref,
        onClick: function handleClick() {
          console.log('Button ref:', ref.current);
        }
      }
    }),
    [id]
  );

  return <Nested slots={slots} />;
}
`}));export{t as i,r as n,n as r,i as t};