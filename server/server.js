const express = require("express");
const dotenv = require("dotenv");
const buf = Buffer.from("BASIC=basic");
const config = dotenv.parse(buf); // will return an object
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { DateTimeResolver, DateTimeTypeDefinition } = require("graphql-scalars");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth.js");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs: [DateTimeTypeDefinition, typeDefs],
  resolvers: [{ DateTime: DateTimeResolver }, resolvers],
  context: authMiddleware,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: false });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

var corsOption = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  credentials: true,
};

app.use(cors(corsOption));

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
