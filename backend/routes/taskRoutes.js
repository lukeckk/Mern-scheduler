// this file uses expressjs to seperate routers from server.js for organization

import {express} from "express"
import dummy_tasks from '../data/dummy_task.js';


const router = express.Router();

router.get('/', (req,res) => {
  res.json(dummy_tasks)
})


export default router;