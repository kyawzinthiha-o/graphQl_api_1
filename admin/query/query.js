const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
} = require("graphql");

const Users = new GraphQLObjectType({
  name: "Users",
  description: "This is user",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLString),
    },
    userID: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    isAdmin: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  }),
});

module.exports = Users;
