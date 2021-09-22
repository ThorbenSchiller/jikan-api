import {createStackedError, StackedError} from "./StackedError";

describe("StackedError", () => {
  it("should create a StackedError correctly",  () => {
    const error = new Error();
    const message = "foo";
    const stackedError = new StackedError(message, error);

    expect(stackedError.message).toEqual(message);
    expect(stackedError.stack).toMatch(`Caused By:\n${error.stack}`);
  });
});

describe("createStackedError", () => {
  it("should create a StackedError correctly with an error provided",  () => {
    const error = new Error();
    const message = "foo";
    const stackedError = createStackedError(message, error);

    expect(stackedError.message).toEqual(message);
    expect(stackedError.stack).toMatch(`Caused By:\n${error.stack}`);
    expect(stackedError instanceof StackedError).toEqual(true);
  });

  it("should create a StackedError correctly with a string provided",  () => {
    const error = "bar";
    const message = "foo";
    const stackedError = createStackedError(message, error);

    expect(stackedError.message).toEqual(`${message}\nCaused by: ${error}`);
    expect(stackedError instanceof StackedError).toEqual(false);
  });

  it("should create a StackedError correctly with neither provided",  () => {
    const error = null;
    const message = "foo";
    const stackedError = createStackedError(message, error);

    expect(stackedError.message).toEqual(message);
    expect(stackedError instanceof StackedError).toEqual(false);
  });
});
