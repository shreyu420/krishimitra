const { getDb } = require('../config/db');

async function listAlerts() {
  const db = await getDb();
  return db.all('SELECT id, severity, title, description, date, source_url as sourceUrl FROM alerts ORDER BY date DESC');
}

module.exports = { listAlerts };
