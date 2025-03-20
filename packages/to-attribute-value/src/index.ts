import dashify from 'dashify';

/**
 * Converts a given value to a string representation suitable for use in attributes.
 *
 * The function handles different types of values as follows:
 *
 * - `number`, `string`, `boolean`: Converts the value to a string using `toString()`.
 * - `undefined`, `null`: Returns `undefined` to prevent these values from being added to data attributes.
 * - `array`: Converts the array to a whitespace-separated list of words.
 * - `object`: Converts the object to a string by formatting each key-value pair as `key(value)`.
 * - Other types: Uses `JSON.stringify` to convert the value to a string.
 *
 * @param {any} value - The value to be converted. It can be of any type.
 * @param {string} [separator] - The separator to be used when joining array values. Defaults to a whitespace.
 * @param {Set} [seen] - A set of values that have already been processed to prevent circular references.
 * @returns {string} Representation of the value, or `undefined` if the value is `null` or `undefined`.
 * @public
 */
export function stringify(value: any = undefined, separator = ' ', seen = new WeakSet()): string | undefined {
  if (seen.has(value)) return '[circular]';

  switch (Object.prototype.toString.call(value).toLowerCase().slice(8, -1)) {
    //
    // Handle the most common cases first, these are the most likely to be
    // used in the data attributes.
    //
    case 'number':
    case 'string':
      return value.toString();

    //
    // When a `true` boolean is given we need to only include the name of the
    // attribute in the data attributes. Assignment of value can be skipped,
    // this unique case means that we should not return a string as value.
    //
    // When a `false` boolean is given we should not include the attribute
    // in the data attributes at all. Following the same pattern as the `null`.
    //
    case 'boolean':
      return value ? value.toString() : undefined;

    //
    // We want to make sure we prevent any null or undefined values from being
    // added to the data attributes. These attributes should not be added to the
    // DOM if they are not defined.
    //
    case 'undefined':
    case 'null':
      return;

    //
    // Arrays should be transformed to a whitespace-separated list of words.
    // Which is also supported by the CSS selector pattern.
    //
    case 'array':
      seen.add(value);
      return value
        .map(function arrayMap(content: any) {
          return stringify(content, separator, seen);
        })
        .join(separator);

    //
    // There are no known patterns for transforming an object to a string. The
    // closest pattern that we can align to how function are formatted in CSS.
    // In this case we want to use the key of the object as the function name
    // and the value as the argument.
    //
    // The added benefit is that we can then re-use the stringify function to
    // generate future CSS or SVG transformations.
    //
    case 'object':
      seen.add(value);
      return stringify(
        Object.entries(value).map(function map([key, value]) {
          return `${dashify(key)}(${stringify(value, separator, seen)})`;
        }),
        separator,
        seen
      );

    //
    // For everything else, we should defer the transformation process to
    // the native JSON.stringify method. This should catch all the remaining
    // edge cases.
    //
    default: {
      seen.add(value);
      const result = JSON.stringify(value);

      if (result === '{}') return undefined;
      return result;
    }
  }
}
