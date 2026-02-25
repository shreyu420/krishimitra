const express = require('express');
const { getDiagnoses, postDiagnosis } = require('../controllers/diagnosisController');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/', authRequired, getDiagnoses);
router.post('/', authRequired, postDiagnosis);

module.exports = router;
