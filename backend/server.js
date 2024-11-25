const express = require('express');
const cors = require('cors');
const { getTasks, addTask } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
  getTasks((err, tasks) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    } else {
      res.json(tasks);
    }
  });
});

app.post('/tasks', (req, res) => {
  const newTask = req.body; // Task data sent from the client
  if (!newTask.title || !newTask.start || !newTask.end) {
    return res.status(400).json({ error: 'Title, start, and end are required' });
  }

  addTask(newTask, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add task' });
    } else {
      res.status(201).json({ message: 'Task added successfully' });
    }
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
