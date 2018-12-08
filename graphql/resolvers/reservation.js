const UserInputError = require('apollo-server-express').UserInputError;
const mongoErrorWrapper = require('../util/mongoErrorWrapper.js');
const Reservation = require('../../models/Reserveration.js');

/**
 * GraphQL resolvers are functions that fulfill the expectations of the graphQL schema.
 * For example, the schema defines a Query called "reservations" which expects an array of Reservations.
 * Below, you will find a function "reservation" on the "Query" object, where the actual call to the database is made.
 * 
 * For every query and mutation in the graphQL schema, you should have a resolver, and vice versa
 */

module.exports = {
  /**
   * Its possible to define a resolver for every single field in your schema.
   * Here, we are defining the "roomReserving" resolver on the Reservation object,
   * because Mongoose just returns the room ID by default.
   * If the client requests the roomReserving field, we want to make the whole object available
   */
  Reservation: {
    roomReserving: mongoErrorWrapper(parent =>
      parent.populate('roomReserving').execPopulate().then(doc => doc.roomReserving)
    )
  },

  Query: {
    reservations: mongoErrorWrapper((_, conditions) =>
      Reservation.find(conditions)
    ),

    reservation: mongoErrorWrapper((_, conditions) =>
      Reservation.findOne(conditions)
    )
  },

  Mutation: {
    createReservation: mongoErrorWrapper((_, { reservation }) =>
      Reservation.create(reservation)
    ),

    updateReservation: mongoErrorWrapper(async (_, { _id, reservation }) => {
      const dbResponse = await Reservation.findByIdAndUpdate({ _id }, reservation, {
        runValidators: true,
        new: true
      });

      // For mutations that are based on a specific identifier, we want to make sure the client knows if they provided the wrong ID
      // Otherwise they would just recieve a null response, which is ambiguous and confusing
      if (!dbResponse) {
        throw new UserInputError(`Reservation with id: ${_id} does not exist.`);
      } else {
        return dbResponse;
      }
    }),

    deleteReservation: mongoErrorWrapper(async (_, {_id}) => {
      const dbResponse = await Reservation.findByIdAndDelete(_id);
      
      // For mutations that are based on a specific identifier, we want to make sure the client knows if they provided the wrong ID
      // Otherwise they would just recieve a null response, which is ambiguous and confusing
      if (!dbResponse) {
        throw new UserInputError(`Reservation with id: ${_id} does not exist.`);
      } else {
        return dbResponse;
      }
    })
  }
};
