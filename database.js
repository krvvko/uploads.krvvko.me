const sqlite3 = require('sqlite3');
const config = require('./config');

const db = new sqlite3.Database(config.database.path);

const setupDatabase = () => {
    db.run(`CREATE TABLE IF NOT EXISTS uploads (
        id INTEGER PRIMARY KEY,
        ip TEXT NOT NULL,
        user_agent TEXT NOT NULL,
        image_path TEXT NOT NULL
    )`);
};

setupDatabase();

module.exports = db;
