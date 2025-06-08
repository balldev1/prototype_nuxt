import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["user", "technic", "admin"], required: true },
  createdAt: { type: Date, default: Date.now },
  createBy: { type: String },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
