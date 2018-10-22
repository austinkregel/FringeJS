
const HANDLE = (error) => {
    /**
     *
     * @type modules.Stacktrace{*}
     */
    let StackHandler = app.make('Stacktrace', [error]);

    console.log(StackHandler.parse().map(frame => frame.code).join("\n"))
};

module.exports = {
    register() {
        process.on('uncaughtException', HANDLE);

        process.on('unhandledRejection', HANDLE);
    }
}