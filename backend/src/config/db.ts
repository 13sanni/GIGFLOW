import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL as string;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not set");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
