const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: String,
    category: String,
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
