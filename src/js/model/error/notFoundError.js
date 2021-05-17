const StatusError = require('./statusError');

/**
 * Thrown when a resource cannot be found.
 *
 * @class
 * @since 1.0.0
 */
class NotFoundError extends StatusError {
  /**
   * Create a new NotFoundError.
   *
   * @param {string} [statusText='Could not found the requested instance!'] - The message to clarify which resource could not be found
   */
  constructor(statusText = 'Could not found the requested instance!') {
    super(404, statusText);
  }
}

/**
 * Exports a NotFoundError.
 *
 * @module
 */
module.exports = NotFoundError;
