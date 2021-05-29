const ValidationError = require('../../../../src/js/model/error/validationError');

describe('ValidationError', () => {
  test('The status text is equal to the one set during creation', () => {
    const statusText = 'Test status text';
    const validationError = new ValidationError(statusText);

    expect(validationError.message).toEqual(statusText);
  });

  test('The status code is 400', () => {
    expect(new ValidationError('').statusCode).toEqual(400);
  });
});
