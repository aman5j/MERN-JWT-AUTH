const Banner = require("../models/Banner");

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching banners", error: error.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a banner image" });
    }
    // Storing relative file path matching your system's dynamic path parser
    const imageUrl = `/uploads/${req.file.filename}`;
    
    const newBanner = new Banner({
      imageUrl,
      title: req.body.title,
      subtitle: req.body.subtitle,
      badge: req.body.badge,
      link: req.body.link
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: "Server error creating banner", error: error.message });
  }
};