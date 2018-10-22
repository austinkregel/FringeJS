const fs = require('fs');
const chalk = require('chalk');
class Stacktrace {
    /**
     * @param {string} error 
     */
    constructor(error) {
        this._message = '';
        this._error = error
        this._brokenStackTrace = [];
        this._brokenMap = [];
        this.codeFrames = [];
        this.NUMBER_OF_LINES_TO_DISPLAY = 5;
    }

    /**
     * @returns {self}
     */
    _breakUpTheStacks() {
        this._brokenStackTrace = this._error.stack.split('\n').map(item => item.trim());
        this._message = this._error.message;

        return this;
    }

    /**
     * @param {string} frame 
     * @returns {array}
     */
    _parseFrame(frame) {
        let match = (new RegExp('\\(.*?\\)+$')).exec(frame)
        let file = null;
        let filePatern;
        let line = null;

        if (Array.isArray(match)) {
            filePatern = match[0].replace(/^\(/, '')
            // Remove the trailing paren
                .replace(/\)$/, '');
            // Remove the line and column number
            line = filePatern.match(/[\d\:\d]+/g)[0].split(':')[1];
            file = filePatern.replace(/[\:\d\:\d]+/g, '');
            return [null, file, parseInt(line)]
        }

        return [null, file, parseInt(line)];
    }

    /**
     * @returns {void}
     */
    _getFilesFromBrokenMap() {
        this._brokenMap = this._brokenStackTrace.map(frame => (this._parseFrame(frame)))
            // .filter(trace => trace.length < 3 || trace.length > 3)
            .filter(trace => trace[1] !== null)
            .map((codeframe) => {
                let [bit, file, line] = codeframe;
                app.log.debug("Getting data from frame:",  {bit, file, line})

                let code = this._readFromFile(codeframe);
                return new (app.make('Codeframe'))(file, line, code, codeframe)
            })

    }

    /**
     * @param {array} frame
     * @private
     */
    _readFromFile(frame) {
        let [_, file, line] = frame;
        if (!file.startsWith('/')) {
            app.log.debug('The given file was not a real file, and thus skipped.', {file})
            return;
        }
        let contents = fs.readFileSync(file, 'UTF-8').split("\n");
        let currentLine = 0;
        var lines = {};
        for (let offset in contents) {
            currentLine++;
            if ((currentLine - line) < this.NUMBER_OF_LINES_TO_DISPLAY && (currentLine - line) > -this.NUMBER_OF_LINES_TO_DISPLAY) {
                let text = contents[offset];
                let color = currentLine === line ? 'red' : ((currentLine === line +1 || currentLine=== line-1) ? 'yellow': 'bgBlackBright')

                lines[currentLine] = chalk.bgWhite(chalk[color](text));
            }
        }

        return app.log.code(Object.values(lines).join("\n"));
    }

    /**
     * @param {string} stacktrace 
     */
    parse(stacktrace = null) {
        this._breakUpTheStacks();
        this._getFilesFromBrokenMap();
        return this._brokenMap;
    }
}

module.exports = Stacktrace;