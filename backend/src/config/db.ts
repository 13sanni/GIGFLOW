import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async ()=> {
  try {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in .env");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
