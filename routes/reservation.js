const express = require('express');
const router = express.Router();

// Reservation Model
const Reservation = require('../models/Reserveration.js');

// Room Model
const Room = require('../models/Room.js');

// Reservation validation
const validateReservationInput = require('../validation/reservation.js');

// @route   GET api/reservation/test
// @desc    Tests reservation route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Test works' }));

// @route   GET api/reservation
// @desc    Get all reservations
// @access  Public
router.get('/', (req, res) => {
  const errors = {};
  Reservation.find()
    .populate('roomReserving', [
      'price',
      'name',
      'number',
      'bed',
      'bathtub',
      'kitchen'
    ])
    .then(reservations => {
      if (!reservations) {
        errors.msg = 'There are no reservations';
        return res.status(404).json(errors);
      }
      res.json(reservations);
    })
    .catch(err => res.status(404).json({ msg: 'No reservations' }));
});

// @route   GET api/reservation/:id
// @desc    Get reservation by id
// @access  Public
router.get('/:id', (req, res) => {
  Reservation.findById(req.params.id)
    .populate('roomReserving', [
      'price',
      'name',
      'number',
      'bed',
      'bathtub',
      'kitchen'
    ])
    .then(reservation => {
      if (!reservation) {
        res.status(404).json({ msg: 'No reservation found with that ID' });
      }
      res.json(reservation);
    })
    .catch(err =>
      res.status(404).json({ msg: 'No reservation found with that ID' })
    );
});

// @route   POST api/reservation
// @desc    Create reservation
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateReservationInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  // Find if room exists
  Room.findOne({ number: req.body.roomReserving }).then(room => {
    if (!room) {
      errors.room = 'No room found with that number';
      return res.status(404).json({ errors });
    } else {
      const newReservation = new Reservation({
        reserver: req.body.reserver,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        roomReserving: room
      });
      newReservation
        .save()
        .then(reservation => res.json({ reservation, msg: 'Success' }))
        .catch(err => res.status(404).json({ err }));
    }
  });
});

// @route   PATCH api/reservation
// @desc    Update room
// @access  Public
router.patch('/', (req, res) => {
  const { errors, isValid } = validateReservationInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const updateResv = {};
  if (req.body.reserver) updateResv.reserver = req.body.reserver;
  if (req.body.checkIn) updateResv.checkIn = req.body.checkIn;
  if (req.body.checkOut) updateResv.checkOut = req.body.checkOut;
  if (req.body.roomReserving) updateResv.roomReserving = req.body.roomReserving;

  Reservation.findById(req.body.id)
    .then(resv => {
      // Find if the reservation exists
      if (!resv) {
        res.status(404).json({ msg: 'Reservation not found' });
      } // Check if the roomReserving exists
      else if (req.body.roomReserving) {
        Room.findById(req.body.roomReserving)
          .then(room => {
            if (!room) {
              res.status(404).json({ msg: 'Room not found' });
            } else {
              // Update the room
              Reservation.findOneAndUpdate(
                { _id: req.body.id },
                { $set: updateResv },
                { new: true }
              ).then(resv => res.json({ resv, msg: 'Success' }));
            }
          })
          .catch(err => res.json({ err, msg: 'Room not found' }));
      }
    })
    .catch(err => res.json({ err, msg: 'An error occurred' }));
});

// Delete reservation
router.delete('/:id', (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(reservation => {
      if (!reservation) {
        res.status(404).json({ msg: 'No reservation found with that ID' });
      }
      res.json({ success: true });
    })
    .catch(err => res.status(404).json({ msg: 'An error occurred' }));
});

module.exports = router;
