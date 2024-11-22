const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./task.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Get all task and export to calender
const getTasks = (callback) => {
  db.all('SELECT * FROM task', [], (err, rows) =>{
    if(err){
      console.error('Error fetching tasks:', err.message);
      callback(err, null);
    } else {
      callback(null, rows)
    }
  })
}

const addTask = (task, callback) => {
  db.run(
    'INSERT INTO task (id, title, start, end, description) VALUES (?, ?, ?, ?, ?)',
    [task.id, task.title, task.start, task.end, task.description || ''],
    (err) => callback(err)
  );
};

module.exports = { db, getTasks, addTask };
