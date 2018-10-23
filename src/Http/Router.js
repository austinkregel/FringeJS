const express = require('express')

const app = express()

let router = require('@kbco/router')(app);

const handler = {
    get (target, prop, receiver) {
        if (router.hasOwnProperty(prop)) {
            return router[prop];
        }

        if (app.hasOwnProperty(prop)) {
            return app[prop]
        }

        return null
    }
};


module.exports = new Proxy(app, handler);
