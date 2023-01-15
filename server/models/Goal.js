const { Schema } = require("mongoose");

const goalSchema = new Schema({
  goalWeight: {
    type: Number,
  },
  goalExercise: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  goalCustom: {
    type: String,
  },
});

module.exports = { goalSchema };
