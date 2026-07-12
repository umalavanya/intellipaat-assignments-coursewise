const events = require("events"); 
const emitter = new events.EventEmitter() ;

emitter.on("login", () => {
    console.log("Customer logged in") ;
})

console.log("Some code") ;

emitter.emit("login") ;

console.log("Some more code") ;