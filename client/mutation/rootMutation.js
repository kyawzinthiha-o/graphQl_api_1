if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const logIN = require("./mutitation");
const User = require("../../database/users");

const jwt = require("jsonwebtoken");

const RootMutitationType = new GraphQLObjectType({
  name: "Mutitation",
  description: "This_is_RootMutitation_Query",
  fields: () => ({
    logIN: {
      type: logIN,
      description: "LogIN",
      args: {
        userID: {
          type: GraphQLNonNull(GraphQLID),
        },
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => {
        const searchUser = await User.findOne({ userID: args.userID });
        if (searchUser) {
          const token = await jwt.sign(searchUser.id, process.env.jwtScreat, {
            algorithm: "HS256",
          });
          const userInfo = {
            token,
            isAdmin: searchUser.isAdmin,
          };
          return userInfo;
        } else {
          const newUser = new User({
            userID: args.userID,
            email: args.email,
          });

          await newUser.save();
          const token = await jwt.sign(newUser.id, process.env.jwtScreat, {
            algorithm: "HS256",
          });
          const userInfo = {
            token,
            isAdmin: newUser.isAdmin,
          };
          return userInfo;
        }
      },
    },
  }),
});

module.exports = RootMutitationType;
