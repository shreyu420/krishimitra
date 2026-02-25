const { getDb } = require('../config/db');

async function listMandiPrices({ crop, state }) {
  const db = await getDb();
  const params = [];
  let query = 'SELECT id, crop, market, state, price, trend, updated_at as updatedAt FROM mandi_prices WHERE 1=1';

  if (crop && crop !== 'All') {
    query += ' AND crop = ?';
    params.push(crop);
  }

  if (state) {
    query += ' AND state = ?';
    params.push(state);
  }

  query += ' ORDER BY crop, market';
  return db.all(query, ...params);
}

module.exports = { listMandiPrices };
