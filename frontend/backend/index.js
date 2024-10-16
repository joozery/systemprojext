const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const db = new Database(':memory:', { verbose: console.log }); // ใช้ better-sqlite3

app.use(bodyParser.json());
app.use(cors());

// สร้างตารางในฐานข้อมูล SQLite
db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)').run();

// API สำหรับบันทึกข้อมูลจาก frontend
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const info = stmt.run(name, email);
    res.json({ id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// รันเซิร์ฟเวอร์ backend
app.listen(3001, () => {
  console.log('Backend server is running on http://localhost:3001');
});
