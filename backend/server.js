const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require('cors');
const app = express();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const port = process.env.PORT;

connectDB();

app.use(express.json());
// 2. Enable CORS for your React frontend
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend
  credentials: true                // Allow cookies/auth headers if needed
}));

// app.use(cors());


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth/", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api", orderRoutes);

// Static folder middleware mapping
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res, next) => {
    res.send("API is running!");
})

app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})
