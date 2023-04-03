// * `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.

// **Hint**: Use the functionality in the `user-controller.js` as a guide.

const { AuthenticationError } = require('apollo-server-express');
const { User, bookSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: (parent, { username }) => {
            return User.findOne({ username }).populate('thoughts');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },


        // saveBook -- Needs to be added still

        removeBook: async (parent, { user, params }) => {
            return User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
        },
    }
};


module.exports = resolvers;