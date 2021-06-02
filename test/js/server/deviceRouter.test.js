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

  const toJSON = (device) => ({
    id: device.id,
    identifier: device.identifier,
    ip: device.ipV4Address.ip,
    hasAuthentication: device.hasAuthentication,
  });

  test('Get all devices', async () => {
    const devices = await Promise.all([createDevice(1), createDevice(2), createDevice(3)]);

    DeviceService.getAll.mockReturnValueOnce(devices);

    return request(app)
      .get('/api/device')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(devices.length);

        const expectedDevices = devices.map(toJSON);

        expect(response.body).toEqual(expectedDevices);

        expect(DeviceService.getAll).toHaveBeenCalledTimes(1);
      });
  });

  test('Get device by id', async () => {
    const device = await createDevice(1);

    DeviceService.findById.mockReturnValueOnce(device);

    return request(app)
      .get(`/api/device/${device.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(toJSON(device));
        expect(DeviceService.findById).toHaveBeenCalledTimes(1);
      });
  });

  test('Add a device', async () => {
    const device = await createDevice(1);

    DeviceService.add.mockResolvedValueOnce(device);

    return request(app)
      .post('/api/device/')
      .send({ ip: device.ipV4Address.ip })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(toJSON(device));
        expect(DeviceService.add).toHaveBeenCalledTimes(1);
      });
  });
});
