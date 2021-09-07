import { InstrumentModel } from '../models/index.js';

export const createInstrument = async (req, res) => {
  try {
    const newInstrument = new InstrumentModel(req.body);

    const isInValidModel = newInstrument.validateSync();

    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }
    await newInstrument.save();
    res.status(201).json(newInstrument);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getAllInstruments = async (req, res) => {
  try {
    const allInstruments = await InstrumentModel.find(null, { __v: 0 });
    res.status(200).json(allInstruments);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
