const express = require("express") ;
const router = express.Router() ;
const {
    createEvent,
    getEventsByEmail,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController") ;


router.post("/", createEvent) ;
router.get("/:email", getEventsByEmail) ;
router.put("/:event_id", updateEvent) ;
router.delete("/:event_id", deleteEvent) ;

module.exports = router ;