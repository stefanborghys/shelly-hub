const express = require('express');

const router = express.Router();

const Device = require('../model/device');

const deviceService = require('../service/deviceService');
const ShellyService = require('../service/shellyService');
const StatusService = require('../service/statusService');

const deviceToJson = (device) => ({
  identifier: device.identifier,
  ip: device.ipV4Address.ip,
  hasAuthentication: device.hasAuthentication,
});

router.post('/', (request, response, next) => {
  const { ip, userId, password } = request.body;

  ShellyService.searchForShellyOnIpAddress(ip).then((shelly) => {
    const { identifier, isAuthenticationRequired } = shelly;

    const device = isAuthenticationRequired
      ? Device.withAuthentication(identifier, ip, userId, password)
      : Device.withoutAuthentication(identifier, ip);

    return device;
  }).then(async (device) => {
    if (device.hasAuthentication) {
      // verify authentication
      await StatusService.getStatus(device);
    }
    return device;
  }).then((device) => {
    deviceService.add(device);
    response.status(200).json(deviceToJson(device));
  })
    .catch(next);
});

router.get('/', (request, response) => response.status(200).json(deviceService.all()
  .map((device) => deviceToJson(device))));

module.exports = router;
