const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = require("../")
type ProductInput = {
  _id: number;
  name: string;
  price: string;
  description?: string;
};

let products: ProductInput[] = [];
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Product {
    _id: ID!,
    name: String!,
    price: Float!,
    description: String,
  }

  type RootQuery {
    products: [Product]
  }

  input ProductInput {
    name: String!,
    price: Float!,
    description: String
  }

  type RootMutation {
    createProduct(productInput: ProductInput) : Product
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
 

`);

// The root provides a resolver function for each API endpoint
const root = {
  products: () => {
    return products;
  },
  createProduct: ({ productInput }: any) => {
    // const product = {
    //   _id: Math.floor(Math.random() * 10000),
    //   name: productInput.name,
    //   price: productInput.price,
    //   description: productInput.description,
    // };

    products.push(product);
    return product;
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
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@100x-ecommerce.7wun4td.mongodb.net/ecommerce`,
  { dbName: "100x-ecommerce" }
);
