const { Order } = require('../models');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    
    // Populate references
    await order.populate('user', 'name email');
    await order.populate('items.product', 'name price');
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getOrderWithPopulate = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate({
        path: 'user',
        select: 'name email role'
      })
      .populate({
        path: 'items.product',
        select: 'name price category',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};