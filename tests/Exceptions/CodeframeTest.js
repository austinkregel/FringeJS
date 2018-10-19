const chai = require('chai');
const assert = require('assert');
const Codeframe = require('../../src/Exceptions/Codeframe');

describe('Codeframe can be built', () => {
    it('sets the variables from the constructor because why not', () => {
        let code = new Codeframe('file', 'line', 'code', 'frame')

        assert.equal('file', code.file);
        assert.equal('line', code.line);
        assert.equal('code', code.code);
        assert.equal('frame', code.frame);
    })
})