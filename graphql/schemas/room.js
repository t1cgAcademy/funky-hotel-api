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
  # This block defines the possible fields that can be queried on a Room.
  type Room {
    _id: String
    price: Int
    name: String
    number: String
    bed: String
    bathtub: Boolean
    kitchen: Boolean
    # Note that the reservations field refers to the Reservation type defined in /graphql/schemas/reservation.js
    # The square bracket syntax means that this field returns an array of Reservations, rather than a single item
    reservations: [Reservation]
  }

# This block defines the different ways you can request info about rooms
  type Query {
    """
    Returns a list of rooms, filtered by variables.
    If no variables are provided, it returns all rooms.
    """
    rooms(price: Int, bed: String, bathtub: Boolean, kitchen: Boolean): [Room]

    """
    Returns a single room, based on variables.
    """
    room(_id: String, name: String, number: String): Room
  }
`;
