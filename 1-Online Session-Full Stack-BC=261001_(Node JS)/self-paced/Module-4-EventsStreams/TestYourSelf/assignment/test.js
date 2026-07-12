const http = require('http');

console.log('🧪 Starting connection tests...\n');

// Test the server by making multiple connections
function testConnection(testNumber) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
        timeout: 2000 // 2 second timeout
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`✅ Test ${testNumber}: Server response - ${data.trim()}`);
        });
    });

    req.on('error', (e) => {
        console.error(`❌ Test ${testNumber}: Failed - ${e.message}`);
        console.log('💡 Make sure the server is running: node main.js');
    });

    req.on('timeout', () => {
        req.destroy();
        console.error(`❌ Test ${testNumber}: Timeout - Server not responding`);
    });

    req.end();
}

// Make 3 test connections with delays
console.log('📤 Sending test connections...');
testConnection(1);

setTimeout(() => {
    testConnection(2);
}, 500);

setTimeout(() => {
    testConnection(3);
}, 1000);

// Keep the script running to receive responses
setTimeout(() => {
    console.log('\n✅ All tests completed!');
    process.exit(0);
}, 3000);