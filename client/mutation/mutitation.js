const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require("graphql");

const logIN = new GraphQLObjectType({
  name: "LOGIN",
  description: "Log_In_Query",
  fields: () => ({
    token: {
      type: GraphQLNonNull(GraphQLString),
    },
    isAdmin: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  }),
});

module.exports = logIN;
