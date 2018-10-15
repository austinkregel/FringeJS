/**
 * @type {module.Container|*}
 */
const Application = require('../src/Container');

global.app = new Application();

app.aliases({
    'Frun': '../src/Exceptions/Stacktrace',
    'Stacktrace': '../src/Exceptions/Stacktrace',
    'Codeframe': '../src/Exceptions/Codeframe',
    'handler': '../src/Exceptions/Handler',
    'Router': '../src/Http/Router'
});

console.log(app.make('fs'));