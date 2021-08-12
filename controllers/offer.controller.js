import { OfferModel, UserModel } from '../models/index.js';

export const createOffer = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const user = await UserModel.findById(req.userId);
    const newOffer = new OfferModel(req.body);
    newOffer.user_id = user._id;

    // check model is valid
    const isInValidModel = newOffer.validateSync();
    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    // next(error);
    res.status(500).json({ message: `${error}` });
  }
};

export const getOffer = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  try {
    const allOffers = await OfferModel.find({ user_id: req.userId }).populate({
      path: 'items',
      populate: {
        path: 'product',
        select: 'name price media_list instruments',
        populate: [
          {
            path: 'instruments',
          },
        ],
      },
    });

    res.status(200).json({ data: allOffers });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
