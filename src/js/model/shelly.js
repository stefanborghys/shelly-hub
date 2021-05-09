/**
 * Provides basic information about a physical Shelly device found in the local network.
 *
 * @class
 * @since 1.0.0
 */
class Shelly {
  /**
   * Create a new Shelly device.
   *
   * @private
   * @param {!string} identifier - The Shelly model's identifier, e.g. 'SHSW-1'
   * @param {!string} mac - The device's MAC address, e.g. 'E098068D069E'
   * @param {!string} ip - The device's IP address, e.g. '192.168.1.7'
   * @param {!boolean} authenticationRequired - Is authentication required for HTTP API requests
   * @param {!string} firmwareVersion - The current firmware version, e.g. '20210115-102904/v1.9.4@e2732e05'
   */
  constructor(identifier, mac, ip, authenticationRequired, firmwareVersion) {
    this._identifier = identifier;
    this._mac = mac;
    this._ip = ip;
    this._authenticationRequired = authenticationRequired;
    this._firmwareVersion = firmwareVersion;
  }

  /**
   * Creates a new Shelly device representation.
   * Based upon the basic information a physical device publicly makes available.
   *
   * @param {!string} type - The model identifier, e.g. 'SHSW-1'
   * @param {!string} mac - The MAC address, e.g. 'E098068D069E'
   * @param {!string} ip - The device's IP address, e.g. '192.168.1.7'
   * @param {!boolean} auth - Is authentication required for HTTP requests
   * @param {!string} fw - The current firmware version, e.g. '20210115-102904/v1.9.4@e2732e05'
   *
   * @returns {Shelly} A new Shelly device representation
   * @since 1.0.0
   */
  static of(type, mac, ip, auth, fw) {
    return new Shelly(type, mac, ip, auth, fw);
  }

  /**
   * Returns the model identifier.
   *
   * @returns {string} The model identifier, e.g. 'SHSW-1'
   * @since 1.0.0
   */
  get identifier() {
    return this._identifier;
  }

  /**
   * Returns the MAC address.
   *
   * @returns {string} The MAC address, e.g. 'E098068D069E'
   * @since 1.0.0
   */
  get mac() {
    return this._mac;
  }

  /**
   * Returns the IP address.
   *
   * @returns {string} The IP address, e.g. '192.168.1.7'
   * @since 1.0.0
   */
  get ip() {
    return this._ip;
  }

  /**
   * Returns whether the device requires authentication to allow HTTP API requests.
   *
   * @returns {boolean} True if authentication is required, otherwise false
   * @since 1.0.0
   */
  get isAuthenticationRequired() {
    return this._authenticationRequired;
  }

  /**
   * Returns the current firmware version.
   *
   * @returns {string} The firmware version, e.g. '20210115-102904/v1.9.4@e2732e05'
   * @since 1.0.0
   */
  get firmwareVersion() {
    return this._firmwareVersion;
  }

  /**
   * Returns the shelly's string representation.
   *
   * @returns {string} The shelly's string representation
   * @since 1.0.0
   */
  toString() {
    return `${this._ip} ${this._mac} ${this.firmwareVersion} ${this._identifier}`;
  }
}

/**
 * Exports Shelly, a (physical) device representation.
 * Containing basic information about it's current state.
 *
 * @module
 * @since 1.0.0
 */
module.exports = Shelly;
