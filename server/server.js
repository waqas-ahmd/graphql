const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
  `/graphql`,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen("4000", () => {
  console.log("Server running on Port 4000!");
});
