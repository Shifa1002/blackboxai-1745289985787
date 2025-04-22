const express = require('express');
const Contract = require('../models/Contract');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all contracts (accessible to all authenticated users)
router.get('/', protect, async (req, res) => {
  try {
    const contracts = await Contract.find({})
      .populate('company')
      .populate('products.product');
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new contract (admin only)
router.post('/', protect, admin, async (req, res) => {
  const { company, products, startDate, endDate, terms } = req.body;
  try {
    const contract = new Contract({ company, products, startDate, endDate, terms });
    await contract.save();
    const populatedContract = await contract.populate('company').populate('products.product').execPopulate();
    res.status(201).json(populatedContract);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a contract (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const { company, products, startDate, endDate, terms } = req.body;
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    contract.company = company || contract.company;
    contract.products = products || contract.products;
    contract.startDate = startDate || contract.startDate;
    contract.endDate = endDate || contract.endDate;
    contract.terms = terms || contract.terms;
    await contract.save();
    const populatedContract = await contract.populate('company').populate('products.product').execPopulate();
    res.json(populatedContract);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a contract (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    await contract.remove();
    res.json({ message: 'Contract removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
