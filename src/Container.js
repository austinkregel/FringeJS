module.exports = class Container {
    constructor() {
        this._bindings = {};
        this._aliases = {};
    }

    _isModule(path) {
        try {
            return require(path)
        } catch (e) {
            return false;
        }
    }

    aliases(bindings) {
        if (Array.isArray(bindings)) {
            throw new Error('I would recommend that you use an object, not an array...')
        }

        if (typeof bindings !== 'object') {
            throw new Error('Right now we can only alias objects with key/value pairs')
        }

        for (let i in bindings) {
            this._aliases[i] = this._build(bindings[i]);
        }
    }

    _isAlias(abstract) {
        return !!this._aliases[abstract];
    }

    _build(abstract) {
        let instance;
        // We only want to build if the item is actionable. If its a module, require it.
        if (instance = this._isModule(abstract)) {
            app.log.debug("Building abstract as a module", {abstract})
            if (instance.hasOwnProperty('register')) {
                app.log.debug('Running the register method', {abstract})
                instance.register();
            }
            return instance;
        }
        // If it's anything other than a module, return it.
        if (this._isAlias(abstract)) {
            app.log.debug("Alias", {abstract})
            return this.alias(abstract);
        }

        app.log.debug("Failed to process the abstract returning the string:",  {abstract})
        return abstract;
    }

    make(abstract, params = []) {
        app.log.debug("I'm attempting to build something:",  {abstract})
        let possibleInstance = this._build(abstract);

        if (typeof possibleInstance === 'function') {
            app.log.debug("The thing is a function...",  {abstract})
            try {
                app.log.debug("Trying to see if it's a constructor:",  {abstract})
                if (params.length === 0) {
                    let instance = new possibleInstance;
                    app.log.debug('Resolved '+ abstract + ' with no params.', {abstract})
                    return instance;
                }
            } catch (e) { }

            try { 
                let newInstance = new possibleInstance(...params)
                app.log.debug('Resolved '+ abstract + ' with params.', {abstract})
                return newInstance;
            } catch (e) {
                app.log.error("Its not a constructor, just returning it!")
            }
        }
        return possibleInstance;
    }

    alias(part) {
        if (this._aliases[part]) {
            return this._aliases[part];
        }

        return null;
    }
}

