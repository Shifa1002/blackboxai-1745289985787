const express = require('express');
const Company = require('../models/Company');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all companies (accessible to all authenticated users)
router.get('/', protect, async (req, res) => {
  try {
    const companies = await Company.find({});
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new company (admin only)
router.post('/', protect, admin, async (req, res) => {
  const { name, address, contactEmail, contactPhone } = req.body;
  try {
    const company = new Company({ name, address, contactEmail, contactPhone });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a company (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const { name, address, contactEmail, contactPhone } = req.body;
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    company.name = name || company.name;
    company.address = address || company.address;
    company.contactEmail = contactEmail || company.contactEmail;
    company.contactPhone = contactPhone || company.contactPhone;
    await company.save();
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a company (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    await company.remove();
    res.json({ message: 'Company removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
