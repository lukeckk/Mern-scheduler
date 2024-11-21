const express = require('express');
const cors = require('cors');
const { getTasks } = require('./database');

const app = express();
app.use(cors());

app.get('/tasks', (req, res) => {
  getTasks((err, tasks) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    } else {
      res.json(tasks);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
