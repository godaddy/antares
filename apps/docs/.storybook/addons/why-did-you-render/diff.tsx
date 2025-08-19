import diffy from 'react-diff-viewer-continued';
import React, { type JSX } from 'react';
import { ListItem } from './list.tsx';

//
// The component doesn't correctly export the default export, so we need to
// detect if we got the correct export or not.
//
const Diffy = diffy.default || diffy;

/**
 * Converts an object to a JSON string while handling circular references.
 *
 * @param {any} obj - The object to be converted to a JSON string.
 * @returns {string|undefined} - The JSON string representation of the object, or `undefined` if the object contains circular references.
 * @private
 */
function stringifyJSON(obj: unknown): string | undefined {
  const cache = new Set();
  return JSON.stringify(
    obj,
    function replacer(_, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) return;
        cache.add(value);
      }
      return value;
    },
    2
  );
}

/**
 * A React component that displays the differences between two values.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.who - The identifier of the entity being compared.
 * @param {string} props.summary - A brief summary of the comparison.
 * @param {any} props.prev - The previous value to compare.
 * @param {any} props.next - The next value to compare.
 * @param {React.ReactNode} props.children - The child elements to render within the details element.
 * @returns {JSX.Element} A details element containing the comparison summary and differences.
 * @public
 */
export function Diff({
  who,
  summary,
  prev,
  next,
  children
}: {
  who: string;
  summary: string;
  prev: any;
  next: any;
  children: React.ReactNode;
}): JSX.Element {
  if ('string' !== typeof prev) prev = stringifyJSON(prev);
  if ('string' !== typeof next) next = stringifyJSON(next);

  const title = (
    <>
      <strong>{who}</strong> {summary}
    </>
  );

  const description = (
    <>
      <Diffy oldValue={prev} newValue={next} splitView={true} useDarkTheme={true} />
      {children}
    </>
  );

  return <ListItem item={{ title, description }} />;
}
