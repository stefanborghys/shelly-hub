const UnauthorizedError = require('../model/error/unauthorizedError');
const UnknownError = require('../model/error/unknownError');
const StatusError = require('../model/error/statusError');

class ErrorService {
  static handleResponseError(statusCode, statusText) {
    if (statusCode === 401) {
      throw new UnauthorizedError('Could not authenticate with the Shelly device, please verify the credentials!');
    }
    throw new UnknownError(statusCode, statusText);
  }

  static toJsonError(error) {
    const jsonError = {};
    if (error instanceof StatusError) {
      jsonError.message = error.message;
    } else {
      jsonError.message = 'Intercepted an unexpected error';
    }
    return jsonError;
  }
}

module.exports = ErrorService;
