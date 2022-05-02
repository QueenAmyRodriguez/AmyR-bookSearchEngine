const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas')

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // create server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // Start server
  await server.start();

  server.applyMiddleware({ app });
  
  console.log(`Use GraphQL at https://localhost:${PORT}${server.graphqlPath}`);
};

// initialize server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
