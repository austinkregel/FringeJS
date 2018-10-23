const Stacktrace = require('./Stacktrace')

const HANDLE = (error) => {
    /**
     *
     * @type modules.Stacktrace{*}
     */
    let StackHandler = new Stacktrace(error);

    console.log(error.message);
    console.log(StackHandler.parse().map(frame => frame.code).join("\n"))
};

module.exports = {
    register() {
        process.on('uncaughtException', HANDLE);

        process.on('unhandledRejection', HANDLE);
    }
}