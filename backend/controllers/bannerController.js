const Banner = require("../models/Banner");
const fs = require("fs");
const path = require("path");

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


// Update an existing banner by ID
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the existing banner first to see if we need to replace its old image
    const existingBanner = await Banner.findById(id);
    if (!existingBanner) {
      // If a new file was uploaded but the banner doesn't exist, clean up the newly uploaded file immediately
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: "Banner not found" });
    }

    // Prepare updated fields from the text fields in req.body
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      badge: req.body.badge,
      link: req.body.link
    };

    // If a new image file is uploaded, replace the old one
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;

      // Delete the old file from the server disk if it exists
      if (existingBanner.imageUrl) {
        // Extracts the filename (e.g., "image.jpg") from "/uploads/image.jpg"
        const oldFileName = existingBanner.imageUrl.replace("/uploads/", "");
        // Resolves the absolute path to your local uploads folder
        const oldFilePath = path.join(__dirname, "../uploads", oldFileName); 

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Apply the updates to the database
    const updatedBanner = await Banner.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBanner);
  } catch (error) {
    // Fail-safe: if the database update crashes but a file was uploaded, clean it up
    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (err) {}
    }
    res.status(500).json({ message: "Server error updating banner", error: error.message });
  }
};


// Delete a banner by ID
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete the file from local disk storage
    if (banner.imageUrl) {
      const fileName = banner.imageUrl.replace("/uploads/", "");
      const filePath = path.join(__dirname, "../uploads", fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete the document record from MongoDB
    await banner.deleteOne();

    res.status(200).json({ message: "Banner and associated file deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting banner", error: error.message });
  }
};