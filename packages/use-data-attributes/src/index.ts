import { useDeepCompareMemo } from 'use-deep-compare';
import { stringify } from '@bento/as-attribute-value';
import dashify from 'dashify';

/**
 * A custom hook that generates data attributes from the given props object.
 * It uses deep comparison memoization to optimize performance.
 *
 * @param {object} props - The input object containing key-value pairs to be converted into data attributes.
 * @returns {object} - An object with keys formatted as data attributes and their corresponding stringified values.
 * @public
 */
export function useDataAttributes(props: { [key: string]: any }): object {
  return useDeepCompareMemo(
    function createAttributes() {
      return Object.keys(props).reduce(function reduceAttributes(data: { [key: string]: any }, key) {
        const value = stringify(props[key]);

        if (!value) return data;
        if (!key.startsWith('data-')) key = 'data-' + key;

        data[dashify(key)] = value;
        return data;
      }, {});
    },
    [props]
  );
}
