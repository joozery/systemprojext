const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:'); // สำหรับใช้ในหน่วยความจำ

app.use(bodyParser.json());
app.use(cors());

// สร้างตารางในฐานข้อมูล SQLite
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');
});

// API สำหรับบันทึกข้อมูลจาก frontend
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// รันเซิร์ฟเวอร์ backend
app.listen(3001, () => {
  console.log('Backend server is running on http://localhost:3001');
});
