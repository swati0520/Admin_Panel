import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db connected")
  } catch (error) {
   console.error("error to connect to mongo db", error);
  }
};

export default connectDB;
  