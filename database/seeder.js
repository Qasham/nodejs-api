import InstrumentModel from '../models/instrument.model.js';

const seedInstruments = () => {
  try {
    const instruments = [
      {
        name: 'French Horn',
      },
      {
        name: 'Trumpet',
      },
      {
        name: 'Tuba',
      },
    ];

    instruments.forEach(async (instrument) => {
      const newInstrument = new InstrumentModel(instrument);
      await newInstrument.save();
    });
  } catch (error) {
    console.log(error);
  }
};
seedInstruments();
