const { getDb } = require('../config/db');

async function createDiagnosis({ userId, crop, disease, confidence, severity, advisory }) {
  const db = await getDb();
  const result = await db.run(
    `INSERT INTO diagnoses (user_id, crop, disease, confidence, severity, advisory)
     VALUES (?, ?, ?, ?, ?, ?)`,
    userId,
    crop,
    disease,
    confidence,
    severity,
    advisory,
  );

  return db.get(
    `SELECT id, user_id as userId, crop, disease, confidence, severity, advisory, created_at as createdAt
     FROM diagnoses WHERE id = ?`,
    result.lastID,
  );
}

async function listDiagnoses(userId) {
  const db = await getDb();
  return db.all(
    `SELECT id, user_id as userId, crop, disease, confidence, severity, advisory, created_at as createdAt
     FROM diagnoses WHERE user_id = ? ORDER BY datetime(created_at) DESC`,
    userId,
  );
}

module.exports = { createDiagnosis, listDiagnoses };
