
const HANDLE = (error) => {
    /**
     *
     * @type modules.Stacktrace{*}
     */
    let StackHandler = app.make('Stacktrace');

    console.log((new StackHandler(error)).parse().map(frame => frame.code).join("\n"))

    process.exit(1)
};

module.exports = {
    register() {
        process.on('uncaughtException', HANDLE);

        process.on('unhandledRejection', HANDLE);

        throw new Error();;
    }
}