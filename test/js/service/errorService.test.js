const ErrorService = require('../../../src/js/service/errorService');
const UnauthorizedError = require('../../../src/js/model/error/unauthorizedError');
const ValidationError = require('../../../src/js/model/error/validationError');
const UnknownError = require('../../../src/js/model/error/unknownError');

describe('ErrorService', () => {
  describe('handleResponseError', () => {
    test('Status code 401 throws an UnauthorizedError', () => {
      expect(() => ErrorService.handleResponseError(401)).toThrow(new UnauthorizedError('Could not authenticate with the Shelly device, please verify the credentials!'));
    });

    test('Any other status code throws an UnknownError', () => {
      const statusText = 'Test status text';
      expect(() => ErrorService.handleResponseError(123, statusText))
        .toThrow(new UnknownError(statusText));
    });
  });

  describe('toJsonError', () => {
    test('A error of instance StatusError can be converted to a JSON error', () => {
      const statusText = 'Test error message';
      expect(ErrorService.toJsonError(new ValidationError(statusText))).toEqual({
        message: statusText,
      });
    });

    test('An error of instance Error can be converted to a JSON error', () => {
      const message = 'Test error message';
      expect(ErrorService.toJsonError(new Error(message))).toEqual({
        message,
      });
    });

    test('A TypeError can be converted to a JSON error', () => {
      const message = 'Test error message';
      expect(ErrorService.toJsonError(new TypeError(message))).toEqual({
        message,
      });
    });

    test('A unknown (error) can be converted to a JSON error with default message', () => {
      expect(ErrorService.toJsonError('test')).toEqual({
        message: 'Intercepted an unexpected error',
      });
    });
  });
});
