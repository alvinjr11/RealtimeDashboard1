const mongoose = require("mongoose");

const FlowSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // or mongoose.Schema.Types.ObjectId if you're referencing the User model
      required: true,
      unique: true, // ensures one flow per user
    },
    elements: {
      nodes: {
        type: Array,
        default: [],
      },
      edges: {
        type: Array,
        default: [],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flow", FlowSchema);
