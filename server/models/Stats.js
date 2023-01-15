const { Schema, model } = require("mongoose");

const statsSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  dailySteps: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  caloriesBurn: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  sleep: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const Stats = model("Stats", statsSchema);

module.exports = Stats;
