const Model = require('../domain/common/model');

/**
 * Manages Shelly models.
 * 
 * @class
 */
class ModelService {
    _models;

    constructor(){
        this._models = new Set();

        // TODO : replace hard coded creation of models:
        this._models.add(Model.of('SHSW-1'));
        this._models.add(Model.of('SHIX3-1'));
        this._models.add(Model.of('SHSW-25'));
    }

    /**
     * Search for a Shelly model by identifier.
     * 
     * @param {string} identifier - Shelly model identifier
     * 
     * @returns {Model|undefined} Shelly model or undefined when not found
     */
    findModel(identifier) {
        if(identifier){
            for (let model of this._models.values()){
                if(model.identifier === identifier){
                    return model;
                }
            }
        }
        return undefined;
    }

}

/**
 * Exports a singleton ModelService.
 * 
 * @module ModelService
 */
module.exports = new ModelService();