const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const path = require('path');

process.env.DB_PATH = path.join(__dirname, 'test.sqlite');
process.env.JWT_SECRET = 'test-secret';

const app = require('../src/app');

let token;

test('health endpoint works', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('signup and login flow', async () => {
  const signup = await request(app)
    .post('/api/auth/signup')
    .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

  assert.equal(signup.status, 201);
  assert.ok(signup.body.token);
  token = signup.body.token;

  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });

  assert.equal(login.status, 200);
  assert.ok(login.body.token);
});

test('protected diagnosis endpoint requires auth and allows create/list', async () => {
  const unauth = await request(app).get('/api/diagnoses');
  assert.equal(unauth.status, 401);

  const create = await request(app)
    .post('/api/diagnoses')
    .set('Authorization', `Bearer ${token}`)
    .send({
      crop: 'Tomato',
      disease: 'Early Blight',
      confidence: 78,
      severity: 'moderate',
      advisory: 'Spray Mancozeb 2g/L every 7 days',
    });

  assert.equal(create.status, 201);
  assert.equal(create.body.diagnosis.disease, 'Early Blight');

  const list = await request(app)
    .get('/api/diagnoses')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(list.status, 200);
  assert.ok(Array.isArray(list.body.diagnoses));
  assert.ok(list.body.diagnoses.length >= 1);
});

test('public data endpoints work', async () => {
  const alerts = await request(app).get('/api/alerts');
  assert.equal(alerts.status, 200);
  assert.ok(Array.isArray(alerts.body.alerts));

  const mandi = await request(app).get('/api/mandi-prices?state=Gujarat');
  assert.equal(mandi.status, 200);
  assert.ok(Array.isArray(mandi.body.prices));

  const weather = await request(app).get('/api/weather?location=Rajkot%2C%20Gujarat');
  assert.equal(weather.status, 200);
  assert.equal(weather.body.location, 'Rajkot, Gujarat');
});
