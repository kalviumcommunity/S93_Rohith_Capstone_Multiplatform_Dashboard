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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    format: {
      type: String,
      required: true,
      enum: ["Short Video", "Long Video", "Image", "Carousel", "Post"],
    },

    publishedAt: {
      type: Date,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    comments: {
      type: Number,
      default: 0,
      min: 0,
    },

    shares: {
      type: Number,
      default: 0,
      min: 0,
    },

    engagementRate: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", contentSchema);