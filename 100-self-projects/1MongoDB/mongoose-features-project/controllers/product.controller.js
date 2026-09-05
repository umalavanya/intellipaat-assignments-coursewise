const { Product } = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      inStock,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [search] } }
      ];
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate('ratings.user', 'name email');

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
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

// More product-specific operations...
exports.updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, operation = 'set' } = req.body;

    let update;
    switch (operation) {
      case 'increment':
        update = { $inc: { quantity: quantity } };
        break;
      case 'decrement':
        update = { $inc: { quantity: -quantity } };
        break;
      case 'set':
      default:
        update = { $set: { quantity } };
        break;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: 'Stock updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};