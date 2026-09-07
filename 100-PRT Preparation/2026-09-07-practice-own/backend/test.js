const axios = require('axios');
const BASE_URL = 'http://localhost:5000/api';
let token = '';
let taskId = '';

async function run() {
    try {
        // 1. Register
        const register = await axios.post(`${BASE_URL}/auth/register`, {
            userName: 'testuser1',
            email: 'test1@example.com',
            password: 'password123'
        });
        console.log('1. Register:', register.data.message || 'OK');
        token = register.data.token;

        // 2. Login
        const login = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('2. Login:', login.data.message || 'OK');
        token = login.data.token;

        // 3. Create Task
        const create = await axios.post(
            `${BASE_URL}/task`,
            { title: 'My Task', description: 'Test', status: 'pending' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('3. Create Task:', create.data.title);
        taskId = create.data._id;

        // 4. Get All Tasks
        const get = await axios.get(
            `${BASE_URL}/task`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('4. Get Tasks:', get.data.length, 'tasks found');

        // 5. Update Task
        const update = await axios.put(
            `${BASE_URL}/task/${taskId}`,
            { title: 'Updated Task', status: 'completed' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('5. Update Task:', update.data.title);

        // 6. Delete Task
        const del = await axios.delete(
            `${BASE_URL}/task/${taskId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('6. Delete Task:', del.data.message || 'Deleted');

        // 7. Verify Deletion
        const verify = await axios.get(
            `${BASE_URL}/task`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('7. Verify Deletion:', verify.data.length, 'tasks remaining');

    } catch (err) {
        console.log('Error:', err.response?.data || err.message);
    }
}

run();