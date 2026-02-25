const { getDb } = require('../config/db');

async function findByEmail(email) {
  const db = await getDb();
  return db.get('SELECT id, name, email, password_hash FROM users WHERE email = ?', email);
}

async function findById(id) {
  const db = await getDb();
  return db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', id);
}

async function createUser({ name, email, passwordHash }) {
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    name,
    email,
    passwordHash,
  );
  return findById(result.lastID);
}

module.exports = { findByEmail, findById, createUser };
