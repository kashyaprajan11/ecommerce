const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/models");

type ProductInput = {
  _id?: number;
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
    return Product.find();
  },
  createProduct: ({ productInput }: any) => {
    // const product = {
    //   _id: Math.floor(Math.random() * 10000),
    //   name: productInput.name,
    //   price: productInput.price,
    //   description: productInput.description,
    // };

    const newProduct = new Product({
      name: productInput.name,
      price: productInput.price,
      description: productInput.description,
    });

    return newProduct
      .save()
      .then((result: any) => {
        console.log("saved", result);
        return result;
      })
      .catch((err: any) => console.error(err));
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

//  mongoose.connect(
//   `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@100x-ecommerce.7wun4td.mongodb.net/ecommerce`
// ).then(() => console.log("successful")).catch(() => console.log("error while connecting"))

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@100x-ecommerce.7wun4td.mongodb.net/ecommerce`,
      { dbName: "100x-ecommerce" }
    );
    console.log("Connection successful");
    app.listen(4000, () => {
      console.log(
        "Running a GraphQL API server at http://localhost:4000/graphql"
      );
    });
  } catch (err) {
    console.error("Failed connecting to database", err);
  }
})();
