const { Schema, model } = require("mongoose");
const { goalSchema } = require("./Goal");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  bmi: {
    type: Number,
  },
  birthday: {
    type: Date,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  goals: [goalSchema],
  exercisePlan: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  mealPlan: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
  stats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Stats",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  stripeId: {
    type: String,
  },
  userType: {
    type: String,
    default: "free-trial",
  },
  ccLast4: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
