const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import your Mongoose models
const Banner = require("./models/Banner");
const Category = require("./models/Category");
const Brand = require("./models/Brand");

// Load environment variables (adjust path if your .env is elsewhere)
dotenv.config();

// 1. Define the data arrays based on your hardcoded arrays
const dummyBanners = [
  { 
    imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&auto=format&fit=crop&q=80", 
    title: "Upgrade Your Everyday Setup.", 
    subtitle: "Explore premium tech additions, lifestyle gear, and minimalist essentials curated just for you.", 
    badge: "Summer Collection 2026" 
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80", 
    title: "Fresh Looks, Premium Comfort.", 
    subtitle: "Discover high-performance gear tailored for your active lifestyle.", 
    badge: "Summer Collection 2026" 
  }
];

const dummyCategories = [
  { name: "Electronics" },
  { name: "Accessories" },
  { name: "Home & Kitchen" },
  { name: "Fitness" },
  { name: "Apparel" }
];

const dummyBrands = [
  { name: "LogiTech" },
  { name: "NordicPack" },
  { name: "AuraSound" },
  { name: "HydroPeak" },
  { name: "Quantum" },
  { name: "ClickMaster" },
  { name: "Hide & Stitch" },
  { name: "BrewAura" },
  { name: "Polaris" },
  { name: "AeroStep" },
  { name: "Vanguard" }
];

// 2. Main function to handle database seeding
const seedDB = async () => {
  try {
    // Connect to database using your existing URI env variable
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/jwt_auth";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully for seeding...");

    // Clear existing collections to prevent duplication
    await Banner.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    console.log("Cleared old collections!");

    // Insert new data arrays
    await Banner.insertMany(dummyBanners);
    await Category.insertMany(dummyCategories);
    await Brand.insertMany(dummyBrands);
    
    console.log("Successfully seeded Banners, Categories, and Brands into the database! 🎉");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Always disconnect from the database when finished
    mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  }
};

// Run the function
seedDB();