const express = require('express');
const shellyRouter = require('./js/server/shellyRouter');

const app = express();
const port = 4000;

app.use(express.json());
app.use('/api/shelly', shellyRouter);

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
