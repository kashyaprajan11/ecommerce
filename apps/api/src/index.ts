const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  },
};

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});

mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@100x-ecommerce.7wun4td.mongodb.net/`,
  { dbName: "100x-ecommerce" }
);
