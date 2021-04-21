const express = require('express');
const app = express();
const port = 4000;

const ShellyService = require('./api/services/shelly-service');

app.get('/', (request, response) => {
    ShellyService.searchForShellys()
        .then((shellys) => 
            shellys.forEach((shelly) => console.log(shelly.toString()))
        );

    response.send('Hello World!')
})

app.listen(port, () => {
    console.info(`Shelly-hub is running on http://localhost:${port}`)
})
