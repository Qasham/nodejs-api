import mongoose from 'mongoose';

const instrumentSchema = mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Instrument', instrumentSchema);
