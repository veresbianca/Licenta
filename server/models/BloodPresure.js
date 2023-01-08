const { Schema, model } = require("mongoose");

const bloodPresureSchema = new Schema({
  systolic: {
    type: Number,
    required: false,
  },
  diastolic: {
    type: Number,
    required: false,
  },
});

const BloodPresure = model("BloodPresure", bloodPresureSchema);

module.exports = BloodPresure;
