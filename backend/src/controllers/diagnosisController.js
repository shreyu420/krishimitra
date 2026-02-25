const { createDiagnosis, listDiagnoses } = require('../models/diagnosisModel');

async function getDiagnoses(req, res, next) {
  try {
    const diagnoses = await listDiagnoses(req.user.id);
    return res.json({ diagnoses });
  } catch (err) {
    return next(err);
  }
}

async function postDiagnosis(req, res, next) {
  try {
    const { crop, disease, confidence, severity, advisory } = req.body;
    if (!crop || !disease || confidence === undefined || !severity || !advisory) {
      return res.status(400).json({ message: 'crop, disease, confidence, severity, and advisory are required' });
    }

    const diagnosis = await createDiagnosis({
      userId: req.user.id,
      crop,
      disease,
      confidence,
      severity,
      advisory,
    });

    return res.status(201).json({ diagnosis });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getDiagnoses, postDiagnosis };
