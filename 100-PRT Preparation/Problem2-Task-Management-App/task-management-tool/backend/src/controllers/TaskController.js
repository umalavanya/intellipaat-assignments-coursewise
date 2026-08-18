const Task = require('../models/Task') ;

// 1. CREATE TASK
exports.createTask = async (req,res) => {
    try{
        console.log('Creating task with data: ', req.body) ;
        const {title, description} = req.body ;
    }
}