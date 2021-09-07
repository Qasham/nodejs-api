import { OrderModel, UserModel } from '../models/index.js';

export const createOrder = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const user = await UserModel.findById(req.userId);
    if (!req.body.items.length) {
      return res.status(400).json({ message: 'Items is required' });
    }
    const newOrder = new OrderModel(req.body);
    newOrder.user_id = user._id;

    // check model is valid
    const isInValidModel = newOrder.validateSync();
    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }
    await newOrder.save();
    user.basket = [];
    await user.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getOrder = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const allOrders = await OrderModel.find(
      { user_id: req.userId },
      {
        __v: 0,
        user_id: 0,
      }
    ).populate({
      path: 'items',
      populate: {
        path: 'product',
        select: 'name price photo_url instruments audio_url',
        populate: [
          {
            path: 'instruments',
            select: 'name',
          },
        ],
      },
    });

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
