const express = require('express')

const app = express()

let router = require('@kbco/router')(app);

const handler = {
    get (target, prop, receiver) {
        if (prop === 'express') {
            return app;
        }

        if (typeof router[prop] === 'function') {
            return router[prop];
        }

        if (typeof app[prop] === 'function') {
            return app[prop]
        }

        return null
    }
};


module.exports = new Proxy(app, handler);
