const Brand = require("../models/Brand");

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching brands", error: error.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Brand.findOne({ name });
    if (existing) return res.status(400).json({ message: "Brand already exists" });

    const brand = new Brand({ name });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Error creating brand", error: error.message });
  }
};