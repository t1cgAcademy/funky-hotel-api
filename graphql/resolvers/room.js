const Room = require('../../models/Room.js');
const Reservation = require('../../models/Reserveration.js');
const mongoErrorWrapper = require('../util/mongoErrorWrapper.js');

/**
 * GraphQL resolvers are functions that fulfill the expectations of the graphQL schema.
 * For example, the schema defines a Query called "rooms" which expects an array of Rooms.
 * Below, you will find a function "rooms" on the "Query" object, where the actual call to the database is made.
 * 
 * For every query and mutation in the graphQL schema, you should have a resolver, and vice versa
 */

module.exports = {
  Room: {
    reservations: mongoErrorWrapper(({_id}) => Reservation.find({roomReserving: _id}))
  },
  Query: {
    rooms: mongoErrorWrapper((_, conditions) => Room.find(conditions)),
    room: mongoErrorWrapper((_, conditions) => Room.findOne(conditions))
  }
};
