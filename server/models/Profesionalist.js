const { Schema, model } = require("mongoose");

const profesionalistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  photoSrc: {
    type: String,
    required: true,
  },
});

const Profesionalist = model("Profesionalist", profesionalistSchema);

module.exports = Profesionalist;
