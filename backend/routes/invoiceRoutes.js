const express = require('express');
const Invoice = require('../models/Invoice');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all invoices (accessible to all authenticated users)
router.get('/', protect, async (req, res) => {
  try {
    const invoices = await Invoice.find({})
      .populate({
        path: 'contract',
        populate: [
          { path: 'company' },
          { path: 'products.product' }
        ]
      });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new invoice (authenticated users)
router.post('/', protect, async (req, res) => {
  const { contract, invoiceNumber, items, subtotal, tax, total, issueDate, dueDate, status } = req.body;
  try {
    const invoice = new Invoice({
      contract,
      invoiceNumber,
      items,
      subtotal,
      tax,
      total,
      issueDate,
      dueDate,
      status,
    });
    await invoice.save();
    const populatedInvoice = await invoice.populate({
      path: 'contract',
      populate: [
        { path: 'company' },
        { path: 'products.product' }
      ]
    }).execPopulate();
    res.status(201).json(populatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an invoice (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const { contract, invoiceNumber, items, subtotal, tax, total, issueDate, dueDate, status } = req.body;
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    invoice.contract = contract || invoice.contract;
    invoice.invoiceNumber = invoiceNumber || invoice.invoiceNumber;
    invoice.items = items || invoice.items;
    invoice.subtotal = subtotal || invoice.subtotal;
    invoice.tax = tax || invoice.tax;
    invoice.total = total || invoice.total;
    invoice.issueDate = issueDate || invoice.issueDate;
    invoice.dueDate = dueDate || invoice.dueDate;
    invoice.status = status || invoice.status;
    await invoice.save();
    const populatedInvoice = await invoice.populate({
      path: 'contract',
      populate: [
        { path: 'company' },
        { path: 'products.product' }
      ]
    }).execPopulate();
    res.json(populatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an invoice (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    await invoice.remove();
    res.json({ message: 'Invoice removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
