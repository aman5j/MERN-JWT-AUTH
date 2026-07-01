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

// @desc    Update a brand
// @route   PUT /api/barnds/:id
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Brand name is required" });

    // Check if another category already uses this name
    const existing = await Brand.findOne({ name: name.trim(), _id: { $ne: id } });
    if (existing) return res.status(400).json({ message: "Another Brand with this name already exists" });

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true } // returns the updated document and checks validation rules
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted successfully", deletedBrand });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
};


// Update an existing brand by ID
// exports.updateBrand = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;

//     // Optional: Check if the new name already conflicts with another existing brand
//     if (name) {
//       const duplicate = await Brand.findOne({ name, _id: { $ne: id } });
//       if (duplicate) {
//         return res.status(400).json({ message: "Another brand with this name already exists" });
//       }
//     }

    // Find and update the brand. { new: true } returns the modified document.
//     const updatedBrand = await Brand.findByIdAndUpdate(
//       id,
//       { name },
//       { new: true, runValidators: true }
//     );

//     if (!updatedBrand) {
//       return res.status(404).json({ message: "Brand not found" });
//     }

//     res.status(200).json(updatedBrand);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating brand", error: error.message });
//   }
// };

// Delete a brand by ID
// exports.deleteBrand = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedBrand = await Brand.findByIdAndDelete(id);

//     if (!deletedBrand) {
//       return res.status(404).json({ message: "Brand not found" });
//     }

//     res.status(200).json({ message: "Brand deleted successfully", deletedBrand });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting brand", error: error.message });
//   }
// };