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
            return instance;
        }
        // If it's anything other than a module, return it.
        if (this._isAlias(abstract)) {
            return this.alias(abstract);
        }

        return abstract;
    }

    make(abstract, params = {}) {
        let thing = this._build(abstract);
        if (typeof thing === 'function') {
            try {
                return new thing(...params)
            } catch (e) {
                return thing(...params)
            }
        }

        return abstract;
    }

    alias(part) {
        if (this._aliases[part]) {
            return this._aliases[part];
        }

        return null;
    }
}

