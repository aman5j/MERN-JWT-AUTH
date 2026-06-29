const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Temporary mock user IDs to satisfy the required 'createdBy' and review 'user' fields
const mockAdminId = new mongoose.Types.ObjectId(); 
const mockUser1 = new mongoose.Types.ObjectId(); 
const mockUser2 = new mongoose.Types.ObjectId(); 

const dummyProducts = [
    {
        title: "Wireless Noise-Canceling Headphones",
        description: "High-quality over-ear headphones with active noise cancellation and 40-hour battery life.",
        price: 199.99,
        category: "Electronics",
        brand: "AudioMax",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
        stock: 15,
        rating: 4.5,
        createdBy: mockAdminId,
        reviews: [
            {
                user: mockUser1,
                name: "John Doe",
                rating: 5,
                comment: "Amazing sound quality and the noise cancellation is top-notch!"
            },
            {
                user: mockUser2,
                name: "Jane Smith",
                rating: 4,
                comment: "Very comfortable for long hours, though the bass could be slightly punchier."
            }
        ]
    },
    {
        title: "Minimalist Leather Watch",
        description: "Elegant analog watch with a genuine leather band and water resistance up to 30 meters.",
        price: 125.00,
        category: "Accessories",
        brand: "ChronoCo",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
        stock: 8,
        rating: 4.2,
        createdBy: mockAdminId,
        reviews: [
            {
                user: mockUser1,
                name: "Alice Johnson",
                rating: 4,
                comment: "Looks incredibly sleek and premium. The leather strap feels great."
            }
        ]
    },
    {
        title: "Ergonomic Mechanical Keyboard",
        description: "RGB backlit tactile keyboard built for ultimate typing comfort and longevity.",
        price: 89.99,
        category: "Electronics",
        brand: "KeyClick",
        images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"],
        stock: 22,
        rating: 4.7,
        createdBy: mockAdminId,
        reviews: [
            {
                user: mockUser2,
                name: "Bob Myers",
                rating: 5,
                comment: "The tactile feedback is perfect for coding. RGB customization is excellent."
            }
        ]
    },
    {
        title: "Hydro Flask Water Bottle",
        description: "Stainless steel insulated water bottle that keeps drinks cold for up to 24 hours.",
        price: 34.95,
        category: "Fitness & Outdoor",
        brand: "HydroGear",
        images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"],
        stock: 50,
        rating: 4.8,
        createdBy: mockAdminId,
        reviews: [
            {
                user: mockUser1,
                name: "John Doe",
                rating: 5,
                comment: "Keeps ice frozen all day long, even in a hot car. Highly recommend!"
            }
        ]
    },
    {
        title: "Ultra-Lightweight Running Shoes",
        description: "Breathable and responsive running sneakers engineered for peak performance and comfort.",
        price: 110.00,
        category: "Footwear",
        brand: "StrideRight",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
        stock: 12,
        rating: 4.4,
        createdBy: mockAdminId,
        reviews: [
            {
                user: mockUser2,
                name: "Jane Smith",
                rating: 4,
                comment: "Super lightweight, feels like walking on air. Fits slightly narrow though."
            }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/jwt_auth");
        console.log("Connected to MongoDB for seeding...");

        // Clean up current products table
        await Product.deleteMany({});
        console.log("Old products cleared.");

        // Insert new mock details
        await Product.insertMany(dummyProducts);
        console.log("Dummy products with complete reviews inserted successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedDatabase();