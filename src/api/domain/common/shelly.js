const ShellyModel  = require('./shelly-model');
const ShellyModelService = require('../../services/shelly-model-service');

/**
 * Provides basic information about the device.
 */
class Shelly {
  /**
     * Provides basic information about the device.
     *
     * @param {ShellyModel} model - shelly model
     * @param {string} mac - device's MAC address, e.g. 'E098068D069E'
     * @param {boolean} requireAuthentication - require's authentication for HTTP requests
     * @param {string} firmwareVersion - current firmware version, e.g. '20210115-102904/v1.9.4@e2732e05'
     * @param {number} longid - long id,  - 1 if the device identifies itself with it's full MAC address
     *                                    - 0 if only the last 3 bytes are used
     */
  constructor(model, mac, requireAuthentication, firmwareVersion, longid) {
    this._model = model;
    this._mac = mac;
    this._requireAuthentication = requireAuthentication;
    this._firmwareVersion = firmwareVersion;
    this._longid = longid;
  }

  /**
   * Creates a new Shelly device based upon the basic information a physical device provides. 
   * 
   * @param {string} type - shelly model identifier, e.g. 'SHSW-1'
   * @param {string} mac - device's MAC address, e.g. 'E098068D069E'
   * @param {boolean} auth - require's authentication for HTTP requests
   * @param {string} fw - current firmware version, e.g. '20210115-102904/v1.9.4@e2732e05'
   * @param {number} longid - long id,  - 1 if the device identifies itself with it's full MAC address
   *                                    - 0 if only the last 3 bytes are used
   * @returns 
   */
  static of(type, mac, requireAuthentication, firmwareVersion, longid){
    const shellyModel = ShellyModelService.getShellyModelByIdentifier(type);
    if()

    return new Shelly(shellyModel, mac, requireAuthentication, firmwareVersion, longid);
  }

  /**
     * Shelly model.
     *
     * @returns {ShellyModel} Shelly model
     */
  get model() {
    return this._model;
  }

  /**
     * MAC address of the device.
     *
     * @returns MAC address
     */
  get mac() {
    return this.mac;
  }

  /**
     * Whether HTTP requests require authentication.
     *
     * @returns authentication required
     */
  get requireAuthentication() {
    return this.requireAuthentication;
  }

  /**
     * Current firmware version.
     *
     * @returns firmware version
     */
  get firmwareVersion() {
    return this.firmwareVersion;
  }

  /**
     * 1 if the device identifies itself with its full MAC address;
     * 0 if only the last 3 bytes are used
     *
     * @returns 0 or 1
     */
  get longId() {
    return this.longid;
  }
}

module.exports =  Shelly;
