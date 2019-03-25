/**
 * @type {module.Container|*}
 */
const Application = require('./src/Container');

global.app = new Application();

app.log = require('./src/Logger');

const ConfigServiceProvider = require('./src/Config/ConfigServiceProvider');
let config = new ConfigServiceProvider();

app.aliases({
    'Router': '../src/Http/Router',
    'Config': config
});

