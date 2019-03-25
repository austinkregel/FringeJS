const fs = require('fs');
const path = require('path');

module.exports = class ConfigServiceProvider {
    register(part_) {
        let config = {};

        fs.readdirSync(part_)
            .filter(path => path.includes('.js'))
            .map(part => part_ + '/' + part)
            .map(part => {
                let file = path.basename(part).replace('.js','')

                config[file] = require(part)
            })

        return config;
    }
}