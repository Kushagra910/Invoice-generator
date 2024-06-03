import mongoose from 'mongoose';

// Product schema
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productQty: {
    type: Number,
    required: true,
  },
  productRate: {
    type: Number,
    required: true,
  },
});

// Invoice schema
const InvoiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: {
    type: [ProductSchema],
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  after_gst_amount: {
    type: Number,
    required: true,
  },
  invoice_date: {
    type: Date,
    default: Date.now,
  },
  valid_date: {
    type: Date,
    default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
});

// Invoice model
module.exports  = mongoose.model('Invoice', InvoiceSchema);

