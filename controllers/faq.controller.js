import { FaqModel } from '../models/index.js';

export const createFaq = async (req, res) => {
  try {
    const newFaq = new FaqModel(req.body);
    // check model is valid
    const isInValidModel = newFaq.validateSync();
    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    // next(error);
    res.status(500).json({ message: `${error}` });
  }
};

export const getAllFaqs = async (req, res) => {
  try {
    const allFaqs = await FaqModel.find();
    res.status(200).json({ data: allFaqs });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
