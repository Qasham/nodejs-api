import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { ProductModel, UserModel } from '../models/index.js';

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      name: oldUser.name,
      surname: oldUser.surname,
      email: oldUser.email,
      basket: oldUser.basket,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: `'Something went wrong'- ${err}` });
  }
};

export const signUp = async (req, res) => {
  const { email, password, name, surname } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: 'User already exist with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      surname,
      basket: [],
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ result, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const addToBasket = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No product with id: ${id}`);
  }
  const product = await ProductModel.findById(id);
  try {
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }

  res.status(200).json({ message: 'Happy codding' });
};
