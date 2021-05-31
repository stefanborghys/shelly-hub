const axios = require('axios');

const ShellyService = require('../../../src/js/service/shellyService');
const Shelly = require('../../../src/js/model/shelly');

jest.mock('axios');

describe('ShellyService', () => {
  describe('searchForShellyOnIpAddress', () => {
    test('A Shelly is found on given IP address', async () => {
      const ip = '1.2.3.4';
      const response = {
        headers: {
          'content-type': 'application/json',
        },
        data: {
          type: 'test-type',
          mac: 'test-mac',
          auth: true,
          fw: 'test-firmware-version',
        },
        request: {
          host: ip,
        },
      };
      axios.get.mockResolvedValue(response);

      const shelly = await ShellyService.searchForShellyOnIpAddress(ip);
      expect(shelly).toBeInstanceOf(Shelly);
      expect(shelly.identifier).toEqual(response.data.type);
      expect(shelly.ip).toEqual(response.request.host);
      expect(shelly.mac).toEqual(response.data.mac);
      expect(shelly.firmwareVersion).toEqual(response.data.fw);
      expect(shelly.isAuthenticationRequired).toEqual(response.data.auth);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/shelly`, { timeout: 2000, validateStatus: expect.anything() });
    });

    test('Unexpected content-type is rejected with an Error', async () => {
      const ip = '4.5.6.7';
      const response = {
        headers: {
          'content-type': 'text/plain',
        },
      };
      axios.get.mockResolvedValue(response);

      await expect(() => ShellyService.searchForShellyOnIpAddress(ip)).rejects.toThrow(new Error('The shelly response could not be processed'));

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/shelly`, { timeout: 2000, validateStatus: expect.anything() });
    });

    test('Request is rejected', async () => {
      const ip = '4.5.6.7';

      axios.get.mockRejectedValue(new TypeError());

      await expect(() => ShellyService.searchForShellyOnIpAddress(ip))
        .rejects.toThrow(new TypeError());

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/shelly`, { timeout: 2000, validateStatus: expect.anything() });
    });
  });

  describe('searchForShellys', () => {
    function expectedShelly(ip) {
      return Shelly.of(`test-type-${ip}`, `test-mac-${ip}`, ip, true, `test-firmware-version-${ip}`);
    }

    function mockShellys(ips) {
      const response = (ip) => ({
        headers: {
          'content-type': 'application/json',
        },
        data: {
          type: `test-type-${ip}`,
          mac: `test-mac-${ip}`,
          auth: true,
          fw: `test-firmware-version-${ip}`,
        },
        request: {
          host: ip,
        },
      });

      axios.get.mockImplementation((url) => {
        let ipToResolve;
        const valuesIterator = ips.values();
        let next = valuesIterator.next();
        while (!next.done) {
          const ip = next.value;
          if (url === `http://${ip}:80/shelly`) {
            ipToResolve = ip;
            break;
          }
          next = valuesIterator.next();
        }

        return ipToResolve ? Promise.resolve(response(ipToResolve)) : Promise.reject(new Error());
      });
    }

    test('All shellys with IP v4 address are found', async () => {
      mockShellys(['192.168.1.1', '192.168.1.4', '192.168.1.255', '192.168.2.44']);

      const shellys = await ShellyService.searchForShellys();

      const expected = [expectedShelly('192.168.1.1'), expectedShelly('192.168.1.4')];

      expect(shellys).toHaveLength(2);
      expect(shellys).toEqual(expect.arrayContaining(expected));
    });
  });
});
