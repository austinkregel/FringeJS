const chai = require('chai');
const assert = require('assert');
const logger = require('../src/Logger');
const sinon = require('sinon');

describe('Logger methods can be called and actually do stuff', () => {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'debug');
    });

    afterEach(() => sinon.restore());

    it('logs in the proper format for info', () => {
        logger.info('Do the thing Cronk');

        assert(console.log.calledOnce);

        let firstCall = console.log.getCall(0);

        assert.equal('[-]', firstCall.args[0]);
        assert.equal('Do the thing Cronk', firstCall.args[1]);
        assert.equal('object', typeof firstCall.args[2]);
        assert.equal(true, Array.isArray(firstCall.args[2]));
    })

    it('logs in the proper format for error', () => {
        logger.error('Do the thing Cronk');

        assert(console.debug.calledOnce);

        let firstCall = console.debug.getCall(0);

        assert.equal('[!]', firstCall.args[0]);
        assert.equal('Do the thing Cronk', firstCall.args[1]);
        assert.equal('object', typeof firstCall.args[2]);
        assert.equal(true, Array.isArray(firstCall.args[2]));
    })

    it('logs in the proper format for debug', () => {
        logger.debug('Do the thing Cronk');

        assert(console.debug.calledOnce);

        let firstCall = console.debug.getCall(0);

        assert.equal('[+]', firstCall.args[0]);
        assert.equal('Do the thing Cronk', firstCall.args[1]);
        assert.equal('object', typeof firstCall.args[2]);
        assert.equal(true, Array.isArray(firstCall.args[2]));
    })
});