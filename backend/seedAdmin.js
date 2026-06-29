const mongoose = require("mongoose");
const Admin = require("./models/Admin"); // corrected path
const bcrypt = require("bcrypt"); // Ensure passwords are saved securely if your schema doesn't pre-hash them

mongoose.connect("mongodb://127.0.0.1:27017/jwt_auth")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const seedAdmin = async () => {
  try {
    // Optional but highly recommended: Hash password if your Admin schema doesn't have a pre-save hook
    const hashedPassword = await bcrypt.hash("securePassword123", 10);

    const adminData = {
      name: "Test Admin",
      email: `admin${Math.floor(Math.random() * 1000)}@example.com`,
      password: hashedPassword, // Using hashed password for successful authentication
      // employeeId: `EMP${Math.floor(Math.random() * 10000)}`,
      role: "admin" // 👈 Added explicit system authorization tier matching your frontend shield requirement
    };

    const doc = await Admin.create(adminData);
    console.log("Inserted Admin successfully:", doc);

  } catch (err) {
    console.error("Error inserting admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();