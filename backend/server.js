import express from 'express';
import cors from 'cors';
import { getTasks, addTask } from './database.js';
import connectDB from './config/db.js';

// port for sqlite
// const PORT = 5001;

// port for mongoDB
const PORT = 5002
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// sqlite
// app.get('/tasks', (req, res) => {
//   getTasks((err, tasks) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to fetch tasks' });
//     } else {
//       res.json(tasks);
//     }
//   });
// });

// mongoDB
app.get('/', (req, res) => {
  res.send('API is running... this can be found in server.js');
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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
