const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserverationSchema = Schema({
  reserver: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  roomReserving: {
    type: Schema.Types.ObjectId,
    ref: 'room',
    required: true
  }
});

module.exports = Reservation = mongoose.model(
  'reservation',
  ReserverationSchema
);
