const express = require('express');
const app = express();
const port = 4000;

const scanner = require('./scanner');

app.get('/', (request, response) => {
    scanner.scan();
    response.send('Hello World!')
})

app.listen(port, () => {
    console.info(`Shelly-hub is running on http://localhost:${port}`)
})
