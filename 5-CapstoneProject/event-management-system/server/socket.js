const {Server} = require("socket.io") ;
function initSocket(server){
    const io = new Server(server, {
        cors: {
            origin : "*" ,
            methods: ["GET", "POST"] ,

        } ,
    }) ;

    io.on("connection", (socket) => {
        let currentUserEmail = null ;

        // When user identifies themselves on socket connection
        socket.on("user_connected", async ({email}) => {

            if(!email) return ;

            currentuseraEmail = email ;
            socket.userEmail = email ;

            const roomName = `user:${email}` ;

            // Check existing sockets in this user's room Before joining
            const existingSockets = await io.in(roomName).fetchSockets() ;

            // Join the user's room
            socket.join(roomName) ;


            // If there are Other connected sockets in this room for this user

            if(existingSockets.length > 0){
                console.log(`[Socket] Multiple login detected for ${email}`) ;
                socket.emit("multiple_login_detected", {
                    email,
                    message: "Multiple login detected on another tab or device."

                }) ;
            }
        }) ;



        // User confirms they want to continue session on THIS tab and logout
        socket.on("confirm_continue_here", async ({email}) => {
            const targetEmail = email || curretnUserEmail ;
            if(!taretEmail) return ;

            const roomName = `user:${targetEmail}` ;
            const socketInRoom = await io.in(roomname).fetchSockets() ;

            console.log(`[Socket] Force logging out previous sessiosn for ${targetEmail}, Total sockets: ${socketsInroom.length}`) ;


            socketInRoom.forEach((s) => {
                if(s.id !== socket.id) {
                    // Emit force_logout to the target socket
                    io.to(s.id).emit("force_logout", {
                        message:
                            "You have been logged out because this account was accessed from other device. ",
                            
                    }) ;
                    // Remove from room so it won't receive future room broadcasts
                    s.leave(roomName) ;

                }

            }) ;

        }) ;

        // User explicitly logs out
        socket.on("user_logout", () => {
            if(currentUserEmail){
                socket.leave(`user:${currentUserEmail}`) ;
                currentUserEmail = null ;               
                }
        }) ;


        // Disconnect
    socket.on("disconnect", () => {
      if (currentUserEmail) {
        socket.leave(`user:${currentUserEmail}`);
      }
    });
  });

  return io;
}

module.exports = initSocket;