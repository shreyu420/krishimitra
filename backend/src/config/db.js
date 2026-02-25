const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

async function getDb() {
  if (db) return db;

  const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'backend', 'data.sqlite');
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON');
  await initializeSchema(db);

  return db;
}

async function initializeSchema(database) {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      severity TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      source_url TEXT
    );

    CREATE TABLE IF NOT EXISTS mandi_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      crop TEXT NOT NULL,
      market TEXT NOT NULL,
      state TEXT NOT NULL,
      price REAL NOT NULL,
      trend TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS diagnoses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      crop TEXT NOT NULL,
      disease TEXT NOT NULL,
      confidence REAL NOT NULL,
      severity TEXT NOT NULL,
      advisory TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  await seedData(database);
}

async function seedData(database) {
  const [{ count: alertCount }] = await database.all('SELECT COUNT(*) as count FROM alerts');
  if (!alertCount) {
    await database.exec(`
      INSERT INTO alerts (severity, title, description, date, source_url)
      VALUES
      ('high', 'Heavy rainfall warning', 'High humidity may increase fungal infections over the next 72 hours.', '2026-02-19', 'https://agricoop.nic.in'),
      ('medium', 'Whitefly activity spike', 'Monitor tomato and chilli fields for pest activity in evening hours.', '2026-02-18', 'https://icar.org.in'),
      ('low', 'Irrigation advisory', 'Use drip irrigation this week to reduce water stress and fungal spread.', '2026-02-17', 'https://farmer.gov.in');
    `);
  }

  const [{ count: mandiCount }] = await database.all('SELECT COUNT(*) as count FROM mandi_prices');
  if (!mandiCount) {
    await database.exec(`
      INSERT INTO mandi_prices (crop, market, state, price, trend, updated_at)
      VALUES
      ('Tomato', 'Rajkot APMC', 'Gujarat', 28, 'up', '2026-02-19'),
      ('Tomato', 'Ahmedabad APMC', 'Gujarat', 32, 'up', '2026-02-19'),
      ('Potato', 'Deesa Mandi', 'Gujarat', 14, 'down', '2026-02-19'),
      ('Onion', 'Mahuva APMC', 'Gujarat', 18, 'stable', '2026-02-19'),
      ('Wheat', 'Unjha Mandi', 'Gujarat', 24, 'up', '2026-02-19'),
      ('Cotton', 'Gondal APMC', 'Gujarat', 62, 'down', '2026-02-19');
    `);
  }
}

module.exports = { getDb };
