const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const BlogType = require("./query");
const Blogs = require("../../database/blog");

const RootQueryType = new GraphQLObjectType({
  name: "Root_Query",
  description: "This is Top Level Query",
  fields: () => ({
    mainPageBlog: {
      type: new GraphQLList(BlogType),
      description: "List_of_Blogs",
      resolve: async () => {
        const data = await Blogs.find();
        return data;
      },
    },
    seachBlog: {
      type: new GraphQLList(BlogType),
      description: "Search_Blogs",
      args: {
        header: {
          type: GraphQLString,
        },
      },
      resolve: async (parent, args) => {
        const data = await Blogs.find({
          $text: { $search: args.header },
        });
        return data;
      },
    },
    blogID: {
      type: BlogType,
      description: "This_is_for_Blog_Page",
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: async (parent, args) => {
        const data = await Blogs.findById(args.id);
        return data;
      },
    },
  }),
});

module.exports = RootQueryType;
