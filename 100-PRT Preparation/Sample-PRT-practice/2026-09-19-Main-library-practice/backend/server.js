const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const Task = require('./models/Task') ;
const mongoose = require('mongoose') ;
dotenv.config() ;

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;


// mongoDb connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks_db')
    .then(() => console.log(`MongoDB is connected!!`))
    .catch((err) => console.error('MongoDB is not connected', err)) ;

// Middleware


// -----======================= REST API end points ===================

// POST method



app.post('/api/tasks', async (req, res) => {

    try{
        const {title, description, category, dueDate} = req.body ;
        console.log({title, description, category, dueDate}) ;
        const newTask = new Task({title, description, category, dueDate}) ;
        const savedTask = await newTask.save() ;
        res.status(200).json({success: true, data: savedTask}) ;

    } catch(error) {
        res.status(400).json({success: false, error: error.message}) ;
    }
})


app.get('/api/tasks', async (req,res) => {

    try{
        const {category, completed, sort} = req.query ;
        console.log(req.query) ;

        const tasks = await Task.find() ;
        res.status(200).json({success: true, data: tasks})

    } catch(error) {
        res.status(400).json({success: false, error: error.message}) ;
    }
    
}) ;

app.put('/api/tasks/:id', async (req, res) => {
   try{

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true }
    ) ;
    if(!task){
        return res.status(404).json({success: false, error: 'task not found'}) ;
    }
    res.status(200).json({success: true, data: task}) ;

   } catch(error){
    res.status(400).json({success: false, message: error.message}) ;
   }

} ) ;

app.patch('/api/tasks/:id/complete', async (req, res) => {
   try{

    const task = await Task.findById(req.params.id) ;
    task.completed = !task.completed ;
    await task.save() ;
    res.status(200).json({success: true, data: task}) ;
   } catch(error){
    res.status(400).json({success: false, message: error.message}) ;
   }

} ) ;

app.delete('/api/tasks/:id', async (req, res) => {
   try{

    const task = await Task.findByIdAndDelete(req.params.id) ;
    if(!task){
    res.status(404).json({success: false, error: 'task not found'}) ;  
   }

   res.status(200).json({success: true, message: 'Task deleted successfully'}) ;


   } catch(error){
    res.status(500).json({success: false, message: error.message}) ;
   }

} ) ;



// Health Check
app.get('/health', (req,res) => {
    res.status(200).json({message: 'The server is working'}) ;
}) ;


// global error handling
app.use((req,res) => {
    res.status(404).json({success: false, error: 'Route not found!!'})
})


// Server starting
const PORT = process.env.PORT ;
app.listen(PORT, () => {console.log(`The server is runnng on http://localhost:${PORT}`)}) ;

