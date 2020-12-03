const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
} = require("graphql");

const { GraphQLUpload } = require("graphql-upload");

const User = require("../../database/users");

//stream
const path = require("path");
const fs = require("fs");

//database
const Blog = require("../../database/blog");

//checkInput
const checkInput = require("../../Error/inputCheck");
const RootMutation = new GraphQLObjectType({
  name: "Mutation_Admin",
  description: "Root_Mutation_For_Admin",
  fields: () => ({
    // ** this is query for updateUser start
    updateUser: {
      type: GraphQLString,
      description: "Update_user",
      args: {
        id: {
          type: GraphQLID,
        },
        isAdmin: {
          type: GraphQLBoolean,
        },
      },
      resolve: async (parent, args) => {
        const valid = checkInput(args.id, args.isAdmin);
        if (valid) {
          const updateUser = {
            isAdmin: args.isAdmin,
          };
          try {
            await User.findByIdAndUpdate(args.id, { $set: updateUser });
          } catch (error) {
            throw new GraphQLError("NEW ERROR", "SERVER ERROR");
          }
          const returnValue = "User Updated";
          return returnValue;
        } else {
          throw new GraphQLError("Please fill in all fields");
        }
      },
    },
    // ** this is query for updateUser end

    // ** this is query for uploadImage start
    uploadImge: {
      type: GraphQLString,
      description: "Upload_Image",
      args: {
        image: {
          type: GraphQLNonNull(GraphQLUpload),
        },
      },
      resolve: async (parent, { image }) => {
        const { filename, mimetype, createReadStream } = await image;
        try {
          const stream = createReadStream();
          const pathName = path.join(__dirname, `/public/images/${filename}`);
          await stream.pipe(fs.createWriteStream(pathName));
          const url = `http://localhost:4000/images/${filename}`;
          return url;
        } catch (error) {
          throw new GraphQLError("Server Error");
        }
      },
    },
    // ** this is query for uploadImage end

    // ** this is query for add blog start
    addBlog: {
      type: GraphQLString,
      description: "Add_new_Blog",
      args: {
        header: {
          type: GraphQLString,
        },
        preview: {
          type: GraphQLUpload,
        },
        content: {
          type: GraphQLString,
        },
      },
      resolve: async (parent, args) => {
        const valid = checkInput(args.header, args.preview, args.content);
        if (valid) {
          const { header, preview, content } = args;
          const { filename, mimetype, createReadStream } = await preview;
          const stream = createReadStream();
          const pathName = path.json(__dirname, `/public/iamges/${filename}`);
          await stream.pipe(fs.createWriteStream(pathName));
          const url = `http://localhost:4000/images/${filename}`;

          const newBlog = new Blog({
            header,
            preview: url,
            content,
          });

          await newBlog.save();
          const returnValue = "Blog Added";
          return returnValue;
        } else {
          throw new GraphQLError("Please fill in all fields");
        }
      },
    },
    // ** this is query for add blog end

    editBlog: {
      type: GraphQLString,
      description: "Edit_Blog",
      args: {
        id: {
          type: GraphQLID,
        },
        header: {
          type: GraphQLString,
        },
        content: {
          type: GraphQLString,
        },
      },
      resolve: async (parent, args) => {
        const valid = checkInput(args.header, args.id, args.content);
        if (valid) {
          const editBlog = {
            header: args.header,
            content: args.content,
          };
          await Blog.findByIdAndUpdate((args.id, { $set: editBlog }));

          const returnValue = "Blog Updated";
          return returnValue;
        } else {
          throw new GraphQLError("Please fill in all fields");
        }
      },
    },
  }),
});

module.exports = RootMutation;
