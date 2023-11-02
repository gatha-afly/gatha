import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "Successfully created", data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "User creation failed", details: error.message });
  }
};
export { createUser };
