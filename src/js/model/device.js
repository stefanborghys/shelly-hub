const ValidationError = require('./error/validationError');
const BasicAuthentication = require('./basicAuthentication');
const IpV4Address = require('./ipV4Address');

/**
 * Shelly device managed by the hub.
 *
 * @class
 * @since 1.0.0
 */
class Device {
  constructor(identifier, ipV4Address, basicAuthentication = undefined) {
    this._identifier = Device.validateIdentifier(identifier);
    this._ipV4Address = Device.validateIpV4Address(ipV4Address);
    this._basicAuthentication = Device.validateBasicAuthentication(basicAuthentication);
  }

  static validateIdentifier(identifier) {
    if (!identifier) {
      throw new ValidationError('The identifier is mandatory');
    } else if (typeof identifier !== 'string') {
      throw new TypeError('The identifier is not of type string');
    } else if (identifier.length === 0) {
      throw new ValidationError('The identifier cannot be empty');
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

  static withAuthentication(identifier, ip, userId, password) {
    const ipV4Address = IpV4Address.of(ip);
    const basicAuthentication = BasicAuthentication.of(userId, password);
    return new Device(identifier, ipV4Address, basicAuthentication);
  }

  static withoutAuthentication(identifier, ip) {
    const ipV4Address = IpV4Address.of(ip);
    return new Device(identifier, ipV4Address);
  }

  get identifier() {
    return this._identifier;
  }

  get ipV4Address() {
    return this._ipV4Address;
  }

  get basicAuthentication() {
    return this._basicAuthentication;
  }

  get hasAuthentication() {
    return this.basicAuthentication instanceof BasicAuthentication;
  }

  toString() {
    return `${this.identifier} ${this.ipV4Address} ${this.hasAuthentication ? '🔐 ' : '🔓'}`;
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
