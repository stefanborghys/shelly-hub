const _ = require('lodash');

/**
 * Shelly device model.
 * 
 * @class
 */
class Model {
    _identifier;

    /**
     * Create a new Model.
     * 
     * @private
     * @param {!string} identifier - The model's identifier, e.g. 'SHSW-1'
     * 
     * @throws {TypeError} The identifier should be a string
     * @throws {TypeError} The identifier cannot be empty
     */
    constructor(identifier){
        if(!_.isString(identifier)){
            throw new TypeError('The model identifier is not a string');
        }else if(identifier.length === 0){
            throw new TypeError('The Shelly model identifier cannot be empty');
        }
        this._identifier = identifier;
    }

    /**
     * Returns the model's identifier.
     * 
     * @returns {string} The model's identifier, e.g. 'SHSW-1'
     */
    get identifier(){
        return this._identifier;
    }

    /**
     * Returns the model's string representation based upon it's identifier.
     * 
     * @returns {string} The model's string representation
     */
    toString(){
        return `${this._identifier}`;
    }

    /**
     * Creates a new model based upon an identifier.
     * 
     * @param {!string} identifier - The model's identifier, e.g. 'SHSW-1'
     * 
     * @returns {Model} A new Shelly model
     */
     static of(identifier) {
        return new Model(identifier);
    }

}

/**
 * Exports the Model. 
 * Representing a Shelly device model.
 * 
 * @module Model
 */
module.exports = Model;