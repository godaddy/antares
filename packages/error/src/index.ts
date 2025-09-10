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
 * @param message {string} The message to generate the hashtag from.
 * @returns {string} The generated hashtag.
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
 * The arguments for the BentoError class.
 *
 * @interface BentoErrorArgs
 * @property {string} name The name of package that is throwing the error.
 * @property {string} method The name of the function where the error is originating.
 * @property {string} message The actual error message or template.
 * @property {(string | number)[]} [args] Arguments for message formatting when message contains placeholders.
 * @property {string} [channel] The support channel to join for support.
 * @property {string} [docs] The documentation to visit for more information.
 * @property {string} [scope] The scope of the package name.
 */
export interface BentoErrorArgs {
  name: string;
  method: string;
  message: string;
  args?: (string | number)[];
  channel?: string;
  docs?: string;
  scope?: string;

  [key: string]: any;
}

/**
 * Bento specific Error class that provides our developers with additional
 * information on why they see the errors and how they can be resolved.
 *
 * @class
 * @extends {Error}
 *
 * @param {BentoErrorArgs} args - The arguments for the BentoError.
 * @param {string} args.name - The name of package that is throwing the error.
 * @param {string} args.method - The method where the error occurred.
 * @param {string} args.message - The error message or template.
 * @param {(string | number)[]} [args.args] - Arguments for string formatting.
 * @param {string} [args.channel=SUPPORT] - The support channel for further assistance.
 * @param {string} [args.docs=DOCS] - The documentation URL for more information.
 * @param {string} [args.scope=SCOPE] - The scope of the package/name.
 * @param {...any} args.data - Additional data to be assigned to the error object.
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
