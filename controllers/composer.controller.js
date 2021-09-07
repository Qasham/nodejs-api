import { ComposerModel } from '../models/index.js';

export const createComposer = async (req, res) => {
  try {
    const newComposer = new ComposerModel(req.body);

    const isInValidModel = newComposer.validateSync();

    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }

    await newComposer.save();
    res.status(201).json(newComposer);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getComposers = async (req, res) => {
  try {
    const { isForFilter } = req.query;
    let allComposer = [];

    // eslint-disable-next-line no-extra-boolean-cast
    if (isForFilter === 'true') {
      allComposer = await ComposerModel.find(null, { fullname: 1 });
    } else {
      allComposer = await ComposerModel.find();
    }
    res.status(200).json(allComposer);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
