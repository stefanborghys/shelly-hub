const net = require('net');
const ValidationError = require('./error/validationError');

/**
 * Wrapper who guarantees a valid IP v4 address.
 *
 * @class
 * @since 1.0.0
 */
class IpV4Address {
  /**
   * Create a new IP v4 address.
   *
   * @private
   * @param {!string} ip - IP v4 address
   *
   * @throws {TypeError} The ipV4Address is not a valid version 4 IP address
   */
  constructor(ip) {
    this._ip = IpV4Address.validateIp(ip);
  }

  static validateIp(ip) {
    if (!net.isIPv4(ip)) {
      throw new ValidationError('The ip is not a valid version 4 IP address');
    }
    return ip;
  }

  /**
   * Creates a new IP v4 address.
   *
   * @param {!string} ip - IP v4 address
   *
   * @throws {TypeError} The ipV4Address is not a valid version 4 IP address
   *
   * @returns {ipV4Address} A new IP v4 address
   * @since 1.0.0
   */
  static of(ip) {
    return new IpV4Address(ip);
  }

  /**
   * Returns the IP address in dot-dicimal notation.
   *
   * @returns {string} The IP address in dot-dicimal notation
   * @since 1.0.0
   */
  get ip() {
    return this._ip;
  }

  toString() {
    return `${this.ip}`;
  }
}

/**
 * Exports IpV4Address.
 *
 * @module
 * @since 1.0.0
 */
module.exports = IpV4Address;
