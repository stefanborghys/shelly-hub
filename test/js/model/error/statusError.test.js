const StatusError = require('../../../../src/js/model/error/statusError');

describe('StatusError', () => {
  test('The status code is equal to the one set during creation', () => {
    expect(new StatusError(123).statusCode).toEqual(123);
  });
});
