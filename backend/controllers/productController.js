const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            product
        })

    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.createProduct = async(req, res)=> {
    try {
        console.log("create function called successsfully");
        // Validate if files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one product image is required" });
        }

        // Map files array to local URL paths
        const imagesUrls = req.files.map(file => `/uploads/${file.filename}`);

        // Construct document using fields from req.body + mapped image URLs
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            brand: req.body.brand,
            stock: Number(req.body.stock),
            rating: Number(req.body.rating),
            images: imagesUrls,
            createdBy: req.user?._id || "6a39460699ec75869fdbf6b6" // Fallback fallback ID or use your auth token user context
        })

        await newProduct.save();
        res.status(201).json({ success: true, newProduct });

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// exports.updateProduct = async(req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new : true, runValidators: true}
//         );

//         if(!updatedProduct) {
//             return res.status(404).json({
//                 message: "Product not found"
//             })
//         }
//         res.status(200).json({ success: true, updatedProduct });

//     } catch(error) {
//         res.status(400).json({
//             message: error.message
//         })
//     }
// }

exports.updateProduct = async(req, res) => {
    try {
        // 1. Fetch the product first to check for existing images
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Create an update payload object with parsed body fields
        let updateData = {
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            brand: req.body.brand,
            stock: Number(req.body.stock),
            rating: Number(req.body.rating)
        };

        // 2. Check if the user uploaded new images
        if (req.files && req.files.length > 0) {
            
            // Delete old associated image files from local disk storage
            if (product.images && product.images.length > 0) {
                product.images.forEach(imagePath => {
                    // Resolves path back from '/uploads/filename.ext' to real server path
                    const fullPath = path.join(__dirname, "..", imagePath);
                    
                    fs.unlink(fullPath, (err) => {
                        if (err) console.error("Failed to clear disk copy of old image:", fullPath, err);
                    });
                });
            }

            // Map new files array to local URL paths and add them to the update payload
            const imagesUrls = req.files.map(file => `/uploads/${file.filename}`);
            updateData.images = imagesUrls;
        } else {
            // If no new images are provided, keep the existing images
            updateData.images = product.images;
        }

        // 3. Update the document in the database with the compiled payload
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, updatedProduct });

    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        // Find product first to read its image paths
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        // Delete associated image files asynchronously from local folder disk storage
        if (product.images && product.images.length > 0) {
            product.images.forEach(imagePath => {
                // Resolves path back from '/uploads/filename.ext' to real server path 'root/uploads/filename.ext'
                const fullPath = path.join(__dirname, "..", imagePath);
                
                fs.unlink(fullPath, (err) => {
                    if (err) console.error("Failed to clear disk copy of image:", fullPath, err);
                });
            });
        }

        // Delete item from database
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Product and associated images removed successfully" });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}