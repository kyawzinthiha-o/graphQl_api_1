const { GraphQLObjectType, GraphQLString } = require("graphql");
const userInfo = require("./query");
const User = require("../../database/users");

const RootQueryType = new GraphQLObjectType({
  name: "Query_Admin",
  description: "This_is_root_query_for_admins",
  fields: () => ({
    getUsers: {
      type: userInfo,
      description: "Get Users",
      args: {
        email: {
          type: GraphQLString,
        },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ email: args.email });
        return user;
      },
    },
  }),
});

module.exports = RootQueryType;
