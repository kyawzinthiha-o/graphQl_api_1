if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLError,
} = require("graphql");

const logIN = require("./mutitation");
const User = require("../../database/users");

const jwt = require("jsonwebtoken");

//checkInput
const checkInput = require("../../Error/inputCheck");
const RootMutitationType = new GraphQLObjectType({
  name: "Mutitation",
  description: "This_is_RootMutitation_Query",
  fields: () => ({
    logIN: {
      type: logIN,
      description: "LogIN",
      args: {
        userID: {
          type: GraphQLID,
        },
        email: {
          type: GraphQLString,
        },
      },
      resolve: async (parent, args) => {
        const valid = checkInput(args.userID, args.email);
        if (valid) {
          try {
            const searchUser = await User.findOne({ userID: args.userID });
          } catch (error) {
            throw new GraphQLError("Server Error");
          }
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
            try {
              await newUser.save();
            } catch (error) {
              throw new GraphQLError("Server Error");
            }
            const token = await jwt.sign(newUser.id, process.env.jwtScreat, {
              algorithm: "HS256",
            });
            const userInfo = {
              token,
              isAdmin: newUser.isAdmin,
            };
            return userInfo;
          }
        } else {
          throw new GraphQLError("Please fill in all fields");
        }
      },
    },
  }),
});

module.exports = RootMutitationType;
