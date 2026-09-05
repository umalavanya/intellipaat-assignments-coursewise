const { User } = require('../models');
const mongoose = require('mongoose');

// CREATE - Various ways to create documents
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    
    // Method 1: Using new + save()
    const user1 = new User(userData);
    await user1.save();
    
    // Method 2: Using create()
    // const user2 = await User.create(userData);
    
    // Method 3: Using insertMany() for multiple
    // const users = await User.insertMany([userData1, userData2]);
    
    res.status(201).json({
      success: true,
      data: user1,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// READ - Get all users with filtering, sorting, pagination
exports.getUsers = async (req, res) => {
  try {
    // Query parameters for filtering, sorting, pagination
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      role,
      isActive,
      minAge,
      maxAge,
      search
    } = req.query;

    // Build filter object
    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = parseInt(minAge);
      if (maxAge) filter.age.$lte = parseInt(maxAge);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Advanced query with all features
    const query = User.find(filter)
      .select('-password') // Exclude password
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean() // Return plain JavaScript objects
      .populate('_id', 'name email'); // Example population (if we had references)

    // Using query helper
    // const query = User.find().active();

    const users = await query;
    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// READ - Get single user with population
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format'
      });
    }

    // Using findById with multiple options
    const user = await User.findById(id)
      .select('-password')
      .lean()
      .populate({
        path: '_id',
        select: 'name email'
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Using virtuals
    const userWithVirtuals = user;
    userWithVirtuals.ageInDays = user.ageInDays; // Virtual property

    res.status(200).json({
      success: true,
      data: userWithVirtuals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// UPDATE - Update user with various methods
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { method = 'findByIdAndUpdate' } = req.query;

    let user;
    
    switch (method) {
      case 'findByIdAndUpdate':
        // Method 1: findByIdAndUpdate with options
        user = await User.findByIdAndUpdate(
          id,
          updateData,
          {
            new: true, // Return updated document
            runValidators: true, // Run schema validators
            context: 'query', // Context for validators
            select: '-password'
          }
        );
        break;
        
      case 'findOneAndUpdate':
        // Method 2: findOneAndUpdate with custom query
        user = await User.findOneAndUpdate(
          { _id: id, isActive: true },
          { $set: updateData },
          { new: true, runValidators: true }
        );
        break;
        
      case 'updateOne':
        // Method 3: updateOne (doesn't return document)
        await User.updateOne(
          { _id: id },
          { $set: updateData },
          { runValidators: true }
        );
        user = await User.findById(id).select('-password');
        break;
        
      case 'save':
        // Method 4: Find then save (triggers middleware)
        user = await User.findById(id);
        if (!user) {
          return res.status(404).json({
            success: false,
            error: 'User not found'
          });
        }
        Object.assign(user, updateData);
        await user.save();
        user = user.toJSON();
        delete user.password;
        break;
        
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid update method'
        });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// DELETE - Various delete methods
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { method = 'findByIdAndDelete' } = req.query;

    let result;
    
    switch (method) {
      case 'findByIdAndDelete':
        // Method 1: findByIdAndDelete
        result = await User.findByIdAndDelete(id);
        break;
        
      case 'findOneAndDelete':
        // Method 2: findOneAndDelete with conditions
        result = await User.findOneAndDelete({ _id: id, isActive: false });
        break;
        
      case 'deleteOne':
        // Method 3: deleteOne
        result = await User.deleteOne({ _id: id });
        break;
        
      case 'deleteMany':
        // Method 4: deleteMany with conditions
        result = await User.deleteMany({ role: 'user', isActive: false });
        break;
        
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid delete method'
        });
    }

    if (!result || (result.deletedCount === 0)) {
      return res.status(404).json({
        success: false,
        error: 'User not found or already deleted'
      });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// ADVANCED - Bulk operations
exports.bulkOperations = async (req, res) => {
  try {
    const { operation, data } = req.body;

    let result;
    
    switch (operation) {
      case 'insertMany':
        result = await User.insertMany(data);
        break;
        
      case 'updateMany':
        result = await User.updateMany(
          { role: 'user' },
          { $set: { isActive: true } },
          { runValidators: true }
        );
        break;
        
      case 'bulkWrite':
        result = await User.bulkWrite([
          {
            insertOne: {
              document: data.insert || {}
            }
          },
          {
            updateOne: {
              filter: { email: data.email },
              update: { $set: data.update },
              upsert: true
            }
          },
          {
            deleteOne: {
              filter: { role: 'inactive' }
            }
          }
        ]);
        break;
        
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid bulk operation'
        });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: 'Bulk operation completed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// AGGREGATION - Complex queries using aggregation pipeline
exports.getUserAnalytics = async (req, res) => {
  try {
    const analytics = await User.aggregate([
      // Stage 1: Match (filter)
      {
        $match: {
          isActive: true,
          age: { $gte: 18 }
        }
      },
      
      // Stage 2: Group with multiple operations
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          averageAge: { $avg: '$age' },
          minAge: { $min: '$age' },
          maxAge: { $max: '$age' },
          users: { $push: { name: '$name', email: '$email' } }
        }
      },
      
      // Stage 3: Sort
      {
        $sort: { count: -1 }
      },
      
      // Stage 4: Project (shape the output)
      {
        $project: {
          role: '$_id',
          count: 1,
          averageAge: { $round: ['$averageAge', 2] },
          minAge: 1,
          maxAge: 1,
          userSample: { $slice: ['$users', 5] }
        }
      },
      
      // Stage 5: Facet for multiple aggregations
      {
        $facet: {
          roleStats: [
            { $group: { _id: null, total: { $sum: '$count' } } }
          ],
          detailed: [
            { $sort: { count: -1 } }
          ]
        }
      }
    ]);

    // Additional advanced aggregations
    const ageDistribution = await User.aggregate([
      {
        $bucket: {
          groupBy: '$age',
          boundaries: [0, 18, 30, 50, 70, 100],
          default: 'Other',
          output: {
            count: { $sum: 1 },
            names: { $push: '$name' }
          }
        }
      }
    ]);

    const dailySignups = await User.aggregate([
      {
        $match: { createdAt: { $exists: true } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 }
      },
      {
        $limit: 30
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        roleAnalytics: analytics,
        ageDistribution,
        dailySignups
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// TRANSACTIONS - Using MongoDB transactions
exports.transactionExample = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userData, orderData } = req.body;

    // Create user within transaction
    const user = new User(userData);
    await user.save({ session });

    // Create order referencing the user
    const Order = require('../models/order.model');
    const order = new Order({
      ...orderData,
      user: user._id
    });
    await order.save({ session });

    // Update user with order reference
    await User.findByIdAndUpdate(
      user._id,
      { $push: { orders: order._id } },
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: { user, order },
      message: 'Transaction completed successfully'
    });
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GEOSPATIAL - If we had location data
exports.getNearbyUsers = async (req, res) => {
  try {
    const { lat, lng, distance = 5000 } = req.query;

    const users = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: 'distance',
          maxDistance: parseInt(distance),
          spherical: true
        }
      },
      {
        $limit: 20
      }
    ]);

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// TEXT SEARCH - Full-text search
exports.searchUsers = async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const users = await User.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit))
    .select('-password');

    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// DISTINCT - Get distinct values
exports.getDistinctValues = async (req, res) => {
  try {
    const { field } = req.params;

    const values = await User.distinct(field);

    res.status(200).json({
      success: true,
      data: values,
      field,
      count: values.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// COUNT - Various count methods
exports.getUserCounts = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ isActive: true });
    const byRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive: total - active,
        byRole
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};