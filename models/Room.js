const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = Schema({
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  bed: {
    type: String,
    required: true
  },
  bathtub: {
    type: Boolean,
    required: true
  },
  kitchen: {
    type: Boolean,
    required: true
  }
});

module.exports = Room = mongoose.model('room', RoomSchema);
