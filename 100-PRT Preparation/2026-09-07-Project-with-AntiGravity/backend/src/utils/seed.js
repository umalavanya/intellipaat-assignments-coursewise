const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Task = require('../models/Task');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Task.deleteMany();

    console.log('Cleared existing users and tasks.');

    // Create demo user
    const demoUser = await User.create({
      name: 'Alex Johnson',
      email: 'demo@example.com',
      password: 'password123'
    });

    console.log(`Created Demo User: ${demoUser.email} / password123`);

    // Sample tasks
    const tasks = [
      {
        user: demoUser._id,
        title: 'Design Task Manager Architecture',
        description: 'Set up Node.js Express backend with MongoDB and React Vite frontend using Redux Toolkit.',
        status: 'completed',
        priority: 'high',
        category: 'Development',
        dueDate: new Date(Date.now() + 86400000 * 2),
        tags: ['fullstack', 'architecture', 'react'],
        subtasks: [
          { title: 'Setup Express endpoints', completed: true },
          { title: 'Configure Redux slices', completed: true }
        ]
      },
      {
        user: demoUser._id,
        title: 'Implement User JWT Authentication',
        description: 'Secure API endpoints with JSON Web Tokens and hash user passwords with bcryptjs.',
        status: 'in-progress',
        priority: 'high',
        category: 'Security',
        dueDate: new Date(Date.now() + 86400000 * 4),
        tags: ['auth', 'jwt', 'security'],
        subtasks: [
          { title: 'Build login and register pages', completed: true },
          { title: 'Add auth token interceptor to Axios', completed: false }
        ]
      },
      {
        user: demoUser._id,
        title: 'Craft Glassmorphic UI Dashboard',
        description: 'Design dark-mode aesthetic cards with vibrant gradients, filter pills, and smooth transitions.',
        status: 'pending',
        priority: 'medium',
        category: 'Design',
        dueDate: new Date(Date.now() + 86400000 * 6),
        tags: ['css', 'ui', 'frontend'],
        subtasks: [
          { title: 'Create glass card styles', completed: false },
          { title: 'Add micro-animations for task status toggle', completed: false }
        ]
      },
      {
        user: demoUser._id,
        title: 'Perform Code Review & Performance Audit',
        description: 'Ensure indexing on MongoDB schemas and clean separation of UI components.',
        status: 'pending',
        priority: 'low',
        category: 'Quality',
        dueDate: new Date(Date.now() + 86400000 * 10),
        tags: ['audit', 'performance'],
        subtasks: [
          { title: 'Check component re-renders', completed: false }
        ]
      }
    ];

    await Task.insertMany(tasks);
    console.log(`Inserted ${tasks.length} sample tasks successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
