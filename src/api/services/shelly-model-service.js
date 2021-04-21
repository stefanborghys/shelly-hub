const ShellyModel = require('../domain/common/shelly-model');

class ShellyModelService {
    #shellyModels;

    constructor(){
        this.#shellyModels = new Set();

        this.#shellyModels.add(ShellyModel.of('SHSW-1'));
        this.#shellyModels.add(ShellyModel.of('SHIX3-1'));
        this.#shellyModels.add(ShellyModel.of('SHSW-25'));
    }

    /**
     * Search for a Shelly model by given identifier.
     * 
     * @param {string} identifier - Shelly model identifier
     * @returns {ShellyModel|undefined} Shelly model or undefined when not found
     */
    getShellyModelByIdentifier(identifier) {
        if(identifier){
            for (let shellyModel of this.#shellyModels.values()){
                if(shellyModel.identifier === identifier){
                    return shellyModel;
                }
            }
        }
        return undefined;
    }

}

/**
 * Exports Singleton ShellyModelService.
 */
module.exports = new ShellyModelService();