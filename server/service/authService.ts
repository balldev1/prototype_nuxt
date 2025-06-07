import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { connectToDatabase } from "../utils/mongo";
import { H3Event, setCookie } from "h3";

export const getAllUsers = async () => {
  await connectToDatabase();

  return await User.find({}, { password: 0 });
};

export const registerUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  address: string,
  phone: string,
  role: string,
  createBy: string
) => {
  await connectToDatabase();

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashed,
    firstname,
    lastname,
    address,
    phone,
    role,
    createBy,
  });

  return { message: "User registered", id: user._id };
};

export const loginUser = async (
  event: H3Event,
  email: string,
  password: string
) => {
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) throw createError({ statusCode: 401, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw createError({ statusCode: 401, message: "Invalid password" });

  const token = jwt.sign(
    {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      phone: user.phone,
      role: user.role,
      createBy: user.createBy,
    },
    useRuntimeConfig().JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  setCookie(event, "auth_token", token, {
    httpOnly: false,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return { message: "Login successful" };
};

export const logoutUser = (event: H3Event) => {
  setCookie(event, "auth_token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return { message: "Logout successful" };
};

export async function deleteUser(id: string) {
  try {
    await connectToDatabase();
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return { error: "User not found" };
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    return { error: "Unable to delete user" };
  }
}

export async function updateUser(id: string, data: Partial<any>) {
  try {
    await connectToDatabase();

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) return { error: "User not found" };

    return { message: "User updated", user: updated };
  } catch (error) {
    return { error: "Unable to update user" };
  }
}
