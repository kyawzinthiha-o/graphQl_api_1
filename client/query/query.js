const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const BlogType = new GraphQLObjectType({
  name: "BLOG",
  description: "This is Blog",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID),
    },
    header: {
      type: GraphQLNonNull(GraphQLString),
    },
    preview: {
      type: GraphQLNonNull(GraphQLString),
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});
module.exports = BlogType;
