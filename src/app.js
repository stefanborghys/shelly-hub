const express = require('express');
const axios = require('axios');
const parseArgs = require('minimist');

const shellyRouter = require('./js/server/shellyRouter');
const deviceRouter = require('./js/server/deviceRouter');
const hubRouter = require('./js/server/hubRouter');

const ErrorService = require('./js/service/errorService');

const StatusError = require('./js/model/error/statusError');

axios.interceptors.response.use((response) => response, (error) => {
  const { status, statusText } = error.response;
  ErrorService.handleResponseError(status, statusText);
});

const app = express();

const argv = parseArgs(process.argv.slice(2), {
  default: {
    port: 0, // 0 will result in an arbitrary unused port
  },
});

const { port } = argv;

if (!(typeof port === 'number' && port >= 0 && port <= 65535)) {
  console.error('💡 Shelly-Hub requires a valid port number between 0 and 65535!\n - use \'--port=0\' to select an arbitrary unused port\n - or specify one yourself e.g. \'--port=4000\'');
  process.exit(1);
}

app.use((request, response, next) => {
  console.info(`📥 ${request.method}\t${request.url}`);
  next();
});

app.use(express.json());
app.use('/api/shelly', shellyRouter);
app.use('/api/device', deviceRouter);
app.use('/api/hub', hubRouter);

app.use((error, request, response, next) => { // eslint-disable-line no-unused-vars
  if (error instanceof StatusError) {
    response.status(error.statusCode).send(ErrorService.toJsonError(error));
  } else {
    console.error('🔥 Intercepted unexpected error', error);
    response.status(500).send(ErrorService.toJsonError(error));
  }
});

const server = app.listen(port);

server.on('listening', () => {
  console.info(`🚀 Shelly-Hub v1.0.0 is running on: http://localhost:${server.address().port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`💥 Address http://localhost:${error.port} is already in use!`);
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
