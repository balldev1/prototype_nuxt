import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { connectToDatabase } from "../utils/mongo";
import { H3Event, setCookie } from "h3";

export const registerUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  address: string,
  phone: string,
  role: string
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
