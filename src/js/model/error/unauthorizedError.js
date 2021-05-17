const StatusError = require('./statusError');

/**
 * Thrown when a request cannot be fulfilled due to unsufficient authorization.
 *
 * @class
 * @since 1.0.0
 */
class UnauthorizedError extends StatusError {
  /**
   * Create a new UnauthorizedError.
   *
   * @param {string} [statusText='Could not authenticate, please verify the credentials!'] - The message to more specificly clarify the authentication problem with
   */
  constructor(statusText = 'Could not authenticate, please verify the credentials!') {
    super(401, statusText);
  }
}

/**
 * Exports an UnauthorizedError.
 *
 * @module
 */
module.exports = UnauthorizedError;
