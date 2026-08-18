const express = require('express') ;
const router = express.Router() ;
const taskController =  require('../controllers/taskController') ;

//POST /api/tasks - Create a new task
router.post('/',taskController.createTask) ;

//GET /api/tasks/ - Get all tasks
router.get('/',taskController.getALlTasks) ;

//PATCH /api/tasks/:id - Toggle task status
router.patch('/:id'. taskController.toggleTaskStatus) ;

module.exports =  router ;
