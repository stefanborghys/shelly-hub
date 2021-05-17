const express = require('express');
const axios = require('axios');

const shellyRouter = require('./js/server/shellyRouter');
const deviceRouter = require('./js/server/deviceRouter');

const ErrorService = require('./js/service/errorService');

const StatusError = require('./js/model/error/statusError');

axios.interceptors.response.use((response) => response, (error) => {
  const { status, statusText } = error.response;
  ErrorService.handleResponseError(status, statusText);
});

const app = express();
const port = 4000;

app.use((request, response, next) => {
  console.info(`📥 ${request.method}\t${request.url}`);
  next();
});

app.use(express.json());
app.use('/api/shelly', shellyRouter);
app.use('/api/device', deviceRouter);

app.use((error, request, response, next) => { // eslint-disable-line no-unused-vars
  if (error instanceof StatusError) {
    response.status(error.statusCode).send(ErrorService.toJsonError(error));
  } else {
    console.error('🔥 Intercepted unexpected error', error);
    response.status(500).send(ErrorService.toJsonError(error));
  }
});

const server = app.listen(port, () => console.info(`🚀 Shelly-hub v1.0.0 is running on: http://localhost:${port}`));

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
