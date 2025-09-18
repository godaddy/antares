const DOCS = 'example.com/docs/errors';
const SUPPORT = 'bento-support';
const SCOPE = '@bento';

/**
 * Replaces %s placeholders in a template string with provided arguments.
 * Extra placeholders without corresponding arguments remain as %s.
 *
 * @param template - The template string with %s placeholders.
 * @param args - The values to substitute.
 * @returns The formatted string.
 * @private
 */
function replacePlaceholders(template: string, args: (string | number)[]): string {
  let index = 0;
  return template.replace(/%s/g, function replace() {
    const arg = args[index++];
    return arg !== undefined ? String(arg) : '%s';
  });
}

/**
 * Generate a small but consistent hashtag from the given message. This can
 * be used as unique identifier for the error documentation.
 *
 * @param message - The message to generate the hashtag from.
 * @returns The generated hashtag.
 * @private
 */
function hashtag(message: string): string {
  let i = 0,
    hash = 0;
  for (; i < message.length; hash = message.charCodeAt(i++) + ((hash << 5) - hash));

  const color = Math.floor(Math.abs(((Math.sin(hash) * 10000) % 1) * 16777216)).toString(16);
  return ('#' + Array(6 - color.length + 1).join('0') + color).toUpperCase();
}

/**
 * The arguments for the {@link BentoError} class.
 */
export interface BentoErrorArgs {
  /** The name of the package that is throwing the error. */
  name: string;

  /** The name of the method that is throwing the error. */
  method: string;

  /** The message that will be displayed to the user. */
  message: string;

  /**
   * The arguments to be substituted into the message template.
   * This is useful when you want to use %s placeholders in the message.
   */
  args?: (string | number)[];

  /**
   * The support channel that the user can use to get help.
   * This is useful when you want to provide a direct link to the support channel that is related to the error.
   *
   * @default SUPPORT(#bento-support)
   */
  channel?: string;

  /**
   * The link to the documentation that is related to the error.
   * This is useful when you want to provide more information about the error.
   *
   * @default DOCS(https://bento.bento/docs)
   */
  docs?: string;

  /**
   * The scope of the supplied package name.
   * This is useful when you want to provide more context to the error.
   *
   * @default SCOPE(@bento)
   */
  scope?: string;

  /** Additional data to be assigned to the error object. */
  [key: string]: any;
}

/**
 * Bento specific Error class that provides our developers with additional
 * information on why they see the errors and how they can be resolved.
 *
 * @class
 * @extends {Error}
 *
 * @param args - The arguments {@link BentoErrorArgs} for the BentoError.
 *
 * @example
 * // Basic usage
 * throw new BentoError({
 *   name: 'NotFoundError',
 *   method: 'getData',
 *   message: 'Data not found'
 * });
 *
 * @example
 * // Using %s placeholders
 * throw new BentoError({
 *   name: 'slots',
 *   method: 'withSlots',
 *   message: 'The supplied component %s has already been registered.',
 *   args: ['MyComponent']
 * });
 */
export class BentoError extends Error {
  [key: string]: any;
  constructor({
    name,
    method,
    message,
    args = [],
    channel = SUPPORT,
    docs = DOCS,
    scope = SCOPE,

    ...data
  }: BentoErrorArgs) {
    // Format the message with arguments if provided
    const formattedMessage = args.length > 0 ? replacePlaceholders(message, args) : message;

    super(
      [
        `${scope}/${name}(${method}): ${formattedMessage}`,
        '',
        `For more information visit: https://${docs}/${hashtag([name, method, message].join('-'))}`,
        '',
        `Need more help? Join our support channel #${channel}.`
      ].join('\n')
    );

    if (data) Object.assign(this, data);

    this.name = 'BentoError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
