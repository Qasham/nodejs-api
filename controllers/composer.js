import ComposerModel from "../models/composer.js";

export const createComposer = async (req, res) => {
  try {
    const newComposer = await ComposerModel.create(req.body);
    res.status(201).json({ newComposer, message: "Composer created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
