const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');
const Codeframe = require('../src/Exceptions/Codeframe');
const Container = proxyquire
    .noCallThru()
    .load('../src/Container', {
        'test-a-thing-that-might-exist': {
            register() {

            }
        } 
    });

describe('We can build the container and do stuff with it', () => {
    beforeEach(function() {
        global.app = {
            log: {
                debug(message, context) {
                },
                error(message, context) {
                }
            }
        }
        sinon.spy(app.log, 'debug');
        sinon.spy(app.log, 'error');
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

        let newContainer = contain.make('thing');

        assert.deepEqual(newContainer, new Container())
    });

    it('should pass through the parameters given to the constructor', () => {
        let contain = new Container();

        contain.aliases({
            test: '../src/Exceptions/Codeframe'
        })

        let testThing = contain.make('test', [
            'file', 
            'line', 
            'code', 
            'frame',
        ])

        assert.equal('Building abstract as a module', app.log.debug.getCall(0).args[0]);

        assert.equal("I'm attempting to build something:", app.log.debug.getCall(1).args[0]);
        assert.equal("Alias", app.log.debug.getCall(2).args[0]);
        assert.equal("The thing is a function...", app.log.debug.getCall(3).args[0]);
        assert.equal("Trying to see if it's a constructor:", app.log.debug.getCall(4).args[0]);
        assert.equal("Resolved test with params.", app.log.debug.getCall(5).args[0]);


        assert.deepEqual(new Codeframe('file', 'line', 'code', 'frame'), testThing)
    });

    it('should error and return the built instance', () => {
        let contain = new Container();

        contain.aliases({
            test() {}
        })

        let testThing = contain.make('test')

        assert.equal('Its not a constructor, just returning it!', app.log.error.getCall(0).args[0])

        assert.equal('function', typeof testThing)
    })

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