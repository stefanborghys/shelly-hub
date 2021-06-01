const UnauthorizedError = require('../model/error/unauthorizedError');
const UnknownError = require('../model/error/unknownError');
const StatusError = require('../model/error/statusError');

/**
 * Provides a central point for error handling.
 *
 * @class
 * @since 1.0.0
 */
class ErrorService {
  /**
   * Handles Shelly device response errors.
   *
   * @param {!number} statusCode - The HTTP status code returned
   * @param {!string} statusText - The status text returned
   */
  static handleResponseError(statusCode, statusText) {
    if (statusCode === 401) {
      throw new UnauthorizedError('Could not authenticate with the Shelly device, please verify the credentials!');
    }
    throw new UnknownError(statusText, statusCode);
  }

  /**
   * Translates an Error into a standardized JSON error object.
   * Which should be used as a response body for failing request.
   *
   * @param {!Error} error - The error thrown while processing
   * @returns {Object} A standardized JSON error object
   */
  static toJsonError(error) {
    const jsonError = {};
    if (error instanceof StatusError) {
      jsonError.message = error.message;
    } else if (error instanceof Error) {
      jsonError.message = error.message;
    } else {
      jsonError.message = 'Intercepted an unexpected error';
    }
    return jsonError;
  }
}

/**
 * Exports an ErrorService.
 * Providing a central place for error handling.
 *
 * @module
 * @since 1.0.0
 */
module.exports = ErrorService;
