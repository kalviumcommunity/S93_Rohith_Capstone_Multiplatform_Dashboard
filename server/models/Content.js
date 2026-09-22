const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    format: {
      type: String,
      enum: ["Short Video", "Long Video", "Image", "Carousel", "Post"],
      required: true,
    },

    publishedAt: {
      type: Date,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    engagementRate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", contentSchema);