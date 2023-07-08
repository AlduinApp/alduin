import Database from 'tauri-plugin-sql-api';

let db: Database | null = null;

export default async function init() {
  if (db) {
    return db;
  }

  db = await Database.load('sqlite:data.db');
  await ensureDB(db);
  return db;
}

async function ensureDB(db: Database) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS files (
      name TEXT PRIMARY KEY,
      content BLOB NOT NULL
    );`);
}
