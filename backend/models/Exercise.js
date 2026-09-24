const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    muscle: {
      type: String,
      required: true,
      trim: true,
    },

    equipment: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model(
  "Exercise",
  exerciseSchema
);

module.exports = Exercise;