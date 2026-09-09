const Task = require('../models/Task') ;

const createTask = async (req,res) => {
    try{
        const {title, description} = req.body ;
        if(!title || !description) {
            return res.status(400).json({message:'Please fill all the fields!'})
        }
        const task = await Task.create({
            user:req.user.id,
            title, 
            description}) ;
        res.status(201).json(task) ;
    } catch (error){
        res.status(500).json({message:error.message}) ;
    }
} ;


const getTasks = async (req,res) => {
    try{

        const tasks = await Task.find({user:req.user.id}) ;
        res.json(tasks) ;

    } catch (error){
        res.status(500).json({message:error.message}) ;   
    }
}


const updateTask = async (req,res) => {
    try{
        const task = await Task.findById(req.params.id) ;

        if(!task){
            return res.status(404).json({message: 'Task not found!!'}) ;    
        }

        if(task.user.toString() !== req.user.id){
            res.status(401).json({message:'Not authorized'}) ;
        }
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new:true}
        ) ;

        res.json(updatedTask) ;

    } catch (error){
        res.status(500).json({message:error.message}) ;
        
    }
}


const deleteTask = async (req,res) => {
    try{
        console.log(req.params.id) ;
        const task = await Task.findById(req.params.id) ;

        if(!task){
            return res.status(404).json({message: 'Task not found'}) ;
        }

        if(task.user.toString() !== req.user.id){
            return res.status(401).json({message: 'Not Authorized'})
        }

        await task.deleteOne() ;

    } catch (error){
        res.status(500).json({message:error.message}) ;
        
    }
}

module.exports = {createTask,getTasks, updateTask, deleteTask} ;