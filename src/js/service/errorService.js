const UnauthorizedError = require('../model/error/unauthorizedError');
const UnknownError = require('../model/error/unknownError');

class ErrorService {
  static handleResponseError(statusCode, statusText) {
    if (statusCode === 401) {
      throw new UnauthorizedError('Could not authenticate with the Shelly device, please verify the credentials!');
    }
    throw new UnknownError(statusCode, statusText);
  }
}

module.exports = ErrorService;
