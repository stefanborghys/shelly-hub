const net = require('net');

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
   * @param {!string} ipV4Address - IP v4 address
   *
   * @throws {TypeError} The ipV4Address is not a valid version 4 IP address
   */
  constructor(ipV4Address) {
    this._ipV4Address = IpV4Address.validateIpV4Address(ipV4Address);
  }

  static validateIpV4Address(ipV4Address) {
    if (!net.isIPv4(ipV4Address)) {
      throw new TypeError('The ipV4Address is not a valid version 4 IP address');
    }
    return ipV4Address;
  }

  /**
   * Creates a new IP v4 address.
   *
   * @param {!string} ipV4Address - IP v4 address
   *
   * @throws {TypeError} The ipV4Address is not a valid version 4 IP address
   *
   * @returns {ipV4Address} A new IP v4 address
   * @since 1.0.0
   */
  static of(ipV4Address) {
    return new IpV4Address(ipV4Address);
  }

  /**
   * Returns the IP address in dot-dicimal notation.
   *
   * @returns {string} The IP address in dot-dicimal notation
   * @since 1.0.0
   */
  get ip() {
    return `${this._ipV4Address}`;
  }
}

/**
 * Exports IpV4Address.
 *
 * @module
 * @since 1.0.0
 */
module.exports = IpV4Address;
