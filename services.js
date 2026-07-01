const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// @route   GET api/services
// @desc    Get all services (Public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/services
// @desc    Add a service (Private/Admin)
router.post('/', auth, async (req, res) => {
  try {
    const newService = new Service(req.body);
    const service = await newService.save();
    res.json(service);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/services/:id
// @desc    Update a service (Private)
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/services/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Service deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
