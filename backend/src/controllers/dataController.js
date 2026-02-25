const { listAlerts } = require('../models/alertModel');
const { listMandiPrices } = require('../models/mandiModel');

async function getAlerts(req, res, next) {
  try {
    const alerts = await listAlerts();
    return res.json({ alerts });
  } catch (err) {
    return next(err);
  }
}

async function getMandiPrices(req, res, next) {
  try {
    const prices = await listMandiPrices({ crop: req.query.crop, state: req.query.state || 'Gujarat' });
    return res.json({ prices });
  } catch (err) {
    return next(err);
  }
}

function getWeather(req, res) {
  const { location = 'Rajkot, Gujarat' } = req.query;
  return res.json({
    location,
    temperature: '32°C',
    humidity: '78%',
    wind: '12 km/h',
    forecast: 'Partly Cloudy',
    alerts: [
      { type: 'fungal', risk: 'high', message: 'High fungal risk due to high humidity and dew conditions.' },
      { type: 'pest', risk: 'medium', message: 'Pest pressure likely to increase with rising temperatures.' },
    ],
  });
}

module.exports = { getAlerts, getMandiPrices, getWeather };
