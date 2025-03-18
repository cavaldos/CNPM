import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "ansi-colors";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://admin:password@192.168.1.16:27017/mydb?authSource=admin";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout sau 5 giây
    });
    console.log("  \n  📦  ➜ MongoDB Connected:", color.green("Success"));
  } catch (error) {
    console.error("❌ ➜ MongoDB Connection Error:", color.red(String(error)));
    if (error instanceof Error) {
      console.error("Error details:", error.stack);
    }
    process.exit(1);
  }
};

export default connectDB;
