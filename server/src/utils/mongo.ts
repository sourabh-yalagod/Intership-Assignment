import mongoose from "mongoose";
import { ApiError } from "./ApiError";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "Scheduler",
    });
    console.log("Mongo DB connected");
  } catch (error) {
    throw new ApiError(501, "Mongo Db connection failed");
  }
};
export { connectDb };
