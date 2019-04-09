export class StackedError extends Error {
    public constructor(message: string, error: Error) {
        super(message);
        this.stack = this.stack += `\nCaused By:\n` + error.stack;
    }
}
