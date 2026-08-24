const event = require('../models/Event') ;

//  Crete event

const createEvent = async (req, res) => {
    try{
        const data = req.body ;

        const eventDoc = new Event({
            title: data.title,
            description: data.description,
            eventStartDate: data.eventStartDate,
            eventEndDate: data.eventEndDate,
            location: data.location,
            category: data.category,
            status: data.status,
            createdBy: data.createdBy,
        }) ;

        const result = await eventDoc.save() ;

        res.json({success: true, eventId: result._id}) ;
        
    } catch(error){

        console.error("Error in POST /events: ",error) ;
        res.status(500).json({successs:false, message: error.message}) ;
    
    }
}


// Get Events by user email
const getEventsByEmail = async (req,res) => {
    try{
        const email = req.params.email ;
        const events = await Event.find({createdBy: email}).lean() ;

        events.forEach((events) => (event._id = event._id.toString() )) ;
        res.json({success: true, events }) ;
    } catch (error){
        console.error("Error in GET /events:", error) ;
        res.status(500).json({success: false, message: error.message }) ;
        
    }
} 


// Update event
const updateEvent = async(req,res) => {
    try{
        const eventId = req.params.event_id ;
        const data = req.body ;

        await Event.findByIdAndUpdate(eventId, {$set: data}) ;

        res.json({success: true, message:"Event updated "}) ;
    }catch(error){
        console.error("Error in PUT /events: ", error) ;
        res.status(500).json({success: false, message: error.message}) ;
    }
} ;


// Delete event
const deleteEvent = async (req, res) => {
    try{
        const eventId = req.params.event_id ;
        await Event.findByIdAndDelete(eventId) ;

        res.json({successs: true, message: "Event deleted"}) ;

    } catch (error) {
        console.error("Error in DELETE /events:", error) ;
        res.status(500),json({success: false, message: error.message}) ;
    }
}


module.exports = {
    createEvent,
    getEventsByEmail,
    updateEvent,
    deleteEvent,
}