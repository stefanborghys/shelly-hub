const StatusError = require('./statusError');

/**
 * Thrown when an operation is in conflict with the current state of the application.
 *
 * @class
 * @since 1.0.0
 */
class ConflictError extends StatusError {
  /**
   * Create a new ConflictError.
   *
   * @param {!string} statusText - The message to clarify the conflict with
   */
  constructor(statusText) {
    super(409, statusText);
  }
}

/**
 * Exports a ConflictError.
 *
 * @module
 */
module.exports = ConflictError;
