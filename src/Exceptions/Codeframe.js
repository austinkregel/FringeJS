module.exports = class Codeframe {
    constructor(file, line, code, frame) {
        this.file = file;
        this.line = line;
        this.code = code;
        this.frame = frame;
    }
}