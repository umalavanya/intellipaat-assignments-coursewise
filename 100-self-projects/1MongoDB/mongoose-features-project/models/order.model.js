const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true } // Price at time of order
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  deliveredAt: Date
});

// Pre-save middleware to calculate total
orderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.totalAmount = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  next();
});

// Instance method
orderSchema.methods.markAsDelivered = function() {
  this.status = 'delivered';
  this.deliveredAt = new Date();
  return this.save();
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;