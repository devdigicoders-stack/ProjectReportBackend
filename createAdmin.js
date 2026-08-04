import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model("User", userSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const email = 'admin@projectreport.com';
    const password = 'admin@9696';

    // check if exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();
