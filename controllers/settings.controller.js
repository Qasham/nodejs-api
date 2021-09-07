import { ComposerModel, InstrumentModel } from '../models/index.js';
import MessageModel from '../models/message.model.js';

export const getAllFilterItems = async (_, res) => {
  try {
    const allInstruments = await InstrumentModel.find(null, { name: 1 });
    const allComposers = await ComposerModel.aggregate([
      {
        $project: {
          name: '$fullname',
        },
      },
    ]);

    const allFilterItems = [
      {
        filterName: 'instruments',
        items: allInstruments,
      },
      {
        filterName: 'composers',
        items: allComposers,
      },
    ];

    res.status(200).json(allFilterItems);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const sendContactMessage = async (req, res, next) => {
  try {
    const newMessage = new MessageModel(req.body);

    // check model is valid
    const isInValidModel = newMessage.validateSync();
    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
