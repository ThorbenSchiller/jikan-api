/**
 * Helper Class for stacked errors.
 */
export class StackedError extends Error {
  public constructor(message: string, error: Error) {
    super(message);
    this.stack = this.stack += `\nCaused By:\n${error.stack}`;
  }
}

/**
 * Utility function to create a stacked error in a catch clause.
 * This will only create a stacked error if the caught element is an {@link Error}.
 * Otherwise an {@link Error} will be used with the given message.
 *
 * @param message The message to use.
 * @param e The caught error.
 */
export function createStackedError(message: string, e: unknown): Error {
  if (e instanceof Error) {
    return new StackedError(
      message,
      e
    );
  }
  if (typeof e === "string") {
    return new Error(`${message}\nCaused by: ${e}`);
  }

  return new Error(message);
}
