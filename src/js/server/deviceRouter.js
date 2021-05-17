const express = require('express');

const router = express.Router();

const deviceService = require('../service/deviceService');

const deviceToJson = (device) => ({
  id: device.id,
  identifier: device.identifier,
  ip: device.ipV4Address.ip,
  hasAuthentication: device.hasAuthentication,
});

router.post('/', (request, response, next) => {
  const { ip, userId, password } = request.body;

  deviceService.add(ip, userId, password)
    .then((device) => response.status(200).json(deviceToJson(device)))
    .catch(next);
});

router.get('/', (request, response) => response.status(200).json(deviceService.getAll()
  .map((device) => deviceToJson(device))));

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const device = deviceService.findById(id);

  response.status(200).json(deviceToJson(device));
});

module.exports = router;
