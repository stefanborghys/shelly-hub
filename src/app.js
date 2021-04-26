const express = require('express');

const app = express();
const port = 4000;

const ShellyService = require('./js/service/shellyService');

const server = app.listen(port, () => console.info(`🚀 Shelly-hub is running on: http://localhost:${port}`));

app.get('/', (request, response) => {
  response.send('Hello World!');
});

const shellyToJson = (shelly) => ({
  identifier: shelly.identifier,
  mac: shelly.mac,
  ip: shelly.ip,
  authenticationRequired: shelly.isAuthenticationRequired,
  firmwareVersion: shelly.firmwareVersion,
});

app.get('/api/shelly/search', (request, response) => {
  ShellyService.searchForShellys()
    .then((shellys) => shellys.map((shelly) => shellyToJson(shelly)))
    .then((shellys) => response.status(200).json(shellys));
});

app.get('/api/shelly/search/:ipAddress', (request, response) => {
  const { ipAddress } = request.params;

  try {
    ShellyService.searchForShellyOnIpAddress(ipAddress).then((shelly) => {
      response.status(200).json(shellyToJson(shelly));
    }).catch(() => response.status(404).send());
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

/**
 * Handle Shelly Hub termination when the Node JS process is killed.
 */
process.on('SIGTERM', () => {
  server.close(() => {
    console.info('⛔ Shelly-Hub has been stopped');
  });
});

/**
 * Catch unexpected or uncaught exceptions.
 */
process.on('uncaughtException', (error) => {
  console.error('🔥 Shelly-Hub intercepted an unexpected error!', error);
  process.exit(1); // mandatory (as per the Node.js docs)
});
