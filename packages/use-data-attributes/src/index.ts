import { useDeepCompareMemo } from 'use-deep-compare';
import { stringify } from '@bento/to-attribute-value';
import dashify from 'dashify';

/**
 * Transforms the keys of a given type to be prefixed with 'data-' and ensures the values are strings.
 *
 * @template Type - The original type whose keys will be transformed.
 * @typedef {Object} DataPrefix
 * @property {string} [data-${string & Property}] - The transformed keys prefixed with 'data-' and their corresponding string values.
 */
type DataPrefix<Type> = {
  [Property in keyof Type as `data-${string & Property}`]: string;
};

/**
 * A custom hook that generates data attributes from the given props object.
 * It uses deep comparison memoization to optimize performance.
 *
 * @param {object} props - The input object containing key-value pairs to be converted into data attributes.
 * @returns {object} - An object with keys formatted as data attributes and their corresponding stringified values.
 * @public
 */
export function useDataAttributes<Props extends Record<string, unknown>>(props: Props): DataPrefix<Props> {
  return useDeepCompareMemo(
    function createAttributes() {
      return Object.keys(props).reduce(function reduceAttributes(data: Record<string, string>, key) {
        const value = stringify(props[key]);

        if (!value) return data;
        if (!key.startsWith('data-')) key = 'data-' + key;

        data[dashify(key)] = value;
        return data;
      }, {}) as DataPrefix<Props>;
    },
    [props]
  );
}
