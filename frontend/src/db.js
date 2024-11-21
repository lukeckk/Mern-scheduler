export const tasks = [
  {
    id: '1',
    title: 'Meeting with Mykel',
    start: '2024-11-20 10:00',
    end: '2024-11-20 11:30' ,
    description: 'Discuss about MinT'
  },
  {
    id: '2',
    title: 'Meeting with Luke',
    start: '2024-11-22 10:00',
    end: '2024-11-22 12:30' ,
    description: 'Discuss about MinT'
  }
]

// export const updateTask = (updatedTask) => {
//   console.log('Updating task:', updatedTask); // Log the task to update
//   const index = tasks.findIndex((task) => task.id === updatedTask.id);
//   if (index !== -1) {
//     tasks[index] = updatedTask; // Update the task
//     console.log('Updated tasks:', tasks); // Log the updated array
//   } else {
//     console.error('Task not found:', updatedTask.id); // Log if the task isn't found
//   }
// };
