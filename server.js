const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const { findOrCreateUser } = require("./controllers/userController");


//connect to mongo db

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("---db connected successfully---"))
  .catch(error => console.log(error));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true ,// za playground ukljucit na produkciji
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      console.log('authToken', authToken);
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.error("unable to authenticate with token", error);
    }
    console.log("currentUser", currentUser);
    return { currentUser };
  }
});

server.listen({port: process.env.PORT || 4000}).then(({ url }) => console.log(url));
