const gql = require('apollo-server-express').gql;

module.exports = gql`
  type Room {
    _id: String!
    price: Int!
    name: String!
    number: String!
    bed: String!
    bathtub: Boolean!
    kitchen: Boolean!
  }

  type Query {
    allRooms: [Room!]!
  }
`;
