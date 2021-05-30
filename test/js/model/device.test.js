const Device = require('../../../src/js/model/device');
const Shelly = require('../../../src/js/model/shelly');
const IpV4Address = require('../../../src/js/model/ipV4Address');
const BasicAuthentication = require('../../../src/js/model/basicAuthentication');

const ValidationError = require('../../../src/js/model/error/validationError');

const ShellyService = require('../../../src/js/service/shellyService');
const StatusService = require('../../../src/js/service/statusService');

jest.mock('../../../src/js/service/shellyService');
jest.mock('../../../src/js/service/statusService');

describe('Device', () => {
  test('A Device can be constructed with basic authentication', () => {
    const identifier = 'test-shelly';
    const ipV4Address = IpV4Address.of('192.168.1.33');
    const basicAuthentication = BasicAuthentication.of('test-id', 'test-password');
    const id = 123;

    const device = new Device(identifier, ipV4Address, basicAuthentication, id);

    expect(device.identifier).toEqual(identifier);
    expect(device.ipV4Address).toEqual(ipV4Address);
    expect(device.basicAuthentication).toEqual(basicAuthentication);
    expect(device.hasAuthentication).toEqual(true);
    expect(device.id).toEqual(id);

    expect(device.toString()).toEqual(`${id} ${identifier} ${ipV4Address} 🔐`);
  });

  test('A Device can be constructed without basic authentication', () => {
    const identifier = 'test-shelly';
    const ipV4Address = IpV4Address.of('192.168.1.2');
    const basicAuthentication = undefined;
    const id = 456;

    const device = new Device(identifier, ipV4Address, basicAuthentication, id);

    expect(device.identifier).toEqual(identifier);
    expect(device.ipV4Address).toEqual(ipV4Address);
    expect(device.basicAuthentication).toBeUndefined();
    expect(device.hasAuthentication).toEqual(false);
    expect(device.id).toEqual(id);

    expect(device.toString()).toEqual(`${id} ${identifier} ${ipV4Address} 🔓`);
  });

  test('A Device can be constructed without id', () => {
    const device = new Device('test-shelly', IpV4Address.of('192.168.1.71'));

    expect(device.basicAuthentication).toBeUndefined();
    expect(device.hasAuthentication).toEqual(false);
    expect(device.id).toHaveLength(20);
  });

  test('An authenticated Device can be staticly created', async () => {
    const ip = '192.168.1.23';
    const userId = 'test-user-id';
    const password = 'test-password';

    const type = 'test-type';
    const shelly = Shelly.of(type, 'test-mac', ip, true, 'test-version');
    ShellyService.searchForShellyOnIpAddress.mockResolvedValueOnce(shelly);
    StatusService.getStatus.mockResolvedValueOnce(true);

    const device = await Device.of(ip, userId, password);

    expect(device.identifier).toEqual(type);
    expect(device.ipV4Address).toEqual(IpV4Address.of(ip));
    expect(device.basicAuthentication).toEqual(BasicAuthentication.of(userId, password));
    expect(device.hasAuthentication).toEqual(true);
    expect(device.id).toHaveLength(20);
    expect(device.toString()).toHaveLength(46);
  });

  test('An unauthenticated Device can be staticly created', async () => {
    const ip = '192.168.1.23';
    const type = 'test-type';
    const shelly = Shelly.of(type, 'test-mac', ip, false, 'test-version');
    ShellyService.searchForShellyOnIpAddress.mockResolvedValueOnce(shelly);

    const device = await Device.of(ip);

    expect(device.identifier).toEqual(type);
    expect(device.ipV4Address).toEqual(IpV4Address.of(ip));
    expect(device.basicAuthentication).toBeUndefined();
    expect(device.hasAuthentication).toEqual(false);
    expect(device.id).toHaveLength(20);
    expect(device.toString()).toHaveLength(46);
  });

  test('The IP v4 address can be set', () => {
    const ipV4Address = IpV4Address.of('192.168.1.71');
    const device = new Device('test-shelly', ipV4Address);

    expect(device.ipV4Address).toEqual(ipV4Address);

    const newIpV4Address = IpV4Address.of('192.168.2.4');
    device.ipV4Address = newIpV4Address;

    expect(device.ipV4Address).toEqual(newIpV4Address);
  });

  test('The basic authentication can be set', () => {
    const basicAuthentication = BasicAuthentication.of('test-id', 'test-password');
    const device = new Device('test-shelly', IpV4Address.of('192.168.1.65'), basicAuthentication);

    expect(device.basicAuthentication).toEqual(basicAuthentication);

    const newBasicAuthentication = BasicAuthentication.of('new-test-id', 'new-test-password');
    device.basicAuthentication = newBasicAuthentication;

    expect(device.basicAuthentication).toEqual(newBasicAuthentication);
  });

  describe('validateIdentifier', () => {
    test('null should throw a ValidationError', () => {
      expect(() => Device.validateIdentifier(null)).toThrow(new ValidationError('The identifier is mandatory and cannot be empty'));
    });

    test('undefined should throw a ValidationError', () => {
      expect(() => Device.validateIdentifier(undefined)).toThrow(new ValidationError('The identifier is mandatory and cannot be empty'));
    });

    test('A number should throw a TypeError', () => {
      expect(() => Device.validateIdentifier(2)).toThrow(new TypeError('The identifier is not of type string'));
    });

    test('An empty string should throw a ValidationError', () => {
      expect(() => Device.validateIdentifier('')).toThrow(new ValidationError('The identifier is mandatory and cannot be empty'));
    });

    test('A valid identifier should return the identifier', () => {
      const identifier = 'test-shelly';
      expect(Device.validateIdentifier(identifier)).toEqual(identifier);
    });
  });

  describe('validateIpV4Address', () => {
    test('A value not of type IpV4Address should throw a TypeError', () => {
      expect(() => Device.validateIpV4Address('192.168.1.65')).toThrow(new TypeError('The ipV4Address is not of type IpV4Address'));
    });

    test('A value of type IpV4Address should return the IP v4 address', () => {
      const ipV4Address = IpV4Address.of('192.168.1.65');
      expect(Device.validateIpV4Address(ipV4Address)).toEqual(ipV4Address);
    });
  });

  describe('validateBasicAuthentication', () => {
    test('A value not of type BasicAuthentication should throw a TypeError', () => {
      expect(() => Device.validateBasicAuthentication('test')).toThrow(new TypeError('The basicAuthentication is not of type BasicAuthentication'));
    });

    test('A value of type BasicAuthentication should return the basic authentication', () => {
      const basicAuthentication = BasicAuthentication.of('test-id', 'test-password');
      expect(Device.validateBasicAuthentication(basicAuthentication)).toEqual(basicAuthentication);
    });

    test('null should return null', () => {
      expect(Device.validateBasicAuthentication(null)).toBeNull();
    });

    test('undefined should return undefined', () => {
      expect(Device.validateBasicAuthentication(undefined)).toBeUndefined();
    });
  });
});
