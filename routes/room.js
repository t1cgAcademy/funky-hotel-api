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
    .catch(err => res.status(404).json({ msg: 'No rooms founds' }));
});

// @route   GET api/room/:id
// @desc    Get room by id
// @access  Public
router.get('/:id', (req, res) => {
  Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(404).json({ msg: 'No room found with that ID' }));
});

// @route   GET api/room/number/:num
// @desc    Get room by number
// @access  Public
router.get('/number/:num', (req, res) => {
  Room.findOne({ number: req.params.num })
    .then(room => {
      if (!room) {
        res.status(404).json({ msg: 'No room found with that number' });
      }
      res.json(room);
    })
    .catch(err => res.status(404).json({ msg: 'An error occurred' }));
});

// @route   POST api/room
// @desc    Create room
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  // Check if room number already exists
  Room.findOne({ number: req.body.number }).then(room => {
    if (room) {
      errors.msg = 'That room number already exists';
      return res.status(400).json({ errors });
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
        .then(room => res.json({ room, msg: 'Success' }))
        .catch(err => res.status(404).json(err));
    }
  });
});

// @route   PATCH api/room
// @desc    Update room
// @access  Public
router.patch('/', (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const updateRoom = {};
  if (req.body.price) updateRoom.price = req.body.price;
  if (req.body.name) updateRoom.name = req.body.name;
  if (req.body.number) updateRoom.number = req.body.number;
  if (req.body.bed) updateRoom.bed = req.body.bed;
  if (req.body.bathtub) updateRoom.bathtub = req.body.bathtub;
  if (req.body.kitchen) updateRoom.kitchen = req.body.kitchen;

  Room.findById(req.body.id)
    .then(room => {
      // Find if the room exists
      if (!room) {
        res.status(404).json({ msg: 'Room not found' });
        // Check if they're changing the room number
      } else if (room.number !== req.body.number) {
        // Check if the room number already exists
        Room.findOne({ number: req.body.number })
          .then(room => {
            if (room) {
              errors.msg =
                'Cannot update room number to one that already exists.';
              res.status(400).json({ errors });
            }
          })
          .catch(err => res.json({ err, msg: 'An error occurred' }));
      }
      // Update the room
      Room.findOneAndUpdate(
        { _id: req.body.id },
        { $set: updateRoom },
        { new: true }
      ).then(room => res.json({ room, msg: 'Success' }));
    })
    .catch(err => res.json({ err, msg: 'An error occurred' }));
});

// @route   DELETE api/room/:id
// @desc    Delete room by id
// @access  Public
router.delete('/:id', (req, res) => {
  Room.findByIdAndDelete(req.params.id)
    .then(room => {
      if (!room) {
        res.status(404).json({ msg: 'No room found with that ID' });
      }
      res.json({ success: true });
    })
    .catch(err => res.status(404).json({ msg: 'An error occurred' }));
});

// @route   DELETE api/room/number/:num
// @desc    Delete room by number
// @access  Public
router.delete('/number/:num', (req, res) => {
  Room.findOneAndRemove({ number: req.params.num })
    .then(room => {
      if (!room) {
        res.status(404).json({ msg: 'No room found with that number' });
      }
      res.json({ success: true });
    })
    .catch(err => res.status(404).json({ msg: 'An error occurred' }));
});

module.exports = router;
