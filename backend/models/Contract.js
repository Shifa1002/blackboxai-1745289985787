const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  }],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  terms: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
