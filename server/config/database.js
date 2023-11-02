import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
  // Connecting to the database
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    )
    .then(() => {
      console.log("Database connected! :smiley:");
    })
    .catch((error) => {
      console.log("Database connection error:", error.message);
    });
};

export default connectToMongoDB;
