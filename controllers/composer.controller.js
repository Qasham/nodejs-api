import ComposerModel from "../models/composer.model.js";

export const createComposer = async (req, res) => {
  try {
    const newComposer = await ComposerModel.create(req.body);
    res.status(201).json({ newComposer, message: "Composer created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getComposers = async (req, res) => {
  try {
    const allComposer = await ComposerModel.find();
    res.status(200).json(allComposer);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
