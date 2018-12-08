# funky-hotel-api

## Getting Started (TODO)

* Install and setup mongo, node, and git
* Clone repo
* seed DB
* npm install
* npm run server

## GraphQL

GraphQL is a query language for requesting resources from back end APIs. You can think of it as an alternative to the RESTful routes available on this project. This project uses Apollo Server for its GraphQL implementation. To get started, checkout the main GraphQL and Apollo Server resources:

* [GraphQL](https://graphql.org/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

All of the GraphQL code in this project is kept in the `graphql` directory. The code is heavily annotated, so be sure to check out the comments.

The best way to get practice writing GraphQL queries and mutations is to use the GraphQL Playground that comes provided with Apollo Server. Once you have this project's server up and running, open a web browser and goto [http://localhost:7001/graphql](http://localhost:7001/graphql). On the left side of the screen, you can write GraphQL queries. On the right side, you'll see the results of those queries when you run them. 

One of the most important features of the Playground is the tab to the far right that says `SCHEMA`. Clicking that tab opens up the documentation for the GraphQL server. It gives the names, arguments, and descriptions of all the queries and mutations the server allows. Its best to start there by exploring the schema documention, then practicing running some queries.

Note that the text editor on the left side of the screen has a lot of great features. It provides text completion and also provides warning highlighting and messages about missing arguments and subfields. If you are having trouble executing a query or mutation, make sure you read the warning messages!

Once you feel comforatable writing GraphQL queries and mutations, you can start using them in your client-side code to fetch data from this server. There are many different ways to make client-side GraphQL queries. Checkout [this article](https://medium.com/open-graphql/exploring-different-graphql-clients-d1bc69de305f) for just a few examples. And of course you can always just make a [basic fetch request](https://gist.githubusercontent.com/stubailo/8bd3b0ef9c1dcb1459bf0076e3d612af/raw/caafc26da2449421de00287ec7b55b09099ea4fc/fetch-graphql.js) as well.