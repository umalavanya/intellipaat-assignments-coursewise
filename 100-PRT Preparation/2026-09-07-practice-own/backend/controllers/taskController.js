const Task = require('../models/Task') ;


// createTask
const createTask = async (req,res) => {
    try{
        const {title,description} = req.body ;
        if(!title || !description){
            return res.status(400).json({message:"Please fill all fields!"} ) ;
        }

        const task = await Task.create({
            user:req.user.id,
            title,
            description
        }) ;
        res.status(201).json(task) ;
    } catch(error){
        res.status(500).json({message:error.message}) ;
    }
} ;

// Get all tasks
const getTasks = async (req,res) => {
    try{
        const tasks = await Task.find({user: req.user.id}) ;
        if(tasks){
            res.status(200).json(tasks);
        }else{
            res.status(200).json({message: 'no tasks found, create a task'})
        }  
    } catch(error){
        res.status(500).json({message:error.message}) ;
    }
} ;



const updateTask = async (req,res) => {
    try{

        const task = await Task.findById(req.params.id) ;
        if(!task){
            return res.status(404).json({message:'Task not found'}) ;
        }

        // Check user
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({message:'Not authorized'}) ;
        }

        const updatedtask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        ) ;
        res.json(updatedTask) ;

    } catch(error){
        res.status(500).json({message:error.message}) ;
    }
} ;



const deleteTask = async (req,res) => {
    try{
        const task = await Task.findById(req.params.id) ;
         if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });

    } catch(error){
        res.status(500).json({message:error.message}) ;
    }
} ;



module.exports = {createTask, getTasks, updateTask, deleteTask}