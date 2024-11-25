// this file is for connecting to mongoDB database using moongose

import mongoose from "mongoose";

// async becuase methods callling mongoose will return a promise, so we can do .catch or async / await
const connectDB = async () => {
  try{
    // here returns a promise after calling mongoose
    const conn = await mongoose.connect(process.env.MONGO_URI) 
    // this will print out in the terminal when connected when npm start
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error ) {
    console.log(`Error: ${error.message}`)
    process.exit(1);

  }
};

export default connectDB; 