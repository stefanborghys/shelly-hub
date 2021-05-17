const StatusError = require('./statusError');

/**
 * Thrown when a validation check fails.
 *
 * @class
 * @since 1.0.0
 */
class ValidationError extends StatusError {
  /**
   * Create a new ValidationError.
   *
   * @param {!string} statusText - The message to clarify the validation failure with
   */
  constructor(statusText) {
    super(400, statusText);
  }
}

/**
 * Exports a ValidationError.
 *
 * @module
 */
module.exports = ValidationError;
