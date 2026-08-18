const Task = require('../models/Task') ;

// 1. CREATE TASK
exports.createTask = async (req,res) => {
    try{
        console.log('Creating task with data: ', req.body) ;
        const {title, description} = req.body ;
        // Validate title
        if(!title || title.trim() === ''){
            console.log('Title Validation failed!!') ;
            return res.status(400).json({
                error: 'Title is required and cannot be empty'
            }) ;
        }

        //Create new task
        const task = new Task({
            title: title.trim(),
            description: description || '',
        }) ;

        //Save to database
        await task.save() ;
        console.log('Task created:', task) ;

        res.status(201).json(task) ;
    } catch (error) {
        console.log('Error creating task:',error) ;
        res.status(500).json({error: 'Failed to create task'}) ;     
    }
} ;

// 2. GET ALL Tasks
exports.getAllTasks = async(req,res) => {
    try{

        console.log('Fetching all tasks') ;

        const tasks = await Task.find().sort({createdAt: -1}) ;

        console.log(`Found ${tasks.length} tasks`) ;

        res.status(200).json(tasks) ;

    } catch(error) {
        console.log('Error fetching tasks: ', error) ;
        res.status(500).json({error: 'Failed to fetch tasks'})
    }
} ;


// 3. TOGGLE TASK STATUS

exports.toggleTaskStatus = async (req,res) =>{
    try{
        const {id} = req.params ;
        console.log(`Toggling task status for ID: ${id}`) ;

        //Find task by ID 
        const task = await Task.findById(id) ;

        if(!task){
            console.log('Task not found') ;
            return res.status(404).json({error: 'Task not found'}) ;
            
        }

        //Toggle status
        const oldStatus = task.status ;
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending' ;
        await task.save() ;

        console.log(`Status toggled from ${oldStatus} to ${task.status}`) ;
        res.status(200).json(task) ;
    } catch (error) {
        console.error('Error toggling task: ',error) ;
        res.status(500).json({error: 'Failed to update task' }) ;
    }
} ;