const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'users';
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log('Connected Successfully');
        
        const db = client.db(dbName);
        const collection = db.collection('users');

        const data = [
            { name: 'John', age: 21 },
            { name: 'Jane', age: 19 },
            { name: 'Johnny', age: 27 }
        ];

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted`);
        console.log('Inserted IDs:', result.insertedIds);
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();