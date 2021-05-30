const ValidationError = require('./error/validationError');

/**
 * Represents basic HTTP authentication.
 *
 * @class
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @since 1.0.0
 */
class BasicAuthentication {
  constructor(userId, password) {
    this.userId = BasicAuthentication.validateUserId(userId);
    this.password = BasicAuthentication.validatePassword(password);
  }

  static validateUserId(userId) {
    if (!userId) {
      throw new ValidationError('The userId is mandatory and cannot be empty');
    } else if (typeof userId !== 'string') {
      throw new TypeError('The userId is not of type string');
    }
    const REGEX = /^[\w-]{1,100}$/;
    if (!REGEX.test(userId)) {
      throw new ValidationError('The userId is invalid');
    }
    return userId;
  }

  static validatePassword(password) {
    if (!password) {
      throw new ValidationError('The password is mandatory and cannot be empty');
    } else if (typeof password !== 'string') {
      throw new TypeError('The password is not of type string');
    }
    const REGEX = /^[\w-]{1,100}$/;
    if (!REGEX.test(password)) {
      throw new ValidationError('The password is invalid');
    }
    return password;
  }

  static of(userId, password) {
    return new BasicAuthentication(userId, password);
  }

  /**
   * Calculates the authorization header's basic authentication value.
   *
   * WARN: only able to process ASCII characters in username and password!
   * UTF-8 support needs to be implemented when needed.
   *
   * @returns {string} The basic authentication
   * @since 1.0.0
   */
  get authorization() {
    return `Basic ${BasicAuthentication.base64Encode(`${this.userId}:${this.password}`)}`;
  }

  static base64Encode(text) {
    const buffer = Buffer.from(text, 'utf-8');
    return buffer.toString('base64');
  }

  toString() {
    return this.authorization;
  }
}

/**
 * Exports a BasicAuthentication.
 *
 * @module
 * @since 1.0.0
 */
module.exports = BasicAuthentication;
