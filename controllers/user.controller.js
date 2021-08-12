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
    // .populate('basket');
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
      address: oldUser.address,
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

export const getBasket = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  try {
    const user = await UserModel.findById(req.userId).populate({
      path: 'basket',
      populate: {
        path: 'product',
        select: 'name price media_list instruments',
        populate: {
          path: 'instruments',
        },
      },
    });
    console.log(user, 'user');
    const basket = user.basket.map((p) => ({
      id: p._id,
      count: p.count,
      product: {
        id: p.product._id,
        name: p.product.name,
        price: p.product.price,
        media: p.product.media_list[0].thumbnail,
        instruments: p.product.instruments,
      },
    }));

    res.status(200).json({ data: basket });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err}` });
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
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).send(`Product not found`);
    }
    if (!user?.basket.find((p) => String(p.product) === id)) {
      user.basket.push({ count: 1, product });
      user.save();
      return res.status(200).json({ message: 'Product added succesfully' });
    }
    res.status(409).json({ message: 'Product already exist in basket' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
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
    res.status(500).json({ message: `Something went wrong ${error}` });
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

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
