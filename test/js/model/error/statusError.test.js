const StatusError = require('../../../../src/js/model/error/statusError');

describe('StatusError', () => {
  test('The status code is equal to the one set during creation', () => {
    expect(new StatusError(123).statusCode).toEqual(123);
  });

  test('The status text is equal to the one set during creation', () => {
    const message = 'Test message';
    const statusMessage = new StatusError(100, message);

    expect(statusMessage.message).toEqual(message);
  });
});
