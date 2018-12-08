// all of these packages are just utilities for building the graphQL schema and initializing the server
const ApolloServer = require('apollo-server-express').ApolloServer;
const path = require('path');
const merge = require('merge-graphql-schemas');
const fileLoader = merge.fileLoader;
const mergeTypes = merge.mergeTypes;
const mergeResolvers = merge.mergeResolvers;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

// Merge all the types defined in the `schemas` directory.
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

// Merge all the resolvers defined in the `resolvers` directory.
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// Create graphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Initialize graphQL server
const apolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line',
    },
  },
});

module.exports = apolloServer;
