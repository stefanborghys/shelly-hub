const express = require('express');

const router = express.Router();

router.get('/status', (request, response) => response.status(200).json({ status: 'up' }));

router.get('/stop', (request, response) => {
  if (process.connected) {
    process.disconnect();
  }
  response.status(200).end();
  process.exit();
});

module.exports = router;
