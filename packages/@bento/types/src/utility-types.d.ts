/**
 * Represents an object with string keys and any values.
 *
 * @public
 */
export type AnyObject = Record<string, any>;

/**
 * Represents an object with string keys and unknown values.
 * Safer alternative to AnyObject when the value types are not known.
 *
 * @public
 */
export type UnknownObject = Record<string, unknown>;
