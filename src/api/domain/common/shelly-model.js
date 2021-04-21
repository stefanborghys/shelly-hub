const _ = require('lodash');

/**
 * Shelly device model.
 */
class ShellyModel {
    #identifier;

    constructor(identifier){
        if(!_.isString(identifier)){
            throw new TypeError('The Shelly model identifier is not a string');
        }else if(identifier.length === 0){
            throw new TypeError('The Shelly model identifier cannot be empty');
        }
        this.#identifier = identifier;
    }

    /**
     * Get the model's identifier.
     * 
     * @returns {string} identifer, e.g. 'SHSW-1'
     */
    get identifier(){
        return this.#identifier;
    }

    /**
     * Shelly model string representation based upon it's identifier.
     * 
     * @returns {string} - Shelly model string representation
     */
    toString(){
        return this.#identifier;
    }

    /**
     * Creates a new Shelly model based upon it's identifier.
     * 
     * @param {string} identifier - shelly model identifier, e.g. 'SHSW-1'
     * @returns {ShellyModel} a new Shelly model
     */
     static of(identifier) {
        return new ShellyModel(identifier);
    }

}

module.exports = ShellyModel;