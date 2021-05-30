const Shelly = require('../../../src/js/model/shelly');

describe('Shelly', () => {
  test('A Shelly can be constructed', () => {
    const identifier = 'test-shelly';
    const mac = '1t:2e:3s:4t:51:62';
    const ip = '192.168.1.123';
    const authenticationRequired = false;
    const firmwareVersion = 'test-shelly-version-1.2.3';

    const shelly = new Shelly(identifier, mac, ip, authenticationRequired, firmwareVersion);

    expect(shelly.identifier).toEqual(identifier);
    expect(shelly.mac).toEqual(mac);
    expect(shelly.ip).toEqual(ip);
    expect(shelly.isAuthenticationRequired).toEqual(authenticationRequired);
    expect(shelly.firmwareVersion).toEqual(firmwareVersion);
    expect(shelly.toString()).toEqual(`${ip} ${mac} ${firmwareVersion} ${identifier}`);
  });

  test('A Shelly can be staticly created', () => {
    const type = 'test-shelly';
    const mac = '1t:2e:3s:4t:51:62';
    const ip = '192.168.1.123';
    const auth = true;
    const fw = 'test-shelly-version-1.2.3';

    const shelly = Shelly.of(type, mac, ip, auth, fw);

    expect(shelly.identifier).toEqual(type);
    expect(shelly.mac).toEqual(mac);
    expect(shelly.ip).toEqual(ip);
    expect(shelly.isAuthenticationRequired).toEqual(auth);
    expect(shelly.firmwareVersion).toEqual(fw);
    expect(shelly.toString()).toEqual(`${ip} ${mac} ${fw} ${type}`);
  });
});
