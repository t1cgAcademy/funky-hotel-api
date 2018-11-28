const gql = require('apollo-server-express').gql;

module.exports = gql`
  type Room {
    _id: String
    price: Int
    name: String
    number: String
    bed: String
    bathtub: Boolean
    kitchen: Boolean
    reservations: [Reservation]
  }

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
