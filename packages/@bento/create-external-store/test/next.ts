export interface NextFunction {
  (err?: Error): void;
}

/**
 * Wraps a given function in a callback that returns a promise.
 *
 * @param fn - The function to be wrapped. This function should accept a callback as its argument.
 * @returns A function that, when called, returns a promise which resolves when the original function's callback is called without an error, or rejects if the callback is called with an error.
 */
export function callback(fn: Function) {
  return function promisedACallback() {
    new Promise<void>(function promise(resolve, reject) {
      fn(function next(err?: Error) {
        if (err) return reject(err);
        resolve();
      });
    });
  };
}
