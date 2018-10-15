
const HANDLE = (error) => {
    /**
     *
     * @type modules.Stacktrace{*}
     */
    let StackHandler = app.make('Stacktrace');

    console.log((new StackHandler(error)).parse())

    // let stackframe = error.stack.split('\n').map((line) => {
    //     let group = {};
    //     let match = (new RegExp('\\(.*?\\)+$')).exec(line)
    //     if (Array.isArray(match)) {
    //         group['path'] = match[0]
    //         // Remove the starting paren
    //         group['path'] = group['path'].replace(/^\(/, '')
    //             // Remove the trailing paren
    //             .replace(/\)$/, '');
    //             // Remove the line and column number
    //         let line = group['path'].match(/[\d\:\d]+/g)[0];
    //
    //
    //         group['path'] = group['path'].replace(/[\:\d\:\d]+/g, '');
    //         group['bit'] = line.split(':')[1]
    //     }
    //
    //     match = (new RegExp('^\\s*?at\\s*(\\S*?)\\s')).exec(line);
    //
    //     if (Array.isArray(match)) {
    //         group['line'] = match[1]
    //     }
    //
    //     return group;
    // })

    process.exit(1)
};

module.exports = {
    register() {
        process.on('uncaughtException', HANDLE);

        process.on('unhandledRejection', HANDLE);
    }
}