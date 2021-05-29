const StatusError = require('./statusError');

/**
 * Thrown when an unexpected failure occurs.
 *
 * @class
 * @since 1.0.0
 */
class UnknownError extends StatusError {
  /**
   * Create a new UnknownError.
   *
   * @param {!string} statusText - The message to add some context or clarification to the error
   * @param {number} [statusCode=500] - The HTTP status code to categorise the error with
   */
  constructor(statusText, statusCode = 500) {
    super(statusCode, statusText);
  }
}

/**
 * Exports an UnknownError.
 *
 * @module
 */
module.exports = UnknownError;
