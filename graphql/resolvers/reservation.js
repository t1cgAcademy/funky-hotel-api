const UserInputError = require('apollo-server-express').UserInputError;
const mongoErrorWrapper = require('../util/mongoErrorWrapper.js');
const Reservation = require('../../models/Reserveration.js');

module.exports = {
  Query: {
    reservations: mongoErrorWrapper((_, conditions) =>
      Reservation.find(conditions).populate('roomReserving')
    ),

    reservation: mongoErrorWrapper((_, conditions) =>
      Reservation.findOne(conditions).populate('roomReserving')
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

      if (!dbResponse) {
        throw new UserInputError(`Reservation with id: ${_id} does not exist.`);
      } else {
        return dbResponse;
      }
    }),

    deleteReservation: mongoErrorWrapper(async (_, {_id}) => {
      const dbResponse = await Reservation.findByIdAndDelete(_id);
      
      if (!dbResponse) {
        throw new UserInputError(`Reservation with id: ${_id} does not exist.`);
      } else {
        return dbResponse;
      }
    })
  }
};
