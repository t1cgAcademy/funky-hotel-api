const gql = require('apollo-server-express').gql;

module.exports = gql`
  type Reservation {
    _id: String
    reserver: String
    checkIn: String
    checkOut: String
    roomReserving: Room
  }

  type Query {
    """
    Returns a list of reservations, filtered by variables.
    If no variables are provided, it returns all reservations.
    """
    reservations(
      reserver: String
      checkIn: String
      checkOut: String
    ): [Reservation]

    """
    Returns a single reservation by ID.
    """
    reservation(_id: String): Reservation
  }

  input ReservationData {
    reserver: String
    checkIn: String
    checkOut: String
    roomReserving: String
  }

  type Mutation {
    """
    Creates a new reservation.
    """
    createReservation(reservation: ReservationData!): Reservation

    """
    Updates existing reservation.
    """
    updateReservation(_id: String!, reservation: ReservationData!): Reservation

    """
    Deletes existing reservation.
    """
    deleteReservation(_id: String): Reservation
  }
`;
