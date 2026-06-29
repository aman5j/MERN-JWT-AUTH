const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    images: [{
        type: String, // Stores array of image URLs
        required: true
    }],
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String,
        rating: Number,
        comment: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model you provided
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     image: {
//         type: String, // URL string for the product image
//         default: "https://via.placeholder.com/150"
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     stock: {
//         type: Number,
//         default: 10
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("Product", productSchema);