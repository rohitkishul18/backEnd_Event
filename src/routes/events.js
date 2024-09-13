const express = require('express');
const router = express.Router();
const Event = require('../model/event');


// Create an Event
router.post('/', async (req, res) => {
    try{
        const event = new Event(req.body);
        const eventData=await event.save();
          res.json({ id: event._id });
    }catch(err){
        res.status(400).send('errror',error)
    }
})

// Get all Events
router.get('/', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Get Event by ID
router.get('/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// Filter Events by Location
router.get('/', async (req, res) => {
    const location = req.query.location;
    try {
      const events = await Event.find({ location });
      res.json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

//Book an Event
router.post('/:id/book', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      const userId = req.body.user_id;
      if (!event.booked_users.includes(userId)) {
        event.booked_users.push(userId);
        await event.save();
      }
      res.json({ message: 'Booking successful' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;

