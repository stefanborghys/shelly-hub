const NotFoundError = require('../../../../src/js/model/error/notFoundError');

describe('NotFoundError', () => {
  test('The status text is equal to the one set during creation', () => {
    const statusText = 'Test status text';
    const notFoundError = new NotFoundError(statusText);

    expect(notFoundError.message).toEqual(statusText);
  });

  test('The status text is equal to the default text', () => {
    expect(new NotFoundError().message).toEqual('Could not found the requested instance!');
  });

  test('The status code is 404', () => {
    expect(new NotFoundError().statusCode).toEqual(404);
  });
});
