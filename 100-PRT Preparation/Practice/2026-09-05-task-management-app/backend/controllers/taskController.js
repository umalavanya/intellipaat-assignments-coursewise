const Task = require('../models/Task') ;

const createTask = async (req, res) => {
    try{

        const {title, description} = req.body ;
        if(!title || !description) {
            return res.status(400).json({message: 'Please fill all the fields!'}) ;
        }

        const task = await Task.create({
            user:req.user.id,
            title,
            description,
        }) ;
        res.status(201).json(task) ;    

    } catch(error){
        res.status(500).json({message: error.message}) ;
    }
} ;

// getTasks
const getTasks = async (req, res) => {
    try{

        

    } catch(error){
        res.status(500).json({message: error.message}) ;
    }
} ;


// updatetask
const updateTask = async (req, res) => {
    try{

        

    } catch(error){
        res.status(500).json({message: error.message}) ;
    }
} ;

// delete task
const deleteTask = async (req, res) => {
    try{

        

    } catch(error){
        res.status(500).json({message: error.message}) ;
    }
} ;


module.exports = {createTask, getTasks, updateTask, deleteTask } ;