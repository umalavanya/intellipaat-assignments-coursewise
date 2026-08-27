const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db')

dotenv.config() ;


const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;


connectDB() ;

// GET - Read all users

app.get('/api/users', (req,res) => {

    res.status(200).json({
        success: true,
        data: users
    })
})

// GET - Read single user by ID
app.get('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id) ;
    const user = users.find(u => u.id === id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found`
        }) ;
    }

    res.status(200).json({
        success: true,
        data: user
    }) ;
}) ;


// POST - Create a new user
app.post('/api/users', (req,res) => {
    const {name, email} = req.body ;
    
    // Validation
    if(!name || ! email){
        return res.status(404).json({
            success: false,
            message: 'Name and email are required!!'
        })
    } 
    // Create new User
    const newUser = {
        id: users.length + 1, 
        name,
        email
    }
    users.push(newUser) ;

    res.status(201).json({
        success: true,
        message: "User created successfully!",
        data: newUser
    }) ;
}) ;


// PUT - Update an existing user
app.put('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id) ;
    const {name,email} = req.body ;
    const userIndex = users.findIndex(u => u.id === id) ;

    if(userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found`
        }) ;
    }

    // Vaidation
    if(!name || !email){
        return res.status(400).json({
            success: false,
            message: "Name and email are required!"
        })
    }
    // Update user
    users[userIndex] = { ...users[userIndex], name, email} ;

    res.status(200).json({
        success: true,
        message: "User updated successfully!!",
        data: users[userIndex] 
    }) ;
})


// DELETE - Remove a user
app.delete('/api/users/:id', (req,res) => {

    const id = parseInt(req.params.id) ;
    const userIndex = users.findIndex(u => u.id === id) ;

    if(userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found`
        }) ;
    }


    // Remove user
    users.splice(userIndex, 1);

    res.status(200).json({
        success: true,
        message: `User with id ${id} deleted successfully!!`
    })
}) ;


// to check the end point
app.get('/api/health', (req,res) => {
    res.status(200).json({message: 'The health is good!'
    })
}) ;


app.listen(4000,console.log("The server is running on 4000!!"))
