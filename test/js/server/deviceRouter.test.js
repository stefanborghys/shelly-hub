const request = require('supertest');
const express = require('express');
const deviceRouter = require('../../../src/js/server/deviceRouter');
const DeviceService = require('../../../src/js/service/deviceService');
const Device = require('../../../src/js/model/device');
const ShellyService = require('../../../src/js/service/shellyService');
const Shelly = require('../../../src/js/model/shelly');

const app = express();

jest.mock('../../../src/js/service/deviceService');
jest.mock('../../../src/js/service/shellyService');

describe('DeviceRouter', () => {
  beforeAll(() => {
    app.use(express.json());
    app.use('/api/device', deviceRouter);
  });

  async function createDevice(number) {
    const ip = `192.168.1.${number}`;
    const shelly = Shelly.of(`test-type-${number}`, `test-mac-${number}`, ip, false);
    ShellyService.searchForShellyOnIpAddress.mockResolvedValueOnce(shelly);
    return Device.of(ip);
  }

  test('Request all devices', async () => {
    const devices = await Promise.all([createDevice(1), createDevice(2), createDevice(3)]);

    DeviceService.getAll.mockReturnValue(devices);

    return request(app)
      .get('/api/device')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(devices.length);

        const expectedDevices = devices.map((device) => ({
          id: device.id,
          identifier: device.identifier,
          ip: device.ipV4Address.ip,
          hasAuthentication: device.hasAuthentication,
        }));

        expect(response.body).toEqual(expectedDevices);

        expect(DeviceService.getAll).toHaveBeenCalledTimes(1);
      });
  });
});
