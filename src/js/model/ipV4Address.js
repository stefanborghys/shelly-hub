const _ = require('lodash');

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
   * @throws {TypeError} The ipV4Address is mandatory
   * @throws {TypeError} The ipV4Address should be of type string
   * @throws {TypeError} The ipV4Address's first, second, third or fourth number is invalid
   * @throws {TypeError} The ipV4Address has an invalid format
   */
  constructor(ipV4Address) {
    if (!ipV4Address) {
      throw new TypeError('The IP v4 address is mandatory');
    } else if (!_.isString(ipV4Address)) {
      throw new TypeError('The IP v4 address is not of type string');
    }
    const REGEX = /^(?<firstNumber>\d{1,3})\.(?<secondNumber>\d{1,3})\.(?<thirdNumber>\d{1,3})\.(?<fourthNumber>\d{1,3})$/;
    const resultaat = ipV4Address.match(REGEX);
    if (resultaat) {
      const firstNumber = Number(resultaat.groups.firstNumber);
      if (!_.inRange(firstNumber, 0, 256)) {
        throw new TypeError('The IP v4 address\'s first number is invalid');
      }

      const secondNumber = Number(resultaat.groups.secondNumber);
      if (!_.inRange(secondNumber, 0, 256)) {
        throw new TypeError('The IP v4 address\'s second number is invalid');
      }

      const thirdNumber = Number(resultaat.groups.thirdNumber);
      if (!_.inRange(thirdNumber, 0, 256)) {
        throw new TypeError('The IP v4 address\'s third number is invalid');
      }

      const fourthNumber = Number(resultaat.groups.fourthNumber);
      if (!_.inRange(fourthNumber, 0, 256)) {
        throw new TypeError('The IP v4 address\'s fourth number is invalid');
      }

      this._firstNumber = firstNumber;
      this._secondNumber = secondNumber;
      this._thirdNumber = thirdNumber;
      this._fourthNumber = fourthNumber;
    } else {
      throw new TypeError('The IP v4 address has an invalid format');
    }
  }

  /**
   * Creates a new IP v4 address.
   *
   * @param {!string} ipV4Address - IP v4 address
   *
   * @throws {TypeError} The ipV4Address is mandatory
   * @throws {TypeError} The ipV4Address should be of type string
   * @throws {TypeError} The ipV4Address's first, second, third or fourth number is invalid
   * @throws {TypeError} The ipV4Address has an invalid format
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
    return `${this._firstNumber}.${this._secondNumber}.${this._thirdNumber}.${this._fourthNumber}`;
  }
}

/**
 * Exports IpV4Address.
 *
 * @module
 * @since 1.0.0
 */
module.exports = IpV4Address;
