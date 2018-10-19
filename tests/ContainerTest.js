const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');
const Container = proxyquire
    .noCallThru()
    .load('../src/Container', {
        'test-a-thing-that-might-exist': {
            register() {

            }
        } 
    });

chai.use(chaiHttp);

describe('We can build the container', () => {
    beforeEach(function() {
        global.app = {
            log: {
                debug(message, context) {
                }
            }
        }
        sinon.spy(app.log, 'debug');
    });

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore();
    });

    it('should error out when we try to pass a aliases an array', (done) => {
        let contain = new Container();

        chai.expect(() => {
            contain.aliases([])
        }).to.throw('I would recommend that you use an object, not an array...');

        done();
    });
    
    it('should error out when we try to pass a aliases an array', (done) => {
        let contain = new Container();

        chai.expect(() => {
            contain.aliases('Some string')
        }).to.throw('Right now we can only alias objects with key/value pairs');

        done();
    });

    it('should resolve an alias properly', (done) => {
        let contain = new Container();

        let aliases = {
            item: () => {}
        };

        contain.aliases(aliases)
        assert(app.log.debug.calledOnce);

        assert.equal('Failed to process the abstract returning the string:', app.log.debug.getCall(0).args[0]);
        assert.equal('function', typeof app.log.debug.getCall(0).args[1].abstract);
        
        done();
    });

    it('should return null if the alias is not set', () => {
        let contain = new Container();

        let alias = contain.alias('thing')

        assert.strictEqual(null, alias)
    });

    it('should not return null if the alias is set', () => {
        let contain = new Container();

        contain.aliases({
            thing: '() => {}'
        })

        let alias = contain.alias('thing')

        assert.strictEqual('() => {}', alias)
    });
    
    it('should call the constructor if a class is given', () => {
        let contain = new Container();

        contain.aliases({
            thing: '../src/Container'
        })

        let newContainer = contain.make('thing', {});
        console.log({newContainer})
    });

    it('should resolve a module', (done) => {
        let contain = new Container();

        let fs = contain.make('fs');

        assert(app.log.debug.calledTwice);

        assert.equal('I\'m attempting to build something:', app.log.debug.getCall(0).args[0]);
        assert.equal('fs',  app.log.debug.getCall(0).args[1].abstract);
       
        assert.equal('Building abstract as a module', app.log.debug.getCall(1).args[0]);
        assert.equal('fs',  app.log.debug.getCall(1).args[1].abstract);
       
        done();
    });


    it('should resolve a sub-module', (done) => {
        let contain = new Container();

        let fs = contain.make('test-a-thing-that-might-exist');

        assert(app.log.debug.calledThrice);

        assert.equal('I\'m attempting to build something:', app.log.debug.getCall(0).args[0]);
        assert.equal('test-a-thing-that-might-exist',  app.log.debug.getCall(0).args[1].abstract);
       
        assert.equal('Building abstract as a module', app.log.debug.getCall(1).args[0]);
        assert.equal('test-a-thing-that-might-exist',  app.log.debug.getCall(1).args[1].abstract);
       
        assert.equal('Running the register method', app.log.debug.getCall(2).args[0]);
        assert.equal('test-a-thing-that-might-exist', app.log.debug.getCall(2).args[1].abstract);

        done();
    });
});