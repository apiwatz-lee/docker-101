const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;

let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'tutorial',
  });
};

app.get('/hello-world', (req, res) => {
  res.send('hello world');
});

app.get('/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const [results] = await conn.query(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, async () => {
  await initMySQL();
  console.log(`Server running at http://localhost:${port}`);
});
