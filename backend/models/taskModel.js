import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // from the User collection on MongoDB website / compass
  },
  title: {
    type: String, 
    required: true,
  },
  start: {
    type: String, 
    required: true, 
  },
  end: {
    type: String, 
    required: true, 
  },
  description: {
    type: String, 
    default: null, 
  },

})

const Task = mongoose.model("Task", taskSchema);
export default Task;