const express = require("express");
const app = express();

const { graphqlHTTP } = require("express-graphql");

const databaseConnection = require("./database/connection");
databaseConnection();

app.use(express.static("public"));

const schema = require("./client/schema");
const adminSchema = require("./admin/schema");
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.use("/admin", graphqlHTTP({ schema: adminSchema, graphiql: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running in Port ${PORT}`));
