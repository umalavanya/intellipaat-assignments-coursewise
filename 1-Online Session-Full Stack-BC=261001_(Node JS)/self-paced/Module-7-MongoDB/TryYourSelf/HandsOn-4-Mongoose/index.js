const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);

async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://localhost:27017/myproject", { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Connected to MongoDB');

        // Insert data
        const data = [
            { name: "John", age: 21 },
            { name: "Jane", age: 19 },
            { name: "Johnny", age: 27 }
        ];

        const result = await User.insertMany(data);
        console.log('Inserted documents:', result);
        console.log(`${result.length} documents inserted successfully`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed');
    }
}

main();