const express = require('express');
const { getAlerts, getMandiPrices, getWeather } = require('../controllers/dataController');

const router = express.Router();

router.get('/alerts', getAlerts);
router.get('/mandi-prices', getMandiPrices);
router.get('/weather', getWeather);

module.exports = router;
