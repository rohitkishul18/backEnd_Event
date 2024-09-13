const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Create a User
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
     const userStore = await user.save();
    console.log('userStore',userStore);
    res.json({ id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('booked_events');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
