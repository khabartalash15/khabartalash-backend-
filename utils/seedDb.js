import dotenv from "dotenv";
import connectDb from "../config/db.js";
import bcrypt from "bcryptjs";
import Admin from "../models/AdminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDb();

    const hashedPasswrd = await bcrypt.hash("123456", 10);

    await Admin.deleteMany();
    console.log("Existing admin users removed");

    const admin = new Admin({
      firstName: "Jeevan",
      lastName: "Gharti",
      email: "khabartalash15@gmail.com",
      password: hashedPasswrd,
    });

    await admin.save();

    console.log("Admin user added successfully");
  } catch (err) {
    console.error(`Error seeding admin user: ${err.message}`);
    process.exit(1);
  }
};

export default seedAdmin;
