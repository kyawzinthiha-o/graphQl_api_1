const { GraphQLSchema } = require("graphql");

const RootQueryType = require("./query/rootQuery");
const RootMutitationType = require("./mutation/rootMutation");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutitationType,
});

module.exports = schema;
