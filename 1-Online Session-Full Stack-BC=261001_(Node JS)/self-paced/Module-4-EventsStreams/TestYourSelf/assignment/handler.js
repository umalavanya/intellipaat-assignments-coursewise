// Create event handler methods
const eventHandlers = {
    // Handler for 'connect' event
    onConnect: (userData) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] User connected:`, userData);
        console.log(`- User ID: ${userData.userId}`);
        console.log(`- IP Address: ${userData.ipAddress}`);
        console.log(`- User Agent: ${userData.userAgent}`);
    },
    
    // Additional handler for connection details
    onConnectionDetails: (userData) => {
        console.log(`Connection established at ${new Date().toLocaleString()}`);
        console.log(`Total active connections: ${userData.activeConnections}`);
        console.log('---');
    }
};

module.exports = eventHandlers;