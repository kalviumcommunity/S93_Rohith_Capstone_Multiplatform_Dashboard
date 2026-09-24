const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["YouTube", "Instagram", "TikTok"],
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    connected: {
      type: Boolean,
      default: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Platform", platformSchema);