const request = require('supertest');
const express = require('express');
const hubRouter = require('../../../src/js/server/hubRouter');

const app = express();

describe('HubRouter', () => {
  beforeAll(() => {
    app.use(express.json());
    app.use('/api/hub', hubRouter);
  });

  test('The hub should always be up when running', () => request(app)
    .get('/api/hub/status')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((response) => expect(response.body).toEqual({ status: 'up' })));
});
