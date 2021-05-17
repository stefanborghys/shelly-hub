/**
 * Abstract base status error.
 *
 * @class
 * @since 1.0.0
 */
class StatusError extends Error {
  /**
   * Create a new StatusError.
   *
   * @protected
   * @param {!number} statusCode - The HTTP status code this error belongs to
   * @param  {...any} params - The Error constructor params to pass on
   * @see {Error}
   */
  constructor(statusCode, ...params) {
    super(...params);
    this._statusCode = statusCode;
  }

  /**
   * Returns the HTTP status code.
   *
   * @returns {number} The HTTP status code this error belongs to
   */
  get statusCode() {
    return this._statusCode;
  }
}

/**
 * Exports an StatusError.
 *
 * @module
 */
module.exports = StatusError;
