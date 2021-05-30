const crypto = require('crypto');

const ValidationError = require('./error/validationError');
const BasicAuthentication = require('./basicAuthentication');
const IpV4Address = require('./ipV4Address');

const ShellyService = require('../service/shellyService');
const StatusService = require('../service/statusService');

/**
 * Shelly device managed by the hub.
 *
 * @class
 * @since 1.0.0
 */
class Device {
  constructor(identifier, ipV4Address, basicAuthentication = undefined, id = crypto.randomBytes(10).toString('hex')) {
    this._identifier = Device.validateIdentifier(identifier);
    this._ipV4Address = Device.validateIpV4Address(ipV4Address);
    this._basicAuthentication = Device.validateBasicAuthentication(basicAuthentication);
    this._id = id;
  }

  static validateIdentifier(identifier) {
    if (!identifier) {
      throw new ValidationError('The identifier is mandatory and cannot be empty');
    } else if (typeof identifier !== 'string') {
      throw new TypeError('The identifier is not of type string');
    }
    return identifier;
  }

  static validateIpV4Address(ipV4Address) {
    if (!(ipV4Address instanceof IpV4Address)) {
      throw new TypeError('The ipV4Address is not of type IpV4Address');
    }
    return ipV4Address;
  }

  static validateBasicAuthentication(basicAuthentication) {
    if (!basicAuthentication) {
      return basicAuthentication;
    } if (!(basicAuthentication instanceof BasicAuthentication)) {
      throw new TypeError('The basicAuthentication is not of type BasicAuthentication');
    }
    return basicAuthentication;
  }

  static async of(ip, userId, password) {
    const ipV4Address = IpV4Address.of(ip);
    return ShellyService.searchForShellyOnIpAddress(ip).then((shelly) => {
      const { identifier, isAuthenticationRequired } = shelly;

      if (isAuthenticationRequired) {
        const basicAuthentication = BasicAuthentication.of(userId, password);
        return new Device(identifier, ipV4Address, basicAuthentication);
      }
      return new Device(identifier, ipV4Address);
    }).then(async (device) => {
      if (device.hasAuthentication) {
        // verify authentication by performing an authenticated status request
        await StatusService.getStatus(device);
      }
      return device;
    });
  }

  /**
   * Returns the id.
   *
   * @returns {string} The device's unique id, e.g. '12345678'
   * @since 1.0.0
   */
  get id() {
    return this._id;
  }

  /**
   * Returns the model identifier.
   *
   * @returns {string} The device's model identifier, e.g. 'SHSW-1'
   * @since 1.0.0
   */
  get identifier() {
    return this._identifier;
  }

  /**
   * Returns the device's IP v4 address.
   *
   * @returns {IpV4Address} The device's IP v4 address
   * @since 1.0.0
   */
  get ipV4Address() {
    return this._ipV4Address;
  }

  set ipV4Address(ipV4Address) {
    this._ipV4Address = Device.validateIpV4Address(ipV4Address);
  }

  /**
   * Returns the device's basic authentication.
   *
   * @returns {BasicAuthentication | undefined} The device's basic authentication, if provided
   * @since 1.0.0
   */
  get basicAuthentication() {
    return this._basicAuthentication;
  }

  set basicAuthentication(basicAuthentication) {
    this._basicAuthentication = Device.validateBasicAuthentication(basicAuthentication);
  }

  /**
   * Returns if the device requires basic authentication.
   *
   * @returns {boolean} If basic authentication is required
   * @since 1.0.0
   */
  get hasAuthentication() {
    return this.basicAuthentication instanceof BasicAuthentication;
  }

  toString() {
    return `${this.id} ${this.identifier} ${this.ipV4Address} ${this.hasAuthentication ? '🔐' : '🔓'}`;
  }
}

/**
 * Exports a Device.
 * Representing a Shelly device managed by the hub.
 *
 * @module
 * @since 1.0.0
 */
module.exports = Device;
