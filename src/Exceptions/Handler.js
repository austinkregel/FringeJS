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
        // As much as I don't want to disable this because functionallity, I must since it makes debugging (for now) a pain.
        //process.on('uncaughtException', HANDLE);
        //process.on('unhandledRejection', HANDLE);
    }
}
