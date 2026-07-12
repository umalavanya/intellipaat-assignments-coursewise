const EventEmitter = require('events');
const handlers = require('./handler');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Import and register event handlers
const { onConnect, onConnectionDetails } = handlers;

// Register the 'connect' event with multiple handlers
eventEmitter.on('connect', onConnect);
eventEmitter.on('connect', onConnectionDetails);

// Simulate user connections
function simulateUserConnection(userId) {
    const userData = {
        userId: userId || `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        activeConnections: Math.floor(Math.random() * 10) + 1
    };
    
    // Emit 'connect' event
    console.log(`\n🚀 Emitting connect event for ${userData.userId}`);
    eventEmitter.emit('connect', userData);
}

console.log('========================================');
console.log('📡 Event Emitter Demo');
console.log('========================================');

// Simulate 3 user connections with delays
simulateUserConnection('User_001');

setTimeout(() => {
    simulateUserConnection('User_002');
}, 1000);

setTimeout(() => {
    simulateUserConnection('User_003');
}, 2000);

setTimeout(() => {
    console.log('\n✅ All connections simulated!');
}, 3000);

// Export for testing
module.exports = { eventEmitter };