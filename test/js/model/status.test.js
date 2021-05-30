const Status = require('../../../src/js/model/status');

describe('Status', () => {
  test('A Status can be constructed', () => {
    const updatable = true;

    const status = new Status(updatable);

    expect(status.updatable).toEqual(updatable);
    expect(status.toString()).toEqual(`${updatable}`);
  });

  test('A Status can be staticly created', () => {
    const updatable = false;

    const status = Status.of(updatable);

    expect(status.updatable).toEqual(updatable);
    expect(status.toString()).toEqual(`${updatable}`);
  });
});
