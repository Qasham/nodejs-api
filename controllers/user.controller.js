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
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(404)
        .json({ message: 'Email or password is not correct' });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
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

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      surname,
      basket: [],
      token: '',
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET, {
      expiresIn: '1d',
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error,
    });
  }
};
export const getUserData = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const user = await UserModel.findById(req.userId, {
      token: 0,
      password: 0,
      __v: 0,
      basket: 0,
    });
    if (!user) {
      return res.status(404).send(`User not found`);
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
export const getBasket = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  try {
    const user = await UserModel.findById(req.userId).populate({
      path: 'basket',
      populate: {
        path: 'product',
        select: 'name price photo_url instruments',
        populate: {
          path: 'instruments',
        },
      },
    });
    res.status(200).json(user.basket);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const addToBasket = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No product with id: ${id}`);
  }

  try {
    const user = await UserModel.findById(req.userId);
    const product = await ProductModel.findById(id, {
      name: 1,
      price: 1,
      photo_url: 1,
      instruments: 1,
    }).populate('instruments', { name: 1 });

    if (!product) {
      return res.status(404).send(`Product not found`);
    }
    if (!user?.basket.find((p) => String(p.product) === id)) {
      user.basket.push({ count: 1, product });
      user.save();
      let basketItem = user.basket;
      basketItem = basketItem.find((p) => String(p.product._id) === id);
      return res.status(200).json(basketItem);
    }
    res.status(409).json({ message: 'Product already exist in basket' });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const removeFromBasket = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await UserModel.findById(req.userId);
    if (user?.basket.find((p) => String(p._id) === id)) {
      user.basket = user.basket.filter((p) => String(p._id) !== id);
      user.save();
      return res.status(201).json({ message: 'Product removed succesfully' });
    }
    res.status(409).json({ message: 'Product doesnt exist in basket' });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const editAddress = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const user = await UserModel.findById(req.userId);
    user.address = req.body;

    await user.save();
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const editAccountInformation = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const user = await UserModel.findById(req.userId);
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    await user.save();
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json({
      message: error,
    });
  }
};
