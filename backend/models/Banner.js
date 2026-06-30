const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
  badge: { type: String, default: "Summer Collection 2026" },
  link: { type: String, default: "#" }
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);