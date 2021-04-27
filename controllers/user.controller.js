import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
const secret = "test";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      name: oldUser.name,
      surname: oldUser.surname,
      email: oldUser.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, name, surname } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      surname,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
