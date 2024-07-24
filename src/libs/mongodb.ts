import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }
    console.log(uri, "process.env.MONGODB_URI");
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
};

export default connectMongoDB;
