
class Stacktrace {
    constructor(error) {
        this._message = '';
        this._error = error
        this._brokenStackTrace = [];
        this._brokenMap = [];
        this.codeFrames = [];
        this.NUMBER_OF_LINES_TO_DISPLAY = 5;
    }

    _breakUpTheStacks() {
        this._brokenStackTrace = this._error.stack.split('\n').map(item => item.trim());
        this._message = this._error.message;

        return this;
    }

    _parseFrame(frame) {
        let match = (new RegExp('\\(.*?\\)+$')).exec(frame)
        let file = null;
        let line = null;

        if (Array.isArray(match)) {
            file = match[0].replace(/^\(/, '')
            // Remove the trailing paren
                .replace(/\)$/, '');
            // Remove the line and column number
            line = file.match(/[\d\:\d]+/g)[0].split(':')[1];
            file = file.replace(/[\:\d\:\d]+/g, '');
        }

        return [null, file, parseInt(line)];
    }

    _getFilesFromBrokenMap() {
        this._brokenMap = this._brokenStackTrace.map(frame => this._parseFrame(frame))
            .map((codeframe) => {
                let [bit, file, line] = codeframe;
                let code = this._readFromFile(codeframe);
                return new Codeframe(file, line, code, codeframe)
            })
    }

    /**
     * @param frame
     * @private
     */
    _readFromFile(frame) {
        let [_, file, line] = frame;
        let fs = app.make('fs')
        let contents = fs.readFileSync(file, 'UTF-8').split("\n");
        let currentLine = 0;
        let lines = {};
        for (let offset in contents) {
            currentLine++;
            if ((currentLine - line) > this.NUMBER_OF_LINES_TO_DISPLAY && (currentLine - line) < this.NUMBER_OF_LINES_TO_DISPLAY) {
                lines[currentLine] = contents[offset];
            }
        }

        return lines;
    }

    parse(stacktrace = null) {
        this._breakUpTheStacks();
        this._getFilesFromBrokenMap();
        return this.codeFrames;
    }
}

module.exports = Stacktrace;