const UnknownError = require('../../../../src/js/model/error/unknownError');

describe('UnknownError', () => {
  test('The status text is equal to the one set during creation', () => {
    const statusText = 'Test status text';
    const unknownError = new UnknownError(statusText);

    expect(unknownError.message).toEqual(statusText);
  });

  test('The default status code is 500', () => {
    expect(new UnknownError('').statusCode).toEqual(500);
  });

  test('The status code is equal to the one set during creation', () => {
    expect(new UnknownError('', 123).statusCode).toEqual(123);
  });
});
