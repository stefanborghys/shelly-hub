const express = require('express');
const app = express();
const port = 4000;

const ShellyService = require('./api/services/shelly-service');

app.listen(port, () => console.info(`🚀 Shelly-hub is running on http://localhost:${port}`))

app.get('/', (request, response) => {
    response.send('Hello World!')
})

app.get('/api/shelly/search', (request, response) => {
    ShellyService.searchForShellys().then((shellys) => 
            shellys.map((shelly) => shellyToJson(shelly))
        ).then((shellys) => response.status(200).json(shellys))
})

app.get('/api/shelly/search/:ipAddress', (request, response) => {
    const ipAddress = request.params.ipAddress;

    try{
        ShellyService.searchForShellyOnIpAddress(ipAddress).then((shelly) => {
            response.status(200).json(shellyToJson(shelly));
        }).catch(() => response.status(404).send())
    } catch(error) {
        response.status(400).json({ message: error.message })
    }
})

const shellyToJson = (shelly) => ({
    identifier: shelly.identifier,
    mac: shelly.mac,
    ip: shelly.ip,
    authenticationRequired: shelly.isAuthenticationRequired,
    firmwareVersion: shelly.firmwareVersion
})
