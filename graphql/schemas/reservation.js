const gql = require('apollo-server-express').gql;

/**
 * The graphQL schema is where you define all the resources available in your API,
 * and all of the things you can do with them (queries and mutations).
 * 
 * NOTE: gql is a tool for parsing GraphQL schema strings.
 * Inside of a gql tag, you use graphQL syntax rather than javascript syntax.
 * Note that graphQL comments begin with #
 * Text wrapped in triple quotes (""") becomes the description text in the graphQL Playground schema.
 */

module.exports = gql`
  # This block defines the possible fields that can be queried on a Reservation.
  type Reservation {
    _id: String
    reserver: String
    checkIn: String
    checkOut: String
    # Note that roomReserving refers to the Room type defined in /graphql/schemas/room.js
    roomReserving: Room
  }

  # This block defines the different ways you can request info about reservations
  type Query {
    """
    Returns a list of reservations, filtered by variables.
    If no variables are provided, it returns all reservations.
    """
    reservations(reserver: String, checkIn: String, checkOut: String): [Reservation]

    """
    Returns a single reservation by ID.
    """
    reservation(_id: String): Reservation
  }

  # A graphQL schema input definition allows for re-using similar arguments across multiple queries and mutations
  # Note below that ReservationData is used as input to both createReservation and updateReservation mutations.
  input ReservationData {
    reserver: String
    checkIn: String
    checkOut: String
    roomReserving: String
  }

  # This block defines the different ways you can make changes to reservations
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
