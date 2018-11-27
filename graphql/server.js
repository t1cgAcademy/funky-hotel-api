const ApolloServer = require('apollo-server-express').ApolloServer;
const path = require('path');
const merge = require('merge-graphql-schemas');
const fileLoader = merge.fileLoader;
const mergeTypes = merge.mergeTypes;
const mergeResolvers = merge.mergeResolvers;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({ typeDefs, resolvers });

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
