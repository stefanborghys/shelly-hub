const Model = require('../model/model');

/**
 * Manages Shelly models.
 *
 * @class
 */
class ModelService {
  /**
   * @private
   */
  constructor() {
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
    const valuesIterator = this._models.values();
    let next = valuesIterator.next();
    let foundModel;
    while (!next.done) {
      const model = next.value;
      if (model.identifier === identifier) {
        foundModel = model;
        break;
      }
      next = valuesIterator.next();
    }
    return foundModel;
  }
}

/**
 * Exports a singleton ModelService.
 * Responsible for managing the different Shelly Models known by the hub.
 *
 * @module ModelService
 */
module.exports = new ModelService();
