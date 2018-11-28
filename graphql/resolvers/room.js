const Room = require('../../models/Room.js');
const Reservation = require('../../models/Reserveration.js');
const mongoErrorWrapper = require('../util/mongoErrorWrapper.js');

module.exports = {
  Room: {
    reservations: mongoErrorWrapper(({_id}) => Reservation.find({roomReserving: _id}))
  },
  Query: {
    rooms: mongoErrorWrapper((_, conditions) => Room.find(conditions)),
    room: mongoErrorWrapper((_, conditions) => Room.findOne(conditions))
  }
};
