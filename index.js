/**
 * @type {module.Container|*}
 */
const Application = require('./src/Container');
const ErrorHandler = require('./src/Exceptions/Handler');

global.app = new Application();

app.log = require('./src/Logger');

ErrorHandler.register();

app.aliases({
    'Router': '../src/Http/Router'
});
