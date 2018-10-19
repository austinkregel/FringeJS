/**
 * @type {module.Container|*}
 */
const Application = require('../src/Container');

global.app = new Application();

app.log = require('../src/Logger');

app.aliases({
    'Stacktrace': '../src/Exceptions/Stacktrace',
    'Codeframe': '../src/Exceptions/Codeframe',
    'handler': '../src/Exceptions/Handler',
    'Router': '../src/Http/Router'
});

let fs = app.make('fs');
