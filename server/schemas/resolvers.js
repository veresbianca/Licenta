const { User, Exercise, Meal, Post, Profesionalist } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Types } = require("mongoose");
const Stripe = require("stripe");
const { getTransport } = require("../mail/transport");
const {
  generateRegisterConfirmationEmail,
  generatePaymentSuccesfulEmail,
  generateRemoveAccountEmail,
} = require("../mail/emailTemplates");
const nodemailer = require("nodemailer");

const stripe = new Stripe(
  "sk_test_51MTrHCL1p6qnKEuvmzMebqXnhpnSuyrlN7QKJJMhewH4nBYlTSH42Qc5C7pSh0t5dGXofiJSTiip9R85nHuvGW4y00qh2MwxHZ"
);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate("mealPlan")
          .populate("stats")
          .populate("exercisePlan")
          .populate("goals")
          .populate({
            path: "posts",
            option: { createdAt: -1 },
          })
          .populate("friends")
          .select("-__v -password");
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    client: async(parent, args, context) => {
      const userData = await User.findOne({ _id: args.userId })
        .populate("mealPlan")
        .select("-__v -password");
      return userData;
    },
    users: async () => {
      // Populate the meal and exercise subdocuments when querying for user
      return await User.find({}).populate("goals");
    },
    // Query array of subdocs: https://www.mongodb.com/docs/v5.2/tutorial/query-array-of-documents/
    stats: async (parent, args) => {
      return await User.find({
        stats: { calories: args.calories },
      });
    },
    meal: async (parent, args) => {
      return await User.find({
        mealPlan: { calories: args.calories },
      });
    },
    exercise: async (parent, args) => {
      return await User.find({
        exercisePlan: { calories: args.calories },
      });
    },
    posts: async (parent, args, context) => {
      // create algorithm to show users desired posts if user is logged in
      return await Post.find({})
        .populate("exercises")
        .populate("meals")
        .populate("usersLiked")
        .populate({
          path: "comments",
          populate: {
            path: "usersLiked",
          },
        });
    },
    post: async (parent, { postId }, context) => {
      return await Post.findById(postId)
        .populate("exercises")
        .populate("meals")
        .populate("usersLiked")
        .populate({
          path: "comments",
          populate: {
            path: "usersLiked",
          },
        });
    },
    medic: async (parent, { type }) => {
      return await User.find({ userRole: type });
    },
    trainner: async (parent, { type }) => {
      return await User.find({ userRole: type });
    },
    nutritionist: async (parent, { type }) => {
      return await User.find({ userRole: type });
    },
    psihologist: async (parent, { type }) => {
      return await User.find({ userRole: type });
    },
    profesionalist: async (parent, args) => {
      return await Profesionalist.find({});
    },
    exercises: async (parent, args) => {
      return await Exercise.find({});
    },

  },
  Mutation: {
    // add new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      const transport = await getTransport();
      transport
        .sendMail(
          generateRegisterConfirmationEmail({
            username: user.username,
            email: user.email,
            userRole: user.userRole
          })
        )
        .then((info) => {
          console.log(`Message id: ${info.messageId}`);
        });
      return { token, user };
    },
    removeUser: async (parent, args, context) => {
      const userToBeRemoved = await User.findByIdAndUpdate({
        _id: context.user._id,
      });
      const transport = await getTransport();
      transport
        .sendMail(
          generateRemoveAccountEmail({
            username: userToBeRemoved.username,
            email: userToBeRemoved.email,
          })
        )
        .then((info) => {
          console.log(`Message id: ${info.messageId}`);
        });
    },
    // update user information
    updateUser: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $set: args },
        { runValidators: true, new: true }
      );
      return updatedUser;
    },
    // login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Nu există nici un user cu acest email!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Parolă incorectă!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addFriend: async (parent, { email }, context) => {
      let updatedUser;
      const user = await User.findOne({ email });
      const userId = user.id;

      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");

      updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { friends: userId } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { friends: context.user._id } },
        { new: true }
      );

      return updatedUser;
    },
    removeFriend: async (parent, { email }, context) => {
      let updatedUser;
      const user = await User.findOne({ email });
      const userId = user.id;

      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");

      updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { friends: userId } },
        { new: true }
      );

      return updatedUser;
    },
    // add exercise plan
    addExercise: async (parent, args, context) => {
      let updatedUser;
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      console.log(args);
      // if (args.new) {
      const exercise = await Exercise.create(args);
      const exerciseId = exercise.id;

      updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { exercisePlan: exerciseId } },
        { new: false }
      );

      return updatedUser;
    },
    // update Exercise plan
    updateExercise: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const updatedExercise = await Exercise.findByIdAndUpdate(
        { _id: args.id },
        { $set: args },
        { runValidators: true, new: true }
      );
      return updatedExercise;
    },
    // remove Exercise plan
    removeExercise: async (parent, { id }, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const exercise = await Exercise.findOneAndDelete({
        _id: id,
      });
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { exercisePlan: exercise._id } },
        { new: true }
      );
      return updatedUser;
    },
    // add meal plan
    addMeal: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const meal = await Meal.create(args);
      const mealId = meal.id;
      const userId = args.userId !== '123' ? args.userId : context.user._id
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { mealPlan: mealId } },
        { new: true }
      );
      return updatedUser;
    },
    // update meal plan
    updateMeal: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const updatedMeal = await Meal.findByIdAndUpdate(
        { _id: args.id },
        { $set: args },
        { runValidators: true, new: true }
      );
      return updatedMeal;
    },
    // remove meal plan
    removeMeal: async (parent, { id }, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const meal = await Meal.findOneAndDelete({
        _id: id,
      });
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { mealPlan: meal._id } },
        { new: true }
      );
      return updatedUser;
    },
    // add goal plan
    addGoal: async (parent, goalInput, context) => {
     
        throw new AuthenticationError("You must be logged in to add Goal!");
      // create goalExercise array
      let goalExerciseList = [];
      // iterate over array of exercise and insert each to exercise collection
      for (let i = 0; i < goalInput.input.goalExercise.length; i++) {
        const exercise = await Exercise.create(goalInput.input.goalExercise[i]);
        goalExerciseList.push(exercise.id);
      }
      // generate subdocument
      const goal = {
        goalWeight: goalInput.input.goalWeight,
        goalExercise: goalExerciseList,
      };
      // add to user
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { goals: goal } },
        { runValidators: true, new: true }
      );
      return updatedUser;
    },
    // add post
    addPost: async (parent, postInput, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      let postExerciseList = [];
      // iterate over array of exercise and insert each to exercise collection

      for (let i = 0; i < postInput.input?.exercises?.length; i++) {
        const exercise = await Exercise.create(postInput.input.exercises[i]);
        console.log(exercise);
        postExerciseList.push(exercise._id);
      }
      let postMealList = [];
      // iterate over array of meals and insert each to meals collection
      for (let i = 0; i < postInput.input?.meals?.length; i++) {
        const meal = await Meal.create(postInput.input.meals[i]);
        console.log(meal);
        postMealList.push(meal._id);
      }
      // generate post document
      console.log(postInput.input.postAuthor);
      const post = {
        postAuthor: postInput.input.postAuthor,
        message: postInput.input.message,
        exercises: postExerciseList,
        meals: postMealList,
      };
      const postinsert = await Post.create(post);
      const postId = postinsert._id;
      // append tags to post just inserted
      const updatepost = await Post.findByIdAndUpdate(
        { _id: postId },
        { $addToSet: { tags: postInput.input.tags } },
        { runValidators: true, new: true }
      )
        .populate("exercises")
        .populate("meals");
      // finally update user to add post
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { posts: postId } },
        { new: true }
      );

      console.log(updatepost);
      return updatepost;
    },
    // add comment to post
    addComment: async (parent, commentInput, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const postId = commentInput.input.postId;
      const updatePost = await Post.findByIdAndUpdate(
        { _id: postId },
        { $addToSet: { comments: commentInput.input.commentDetails } },
        { new: true }
      );
      return updatePost;
    },
    // add likes
    updateLikes: async (parent, { postId }, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const userId = new Types.ObjectId(context.user._id);
      const post = await Post.findOne({ _id: postId });
      let updatePost;

      if (!post.usersLiked.includes(userId)) {
        updatePost = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $inc: { likes: 1 },
            $addToSet: { usersLiked: userId },
          },
          { new: true }
        );
      } else {
        updatePost = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: userId },
          },
          { new: true }
        );
      }
      return updatePost;
    },
    // add comment likes
    updateCommentLikes: async (parent, { postId, commentId }, context) => {
      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");
      const userId = new Types.ObjectId(context.user._id);
      const post = await Post.findOne({
        _id: postId,
        "comments.commentId": commentId,
      });
      const comment = await post.comments.find(
        (comment) => commentId === comment.commentId.valueOf()
      );
      let updateComment;

      if (!comment.usersLiked.includes(userId)) {
        updateComment = await Post.findOneAndUpdate(
          { _id: postId, "comments.commentId": commentId },
          {
            $inc: { "comments.$.likes": 1 },
            $addToSet: { "comments.$.usersLiked": userId },
          },
          { new: true }
        ).populate({
          path: "comments",
          populate: {
            path: "usersLiked",
          },
        });
      } else {
        updateComment = await Post.findOneAndUpdate(
          { _id: postId, "comments.commentId": commentId },
          {
            $inc: { "comments.$.likes": -1 },
            $pull: { "comments.$.usersLiked": userId },
          },
          { new: true }
        ).populate({
          path: "comments",
          populate: {
            path: "usersLiked",
          },
        });
      }
      return updateComment;
    },
    createSubscription: async (_, { source, ccLast4, type }, context) => {
      let subscriptionPlan;

      if (!context.user) throw new AuthenticationError("Trebuie să fii logat!");

      const user = await User.findOne({ _id: context.user._id });

      if (!user) {
        throw new Error();
      }

      if (type === "monthly") {
        subscriptionPlan = "price_1Mbw2nL1p6qnKEuvXYeyZ0Q0";
        user.userType = "monthlySubscription";
      } else {
        subscriptionPlan = "price_1Mbw7ZL1p6qnKEuvzt8ZPgAp";
        user.userType = "yearlySubscription";
      }

      const customer = await stripe.customers.create({
        email: user.email,
        source,
        plan: subscriptionPlan,
      });

      user.stripeId = customer.id;
      user.ccLast4 = ccLast4;
      await user.save();

      const transport = await getTransport();
      transport
        .sendMail(
          generatePaymentSuccesfulEmail({
            username: user.username,
            email: user.email,
          })
        )
        .then((info) => {
          console.log(`Message id: ${info.messageId}`);
        });

      return user;
    },
    changeCreditCard: async (_, { source, ccLast4 }, context) => {
      if (!context.user)
        throw new AuthenticationError(
          "You must be logged in to buy a subscription!"
        );

      const user = await User.findOne({ _id: context.user._id });

      if (
        !user ||
        !user.stripeId ||
        user.userType !== "monthlySubscription" ||
        user.userType !== "yearlySubscription"
      ) {
        throw new Error();
      }

      await stripe.customers.update(user.stripeId, { source });

      user.ccLast4 = ccLast4;
      await user.save();

      return user;
    },
  },
};
module.exports = resolvers;
