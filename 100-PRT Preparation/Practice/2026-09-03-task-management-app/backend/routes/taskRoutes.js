const express = require('express') ;
const router = express.Router() ;
const {Protect} =  require('../middleware/auth') ;
const {createTask, getTasks, updateTask, deleteTask} = require('../controller/taskController') ;

router.route('/').post(Protect, createTask).get(Protect, getTasks) ;
router.route('/:id').put(Protect, updateTask).delete(Protect, deleteTask) ;

module.exports = router ;
