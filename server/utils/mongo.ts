import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  const config = useRuntimeConfig();
  await mongoose.connect(config.MONGO_URI);
};
