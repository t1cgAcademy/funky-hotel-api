const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Room Model
const Room = require('../models/Room.js');

// Reservation Model
const Reservation = require('../models/Reserveration.js');

// Room Validation
const validateRoomInput = require('../validation/room.js');

// @route   GET api/room/test
// @desc    Tests room route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Test works' }));

// @route   GET api/room
// @desc    Get all rooms
// @access  Public
router.get('/', (req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(404).json({ noroomsfound: 'No rooms founds' }));
});

// @route   GET api/room/:num
// @desc    Get room by number
// @access  Public
router.get('/:num', (req, res) => {
  Room.findOne({ number: req.params.num })
    .then(room => res.json(room))
    .catch(err =>
      res.status(404).json({ noroomfound: 'No room found with that number' })
    );
});

// @route   POST api/room
// @desc    Create room
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if room number already exists
  Room.findOne({ number: req.body.number }).then(room => {
    if (room) {
      errors.room = 'That room number already exists';
      return res.status(400).json(errors);
    } else {
      const newRoom = new Room({
        price: req.body.price,
        name: req.body.name,
        number: req.body.number,
        bed: req.body.bed,
        bathtub: req.body.bathtub,
        kitchen: req.body.kitchen
      });
      newRoom
        .save()
        .then(room => res.json(room))
        .catch(err => res.status(404).json(err));
    }
  });
});

// @route   DELETE api/room/:num
// @desc    Delete room by number
// @access  Public
router.delete('/:num', (req, res) => {
  Room.findOneAndRemove(req.params.num)
    .then(() => res.json({ success: true }))
    .catch(err =>
      res.status(404).json({ noroomfound: 'No room found with that number' })
    );
});

module.exports = router;
