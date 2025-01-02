import mongoose from "mongoose";

// 2:20 mark, explains IP Address change when going live.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;