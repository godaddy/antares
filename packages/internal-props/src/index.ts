//
// Our build process introduces the version of the package as major, minor, and
// patch variables.
//
declare const major: string;
const namespace = ['$$bento', 'internal', major].filter(Boolean).join('-');

/**
 * Extracts internal properties from a set of properties by removing the
 * specified prefix.
 *
 * @param {string} prefix - The prefix to remove from the properties.
 * @param {[Record<string, any>]} props - The properties to extract from.
 * @returns {[Record<string, any>, string[]]} - A tuple containing the properties
 * without the prefix and the internal properties with the prefix.
 * @private
 */
function explode(prefix: string, props: Record<string, any>): [Record<string, any>, string[]] {
  if (!prefix.endsWith('-')) prefix += '-';

  const result: Record<string, any> = {};
  const remove: string[] = [];
  const keys = Object.keys(props);

  for (const key of keys) {
    if (key.startsWith(prefix)) {
      const newKey = key.slice(prefix.length);

      result[newKey] = props[key];
      remove.push(key);
    }
  }

  return [result, remove];
}

/**
 * Extracts internal properties from a set of properties by removing the
 * specified prefix.
 *
 * @param {Record<string, any>} props - The properties to extract from.
 * @param {string} [prefix=namespace] - The prefix to remove from the properties.
 * @returns {[Record<string, any>, Record<string, any>]} - A tuple containing the
 * properties without the prefix and the internal properties with the prefix.
 * @public
 */
export function useInternalProps(
  props: Record<string, any>,
  prefix: string = namespace
): [Record<string, any>, Record<string, any>] {
  const [internal, remove] = explode(prefix, props);
  const result = { ...props };

  for (const key of remove) {
    delete result[key];
  }

  return [result, internal];
}

/**
 * Converts a set of properties to internal properties by prefixing them with
 * the specified namespace.
 *
 * @param {Record<string, any>} props - The properties to convert.
 * @param {string} [prefix=namespace] - The prefix to use for the internal properties.
 * @returns {Record<string, any>} - The converted properties with the prefix applied.
 * @public
 */
export function toInternalProps(props: Record<string, any>, prefix: string = namespace): Record<string, any> {
  if (!prefix.endsWith('-')) prefix += '-';

  const result: Record<string, any> = {};
  const keys = Object.keys(props);

  for (const key of keys) {
    result[`${prefix}${key}`] = props[key];
  }

  return result;
}
