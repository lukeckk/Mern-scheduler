// This file contains sql script that is used only to seed the dummy data into the database

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import dummy_users from './data/dummy_user.js';
import dummy_tasks from './data/dummy_task.js';
import User from './models/userModel.js';
import Task from './models/taskModel.js';
import connectDB from './config/db.js';

dotenv.config()
connectDB()

// insert data. not using sql query due to MongoDB NoSql database
const importData = async () => {
  try{
    // delete everything before importing data
    await Task.deleteMany();
    await User.deleteMany();

    // pass in dummy_users to User model
    const createdUsers = await User.insertMany(dummy_users); 
    // retrieve admin which is the first one in the array           
    const adminUser = createdUsers[0]._id;

    // mappping task to admin user id
    const sampleTasks = dummy_tasks.map((task) => {
      // return an object task, and user id of adminUser
      return { ...task, user: adminUser};
    });

    await Task.insertMany(sampleTasks);
    console.log('Data Imported!'.green.inverse);
    process.exit();

  }catch(error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // 1 to close the program
  }
}

// method for deleting data
const destroyData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit;
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
} 


// setting up command option to run individual method
if (process.argv[2] === '-d') {
  // node seeder.js -d
  destroyData();
} else {
  // node seeder.js
  importData();
}



