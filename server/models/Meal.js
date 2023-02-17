const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
  },
  calories: {
    type: Number,
  },
  proteins: {
    type: Number,
  },
  carbs: {
    type: Number,
  },
  fats: {
    type: Number,
  },
  photo: {
    type: String,
  },
  unit: {
    type: String,
  },
  value: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

const Meal = model("Meal", mealSchema);

module.exports = Meal;
