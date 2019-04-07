const express = require('express')

const application = express()

let router = require('@kbco/router')(application);

const handler = {
    get (target, prop, receiver) {
        if (prop === 'express') {
            return application;
        }

        if (prop === 'router') {
            return router;
        }

        if (typeof router[prop] === 'function') {
            return router[prop];
        }

        if (typeof application[prop] === 'function') {
            return application[prop]
        }

        return null
    }
};


module.exports = new Proxy(application, handler);
