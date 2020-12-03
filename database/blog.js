const mongoose = require("mongoose");

const Blog_Schema = mongoose.Schema({
  header: {
    type: String,
    require: true,
  },
  preview: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Blog_Schema.index({ header: "text" });
module.exports = mongoose.model("Blogs", Blog_Schema);
