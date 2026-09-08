import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import productsSeed from './data/productsSeed.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(productsSeed);

    console.log('✅ Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error Seeding Data: ${error.message}`);
    process.exit(1);
  }
};

importData();
