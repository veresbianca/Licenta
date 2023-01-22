const { gql } = require("apollo-server-express");

const typeDefs = gql`
  """
  User Schema will store registered user vital information and references to other schemas
  User can login with database username/password or passport authentication
  goals - user can set more than one goal
  exercise and meal - each goal will have related exercise and meal plan
  """ # ----------Queries-----------
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    "user who choose isPrivate true will not be shared for anything with other users"
    isPrivate: Boolean
    "Store weight in lbs"
    weight: Int
    "Store height in inches"
    height: Int
    birthday: Date
    country: String
    city: String
    address: String
    phone: String
    age: Int
    gender: String
    bmi: Float
    "user can have more than goals"
    goals: [Goal]
    exercisePlan: [Exercise]
    mealPlan: [Meal]
    stats: [Stats]
    "user can create post want to share with reference to exercise and meal plan"
    posts: [Post]
    friends: [User]
  }

  type Stats {
    userName: String
    dailySteps: Int
    heartRate: Int
    caloriesBurn: Float
    protein: Float
    fats: Float
    carbs: Float
    sleep: Int
    weight: Int
  }

  """
  Post Schema will store post user want to share with reference to exercise and meal plan
  """
  type Post {
    id: ID!
    postAuthor: String!
    message: String!
    likes: Int
    exercises: [Exercise]
    meals: [Meal]
    tags: [String]
    comments: [Comment]
    image: String
    createdAt: String
    usersLiked: [User]
  }

  """
  Meal Schema will store meal plan user created
  """
  type Meal {
    id: ID!
    mealAuthor: String
    name: String
    type: [String]
    "Following macronutrients are per complete meal and not per individual intake"
    calories: Float
    proteins: Float
    carbs: Float
    fats: Float
    photo: String
    unit: String
    value: Float
  }
  """
  Exercise Schema will store exercise plan user created
  """
  type Exercise {
    id: ID!
    name: String!
    type: [String]
    calories: Float
    distance: Float
    time: String
    reps: Int
    sets: Int
    liftingWeight: String
    plannedDates: Date
    new: Boolean
  }
  """
  Goal Schema will store goal user created
  """
  type Goal {
    goalWeight: Int
    goalCustom: String
    goalExercise: [Exercise]
  }
  """
  Comment Schema will use for Post
  """
  type Comment {
    commentId: ID!
    commentAuthor: String!
    message: String!
    image: String
    likes: Int
    tags: [String]
    createdAt: String
    usersLiked: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  scalar Date

  type Query {
    users: [User]
    posts: [Post]
    meals: [Meal]
    stats: [Stats]
    meal(calories: Float!): Meal
    exercises: [Exercise]
    exercise(calories: Float!): Exercise
    goals: [Goal]
    me: User
    post(postId: ID!): Post
    profesionalist: [Profesionalist]
  }

  type Profesionalist {
    user: User
    name: String
    type: String
    photoSrc: String
  }

  #------------Mutations---------------

  # will use MealInput to add new post
  input MealInput {
    name: String
    type: [String]
    calories: Float
    proteins: Float
    carbs: Float
    fats: Float
    photo: String
    unit: String
    value: Float
  }
  # will use ExerciseInput to add new goal and post
  input ExerciseInput {
    name: String!
    type: [String]
    calories: Float
    distance: Float
    time: String
    reps: Int
    sets: Int
    liftingWeight: String
  }
  # goalInput to add new goal with ExerciseInput
  input goalInput {
    goalWeight: Int
    goalCustom: String
    goalExercise: [ExerciseInput]
  }
  # postInput to add new post with MealInout and ExerciseInput
  input postInput {
    postAuthor: String!
    message: String!
    exercises: [ExerciseInput]
    meals: [MealInput]
    tags: [String]
  }
  # commentDetails input will be use in commentInput
  input commentDetails {
    commentAuthor: String!
    message: String!
    tags: [String]
  }
  # commentInput will be use to add new comment to post
  input commentInput {
    postId: ID!
    commentDetails: commentDetails!
    tags: [String]
  }
  # Following defines mutation
  type Mutation {
    addUser(
      username: String!
      password: String!
      email: String!
      isPrivate: Boolean
      weight: Int
      height: Int
      age: Int
      gender: String
      birthday: Date
      country: String
      city: String
      address: String
      phone: String
    ): Auth
    # User authentication: Check for valid login using email and password
    login(email: String!, password: String!): Auth
    # Allow user to add exercise plan
    addExercise(
      name: String!
      type: [String]
      calories: Float
      distance: Float
      time: String
      reps: Int
      sets: Int
      liftingWeight: Int
      plannedDates: [Date]
      new: Boolean
    ): Exercise
    # Update user Exercise plan information
    updateExercise(
      id: ID!
      name: String!
      type: [String]
      calories: Float
      distance: Float
      time: String
      reps: Int
      sets: Int
      liftingWeight: Int
    ): Exercise
    # Delete Exercise plan
    removeExercise(id: ID!): Exercise
    # Allow user to add meal plan
    addMeal(
      mealAuthor: String
      name: String!
      type: [String]
      calories: Float
      proteins: Float
      carbs: Float
      fats: Float
      photo: String
      unit: String
      value: Float
    ): Meal
    # Update user Meal plan information
    updateMeal(
      id: ID!
      name: String
      type: [String]
      calories: Float
      proteins: Float
      carbs: Float
      fats: Float
      photo: String
      unit: String
      value: Float
    ): Meal
    # Update user information
    updateUser(
      username: String!
      email: String!
      isPrivate: Boolean
      weight: Int
      height: Int
      age: Int
      gender: String
      bmi: Float
      birthday: Date
      country: String
      city: String
      address: String
      phone: String
    ): User
    # Update Post with Likes
    updateLikes(postId: ID!): Post
    # Update Comment with Likes
    updateCommentLikes(postId: ID!, commentId: ID!): Post
    # Delete Meal plan
    removeMeal(id: ID!): Meal
    # Allow user to add goal plan
    addGoal(input: goalInput): User
    # Allow user to add post
    addPost(input: postInput): Post
    # Allow user to add comment
    addComment(input: commentInput!): Post
  }
`;

module.exports = typeDefs;
