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
  Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err =>
      res.status(404).json({ noreservationsfound: 'No reservations' })
    );
});

// @route   GET api/reservation/:id
// @desc    Get reservation by id
// @access  Public
router.get('/:id', (req, res) => {
  Reservation.findById(req.params.id)
    .then(reservation => res.json(reservation))
    .catch(err =>
      res
        .status(404)
        .json({ noreservationfound: 'No reservation found with that ID' })
    );
});

// @route   POST api/reservation
// @desc    Create reservation
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateReservationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find if room exists
  Room.findOne({ number: req.body.roomReserving }).then(room => {
    if (!room) {
      errors.room = 'No room found with that number';
      return res.status(404).json(errors);
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
        .catch(err => res.status(404).json(err));
    }
  });
});

// Delete reservation
router.delete('/:id', (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err =>
      res.status(404).json({ msg: 'No reservation found with that ID' })
    );
});

module.exports = router;
